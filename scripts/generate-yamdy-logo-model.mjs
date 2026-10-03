// Development-only SVG extrusion. Visitors load the resulting binary GLB.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";
import { JSDOM } from "jsdom";
import { Box3, ExtrudeGeometry, Vector3, BufferGeometry, Float32BufferAttribute } from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { mergeGeometries, mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";

globalThis.DOMParser = new JSDOM("").window.DOMParser;
const source = await readFile(new URL("../brand/yamdy-logo.svg", import.meta.url), "utf8");
const started = performance.now();
const parsed = new SVGLoader().parse(source);
const shapes = parsed.paths.flatMap((path) => path.toShapes());
const originalStart = performance.now();
const original = shapes.map(
  (shape) =>
    new ExtrudeGeometry(shape, { depth: 16, bevelEnabled: false, curveSegments: 18, steps: 1 }),
);
const originalMs = performance.now() - originalStart;
const geometries = shapes.map(
  (shape) =>
    new ExtrudeGeometry(shape, { depth: 16, bevelEnabled: false, curveSegments: 8, steps: 1 }),
);
const bounds = new Box3();
geometries.forEach((g) => {
  g.computeBoundingBox();
  bounds.union(g.boundingBox);
});
const center = bounds.getCenter(new Vector3());
const scale = 6.6 / (bounds.max.x - bounds.min.x);
const primitives = [0, 1].map((materialIndex) => {
  const parts = geometries.map((g) => {
    const group = g.groups.find((part) => part.materialIndex === materialIndex);
    const part = new BufferGeometry();
    for (const attribute of ["position", "normal"]) {
      const values = g
        .getAttribute(attribute)
        .array.slice(group.start * 3, (group.start + group.count) * 3);
      part.setAttribute(attribute, new Float32BufferAttribute(values, 3));
    }
    part.translate(-center.x, -center.y, -center.z);
    part.scale(scale, -scale, scale);
    // Reflection changes winding; reverse each triangle while preserving normals.
    const a = part.getAttribute("position").array,
      n = part.getAttribute("normal").array;
    for (let i = 0; i < a.length; i += 9)
      for (let j = 0; j < 3; j++) {
        [a[i + 3 + j], a[i + 6 + j]] = [a[i + 6 + j], a[i + 3 + j]];
        [n[i + 3 + j], n[i + 6 + j]] = [n[i + 6 + j], n[i + 3 + j]];
      }
    return part;
  });
  return mergeVertices(mergeGeometries(parts), 1e-5);
});
const chunks = [],
  views = [],
  accessors = [];
let offset = 0;
function accessor(array, componentType, type, target, min, max) {
  const data = Buffer.from(array.buffer, array.byteOffset, array.byteLength);
  const padded = Buffer.alloc(Math.ceil(data.length / 4) * 4);
  data.copy(padded);
  const view = views.push({ buffer: 0, byteOffset: offset, byteLength: data.length, target }) - 1;
  chunks.push(padded);
  offset += padded.length;
  return (
    accessors.push({
      bufferView: view,
      componentType,
      count: array.length / (type === "VEC3" ? 3 : 1),
      type,
      ...(min ? { min, max } : {}),
    }) - 1
  );
}
const meshes = primitives.map((g, material) => {
  g.computeBoundingBox();
  const position = accessor(
    g.getAttribute("position").array,
    5126,
    "VEC3",
    34962,
    g.boundingBox.min.toArray(),
    g.boundingBox.max.toArray(),
  );
  const normal = accessor(g.getAttribute("normal").array, 5126, "VEC3", 34962);
  const indices = accessor(new Uint16Array(g.index.array), 5123, "SCALAR", 34963);
  return { attributes: { POSITION: position, NORMAL: normal }, indices, material };
});
const linear = (hex) =>
  hex.match(/\w\w/g).map((v) => {
    const s = parseInt(v, 16) / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
const json = {
  asset: { version: "2.0", generator: "Yamdy official SVG build pipeline" },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0, name: "Official Yamdy logo" }],
  meshes: [{ primitives: meshes }],
  materials: ["258948", "176136"].map((hex, i) => ({
    name: i ? "Dark green sides" : "Yamdy green front",
    pbrMetallicRoughness: {
      baseColorFactor: [...linear(hex), 1],
      metallicFactor: 0,
      roughnessFactor: 0.86,
    },
  })),
  buffers: [{ byteLength: offset }],
  bufferViews: views,
  accessors,
};
const jsonBytes = Buffer.from(JSON.stringify(json));
const jsonPadded = Buffer.alloc(Math.ceil(jsonBytes.length / 4) * 4, 32);
jsonBytes.copy(jsonPadded);
const bin = Buffer.concat(chunks);
const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546c67);
header.writeUInt32LE(2, 4);
header.writeUInt32LE(28 + jsonPadded.length + bin.length, 8);
function chunkHeader(length, kind) {
  const b = Buffer.alloc(8);
  b.writeUInt32LE(length);
  b.writeUInt32LE(kind, 4);
  return b;
}
const glb = Buffer.concat([
  header,
  chunkHeader(jsonPadded.length, 0x4e4f534a),
  jsonPadded,
  chunkHeader(bin.length, 0x004e4942),
  bin,
]);
const stats = {
  sourceSha256: createHash("sha256").update(source).digest("hex"),
  shapes: shapes.length,
  holes: shapes.reduce((n, s) => n + s.holes.length, 0),
  curveSegments: 8,
  depth: 16,
  meshes: 1,
  primitives: 2,
  vertices: primitives.reduce((n, g) => n + g.getAttribute("position").count, 0),
  triangles: primitives.reduce((n, g) => n + g.index.count / 3, 0),
  bytes: glb.length,
  gzipBytes: gzipSync(glb).length,
  previousVertices: original.reduce((n, g) => n + g.getAttribute("position").count, 0),
  nodeOriginalExtrusionMs: Math.round(originalMs),
  nodeGenerationMs: Math.round(performance.now() - started),
};
await mkdir(new URL("../public/models/", import.meta.url), { recursive: true });
await writeFile(new URL("../public/models/yamdy-logo.glb", import.meta.url), glb);
await writeFile(
  new URL("../public/models/yamdy-logo.stats.json", import.meta.url),
  JSON.stringify(stats, null, 2) + "\n",
);
console.log(stats);
