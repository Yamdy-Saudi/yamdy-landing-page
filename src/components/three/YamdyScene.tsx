import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Shape, ExtrudeGeometry, Group, ACESFilmicToneMapping } from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Sculpture({ mode }: { mode: "brain" | "flywheel" }) {
  const group = useRef<Group>(null);
  const { invalidate, gl } = useThree();
  const palette = useMemo(() => {
    const style = getComputedStyle(document.documentElement);
    return {
      green: style.getPropertyValue("--yamdy-green").trim(),
      light: style.getPropertyValue("--green-light").trim(),
      purple: style.getPropertyValue("--yamdy-purple").trim(),
    };
  }, []);
  const arch = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(-0.65, -0.7);
    shape.lineTo(-0.65, 0.25);
    shape.absarc(0, 0.25, 0.65, Math.PI, 0, true);
    shape.lineTo(0.65, -0.7);
    shape.lineTo(0.29, -0.7);
    shape.lineTo(0.29, 0.25);
    shape.absarc(0, 0.25, 0.29, 0, Math.PI, false);
    shape.lineTo(-0.29, -0.7);
    shape.closePath();
    return new ExtrudeGeometry(shape, {
      depth: 0.38,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
      curveSegments: 24,
    });
  }, []);
  useEffect(() => () => arch.dispose(), [arch]);
  useEffect(() => {
    const canvas = gl.domElement;
    const parent = canvas.closest(".hero-art, .flywheel-visual");
    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.context(() => {
      if (mode === "flywheel" && group.current && parent) {
        gsap.to(group.current.rotation, {
          z: 2.2,
          ease: "power2.in",
          onUpdate: invalidate,
          scrollTrigger: { trigger: parent, start: "top 90%", end: "bottom 15%", scrub: 1.4 },
        });
      }
    });
    const move = (event: Event) => {
      if (!group.current || !(event instanceof PointerEvent) || !parent) return;
      const rect = parent.getBoundingClientRect();
      group.current.rotation.y = -0.35 + ((event.clientX - rect.left) / rect.width - 0.5) * 0.22;
      group.current.rotation.x = 0.16 + ((event.clientY - rect.top) / rect.height - 0.5) * 0.12;
      invalidate();
    };
    parent?.addEventListener("pointermove", move);
    const onContextLost = (event: Event) => {
      event.preventDefault();
      canvas.style.visibility = "hidden";
      canvas.parentElement?.classList.remove("canvas-ready");
    };
    const restored = () => {
      canvas.style.visibility = "visible";
      canvas.parentElement?.classList.add("canvas-ready");
      invalidate();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", restored);
    return () => {
      motion.revert();
      parent?.removeEventListener("pointermove", move);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", restored);
    };
  }, [gl, invalidate, mode]);
  return (
    <group ref={group} rotation={[0.16, -0.35, -0.1]}>
      {mode === "brain" ? (
        <>
          {[-1.25, 0, 1.25].map((x, i) => (
            <mesh
              key={x}
              geometry={arch}
              position={[x, i === 1 ? 0.38 : 0, i === 1 ? -0.22 : 0]}
              scale={i === 2 ? [0.8, 0.8, 1] : 1}
            >
              <meshStandardMaterial
                color={i === 1 ? palette.light : palette.green}
                roughness={0.3}
                metalness={0.12}
              />
            </mesh>
          ))}
          <mesh position={[0, -0.76, 0.13]}>
            <boxGeometry args={[4.2, 0.3, 0.6]} />
            <meshStandardMaterial color={palette.green} roughness={0.3} />
          </mesh>
          <mesh position={[1.1, 1.35, 0.16]}>
            <torusGeometry args={[0.12, 0.043, 12, 24]} />
            <meshStandardMaterial color={palette.purple} />
          </mesh>
          {[-1.75, -1.45, 1.45, 1.75].map((x) => (
            <mesh key={x} position={[x, -1.17, 0.17]}>
              <sphereGeometry args={[0.09, 16, 12]} />
              <meshStandardMaterial color={palette.green} />
            </mesh>
          ))}
        </>
      ) : (
        <>
          {[0, 1, 2].map((i) => (
            <mesh key={i} rotation={[Math.PI / 2 + i * 0.12, i * 0.23, i * 0.45]}>
              <torusGeometry args={[1.65 - i * 0.28, 0.055 + i * 0.016, 12, 72]} />
              <meshStandardMaterial
                color={i === 1 ? palette.purple : palette.green}
                roughness={0.32}
                metalness={0.1}
              />
            </mesh>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <mesh
              key={i}
              position={[Math.cos((i * Math.PI) / 2) * 1.65, 0, Math.sin((i * Math.PI) / 2) * 1.65]}
            >
              <boxGeometry args={[0.24, 0.24, 0.24]} />
              <meshStandardMaterial color={palette.green} roughness={0.25} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

export default function YamdyScene({ mode }: { mode: "brain" | "flywheel" }) {
  return (
    <Canvas
      className="three-canvas"
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.4, 6.8], fov: 39 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
        toneMapping: ACESFilmicToneMapping,
      }}
      fallback={null}
      onCreated={({ gl }) => {
        gl.domElement.parentElement?.classList.add("canvas-ready");
      }}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[3, 5, 4]} intensity={4} />
      <directionalLight position={[-4, 1, -2]} intensity={2} color="#f9e6c9" />
      <Sculpture mode={mode} />
    </Canvas>
  );
}
