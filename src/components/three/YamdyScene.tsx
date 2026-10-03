import { useEffect, useRef } from "react";
import {
  AmbientLight,
  ACESFilmicToneMapping,
  DirectionalLight,
  Group,
  Mesh,
  MeshLambertMaterial,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";

let modelPromise: Promise<GLTF> | undefined;
export default function YamdyScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    renderer.toneMapping = ACESFilmicToneMapping;
    const container = canvas.closest(".official-logo-scene"),
      stage = canvas.closest(".logo-stage"),
      hero = canvas.closest(".editorial-hero");
    const scene = new Scene(),
      camera = new OrthographicCamera(-3.7, 3.7, 2, -2, 0.1, 30);
    camera.position.z = 10;
    const sculpture = new Group();
    scene.add(sculpture);
    scene.add(new AmbientLight(0xffffff, 1.5));
    const key = new DirectionalLight(0xffffff, 2.4);
    key.position.set(-3, 5, 7);
    scene.add(key);
    const fill = new DirectionalLight(0xffffff, 0.65);
    fill.position.set(4, -1, 5);
    scene.add(fill);
    let disposed = false,
      ready = false,
      frame = 0,
      pointerX = 0,
      pointerY = 0,
      lastUpdate = 0;
    const materials: MeshLambertMaterial[] = [];
    const render = () => {
      frame = 0;
      if (disposed || !ready || renderer.getContext().isContextLost()) return;
      const progress = Math.min(
        1,
        Math.max(0, -(hero?.getBoundingClientRect().top ?? 0) / innerHeight),
      );
      sculpture.rotation.set(
        (0.1 + pointerY) * (1 - progress),
        (-0.13 + pointerX) * (1 - progress),
        -0.025 * (1 - progress),
      );
      renderer.render(scene, camera);
    };
    const schedule = () => {
      if (!frame && ready) frame = requestAnimationFrame(render);
    };
    const resize = () => {
      const width = canvas.clientWidth,
        height = canvas.clientHeight;
      if (!width || !height) return;
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setSize(width, height, false);
      camera.top = (3.7 * height) / width;
      camera.bottom = -camera.top;
      camera.updateProjectionMatrix();
      schedule();
    };
    const compile = async () => {
      resize();
      sculpture.rotation.set(0.1, -0.13, -0.025);
      performance.mark("yamdy:compile-start");
      await renderer.compileAsync(scene, camera);
      if (disposed || renderer.getContext().isContextLost()) return;
      ready = true;
      render();
      performance.mark("yamdy:first-frame");
      requestAnimationFrame(() => {
        if (!disposed) {
          container?.classList.add("logo-ready");
          performance.mark("yamdy:3d-ready");
        }
      });
    };
    // Cache binary decoding, retaining geometry for quick offscreen remounts.
    modelPromise ??= new GLTFLoader().loadAsync("/models/yamdy-logo.glb");
    void modelPromise
      .then(async (model) => {
        if (disposed) return;
        performance.mark("yamdy:model-loaded");
        const logo = model.scene.clone(true);
        logo.traverse((object) => {
          if (object instanceof Mesh) {
            const source = Array.isArray(object.material) ? object.material[0] : object.material;
            const material = new MeshLambertMaterial({ color: source.color });
            materials.push(material);
            object.material = material;
          }
        });
        sculpture.add(logo);
        await compile();
      })
      .catch(() => {
        modelPromise = undefined;
        container?.classList.remove("logo-ready");
      });
    const move = (event: Event) => {
      if (!(event instanceof PointerEvent) || !stage || performance.now() - lastUpdate < 32) return;
      lastUpdate = performance.now();
      const rect = stage.getBoundingClientRect();
      pointerX = Math.max(
        -0.052,
        Math.min(0.052, ((event.clientX - rect.left) / rect.width - 0.5) * 0.104),
      );
      pointerY = Math.max(
        -0.052,
        Math.min(0.052, ((event.clientY - rect.top) / rect.height - 0.5) * 0.104),
      );
      schedule();
    };
    const leave = () => {
      pointerX = pointerY = 0;
      schedule();
    };
    const lost = (event: Event) => {
      event.preventDefault();
      ready = false;
      container?.classList.remove("logo-ready");
    };
    const restored = () => {
      void compile().catch(() => container?.classList.remove("logo-ready"));
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    stage?.addEventListener("pointermove", move);
    stage?.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", schedule, { passive: true });
    canvas.addEventListener("webglcontextlost", lost);
    canvas.addEventListener("webglcontextrestored", restored);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      container?.classList.remove("logo-ready");
      stage?.removeEventListener("pointermove", move);
      stage?.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", schedule);
      canvas.removeEventListener("webglcontextlost", lost);
      canvas.removeEventListener("webglcontextrestored", restored);
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" />;
}
