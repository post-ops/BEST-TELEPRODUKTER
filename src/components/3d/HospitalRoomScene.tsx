"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  PerformanceMonitor,
  Sparkles,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { HeroFallback } from "./HeroFallback";
import { Button } from "@/components/ui/Button";

/**
 * Cinematic nurse-call scene — dark, neon-lit, procedural.
 * Story: patient press call → signal travels across the room on a glowing
 * arc → nurse's smartphone lights up with a critical alert.
 * Auto-loops every ~6s; manual trigger via button.
 */

function Bed() {
  return (
    <group position={[-1.7, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[1.5, 0.3, 2.6]} />
        <meshStandardMaterial color="#dde6f5" roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh castShadow position={[0, 0.73, -0.95]}>
        <boxGeometry args={[1.1, 0.18, 0.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.72, 0.3]}>
        <boxGeometry args={[1.5, 0.08, 1.5]} />
        <meshStandardMaterial color="#6b93c7" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[0, 0.32, 0]}>
        <boxGeometry args={[1.55, 0.1, 2.65]} />
        <meshStandardMaterial color="#8aa3c0" roughness={0.4} metalness={0.5} />
      </mesh>
      {[
        [-0.7, -1.25],
        [0.7, -1.25],
        [-0.7, 1.25],
        [0.7, 1.25],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.05, z]}>
          <boxGeometry args={[0.08, 0.5, 0.08]} />
          <meshStandardMaterial color="#4a5e7a" metalness={0.7} roughness={0.25} />
        </mesh>
      ))}
      <mesh castShadow position={[0, 1.0, -1.35]}>
        <boxGeometry args={[1.6, 1.1, 0.08]} />
        <meshStandardMaterial color="#05152a" metalness={0.2} roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.0, -1.31]}>
        <planeGeometry args={[1.4, 0.05]} />
        <meshBasicMaterial color="#00b4d8" toneMapped={false} />
      </mesh>
    </group>
  );
}

function NurseCallDevice({ active }: { active: boolean }) {
  const buttonRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (buttonRef.current) {
      const mat = buttonRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.damp(
        mat.emissiveIntensity,
        active ? 5 : 0.5,
        5,
        delta,
      );
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.damp(
        mat.opacity,
        active ? 0.85 : 0.15,
        6,
        delta,
      );
    }
    if (ringRef.current) {
      const t = state.clock.elapsedTime;
      const s = active
        ? 1 + (Math.sin(t * 4) * 0.5 + 0.5) * 1.2
        : 1;
      ringRef.current.scale.setScalar(s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = active ? Math.max(0, 1 - ((s - 1) / 1.2)) * 0.7 : 0;
    }
  });

  return (
    <group position={[-0.5, 1.4, -1.1]}>
      <mesh castShadow>
        <boxGeometry args={[0.38, 0.24, 0.12]} />
        <meshStandardMaterial color="#0a1828" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh ref={buttonRef} position={[0, 0, 0.066]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.035, 48]} />
        <meshStandardMaterial
          color="#ff3355"
          emissive="#ff3355"
          emissiveIntensity={0.5}
          metalness={0.1}
          roughness={0.25}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={glowRef} position={[0, 0, 0.09]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.2, 48]} />
        <meshBasicMaterial
          color="#ff3355"
          transparent
          opacity={0.15}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={ringRef} position={[0, 0, 0.091]}>
        <ringGeometry args={[0.09, 0.13, 48]} />
        <meshBasicMaterial
          color="#ff3355"
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0.15, -0.2, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.45, 8]} />
        <meshStandardMaterial color="#1a2a3e" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Smartphone({ alertActive }: { alertActive: boolean }) {
  const screenRef = useRef<THREE.Mesh>(null!);
  const auraRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.damp(
        mat.emissiveIntensity,
        alertActive ? 4 : 0.8,
        6,
        delta,
      );
    }
    if (auraRef.current) {
      const mat = auraRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.damp(
        mat.opacity,
        alertActive ? 0.45 : 0,
        4,
        delta,
      );
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={[1.9, 1.5, 0.7]} rotation={[-0.15, -0.7, 0.06]}>
        <mesh ref={auraRef} position={[0, 0, -0.01]}>
          <planeGeometry args={[1.4, 2.0]} />
          <meshBasicMaterial
            color="#ff3355"
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh castShadow>
          <boxGeometry args={[0.6, 1.2, 0.06]} />
          <meshStandardMaterial color="#050d18" roughness={0.2} metalness={0.85} />
        </mesh>
        <mesh ref={screenRef} position={[0, 0, 0.032]}>
          <planeGeometry args={[0.54, 1.1]} />
          <meshStandardMaterial
            color={alertActive ? "#ff3355" : "#0a2540"}
            emissive={alertActive ? "#ff3355" : "#00b4d8"}
            emissiveIntensity={0.8}
            roughness={0.1}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0.36, 0.033]}>
          <planeGeometry args={[0.38, 0.18]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={alertActive ? 0.95 : 0.15} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function SignalPath({ active }: { active: boolean }) {
  const particlesRef = useRef<THREE.InstancedMesh>(null!);
  const trailRef = useRef<THREE.Line>(null!);
  const count = 22;

  const [start, mid, end] = useMemo(
    () => [
      new THREE.Vector3(-0.5, 1.4, -1.05),
      new THREE.Vector3(0.6, 2.7, -0.1),
      new THREE.Vector3(1.9, 1.5, 0.7),
    ],
    [],
  );

  const curvePoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const t = i / 64;
      const o = 1 - t;
      pts.push(
        new THREE.Vector3(
          o * o * start.x + 2 * o * t * mid.x + t * t * end.x,
          o * o * start.y + 2 * o * t * mid.y + t * t * end.y,
          o * o * start.z + 2 * o * t * mid.z + t * t * end.z,
        ),
      );
    }
    return pts;
  }, [start, mid, end]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(curvePoints);
    return g;
  }, [curvePoints]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phaseOffsets = useRef<number[]>(
    Array.from({ length: count }, (_, i) => i / count),
  );

  useFrame((_, delta) => {
    // Trail line opacity
    if (trailRef.current) {
      const mat = trailRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = THREE.MathUtils.damp(
        mat.opacity,
        active ? 0.5 : 0.08,
        6,
        delta,
      );
    }

    if (!particlesRef.current) return;
    const mat = particlesRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = THREE.MathUtils.damp(mat.opacity, active ? 1 : 0, 6, delta);

    for (let i = 0; i < count; i++) {
      phaseOffsets.current[i] += delta * 0.55;
      let t = phaseOffsets.current[i] % 1.25;
      const visible = t <= 1 && active;
      if (t > 1) t = 1;
      const o = 1 - t;
      const x = o * o * start.x + 2 * o * t * mid.x + t * t * end.x;
      const y = o * o * start.y + 2 * o * t * mid.y + t * t * end.y;
      const z = o * o * start.z + 2 * o * t * mid.z + t * t * end.z;
      dummy.position.set(x, y, z);
      const scale = visible ? 0.6 + Math.sin(t * Math.PI) * 0.55 : 0.0001;
      dummy.scale.setScalar(scale * 0.055);
      dummy.updateMatrix();
      particlesRef.current.setMatrixAt(i, dummy.matrix);
    }
    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  // Typed props for low-level primitive elements
  const lineProps: ThreeElements["line"] = {
    ref: trailRef as unknown as React.Ref<THREE.Line>,
  };

  return (
    <group>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <line {...lineProps}>
        <primitive object={geometry} attach="geometry" />
        <lineBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.08}
          toneMapped={false}
        />
      </line>
      <instancedMesh ref={particlesRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

function Walls() {
  return (
    <group>
      <mesh position={[0, 1.8, -2.1]} receiveShadow>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#0b1a30" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[-4.2, 1.8, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial color="#091628" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#05101e" roughness={0.7} metalness={0.3} />
      </mesh>
      {/* Ambient accent strip on ceiling */}
      <mesh position={[0, 3.3, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 0.06]} />
        <meshBasicMaterial color="#00b4d8" toneMapped={false} />
      </mesh>
    </group>
  );
}

function MonitorOnWall({ active }: { active: boolean }) {
  const screenRef = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.damp(
        mat.emissiveIntensity,
        active ? 2.2 : 0.5,
        5,
        delta,
      );
    }
  });
  return (
    <group position={[1.0, 2.1, -2.04]}>
      <mesh castShadow>
        <boxGeometry args={[1.2, 0.78, 0.08]} />
        <meshStandardMaterial color="#000814" metalness={0.2} />
      </mesh>
      <mesh ref={screenRef} position={[0, 0, 0.045]}>
        <planeGeometry args={[1.1, 0.68]} />
        <meshStandardMaterial
          color="#001020"
          emissive={active ? "#ff3355" : "#00b4d8"}
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>
      {/* ECG squiggle */}
      <mesh position={[0, -0.12, 0.046]}>
        <planeGeometry args={[0.9, 0.03]} />
        <meshBasicMaterial color={active ? "#ff3355" : "#22d3ee"} toneMapped={false} />
      </mesh>
    </group>
  );
}

function SideTable() {
  return (
    <group position={[-0.25, 0.5, -0.55]}>
      <mesh castShadow>
        <boxGeometry args={[0.55, 0.6, 0.55]} />
        <meshStandardMaterial color="#8aa3c0" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0.14, 0.36, 0.12]} castShadow>
        <cylinderGeometry args={[0.055, 0.045, 0.12, 20]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[-0.12, 0.33, 0.1]} castShadow>
        <boxGeometry args={[0.16, 0.06, 0.12]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.4} toneMapped={false} />
      </mesh>
    </group>
  );
}

function AmbientGrid() {
  // A faint subdivided floor grid gives architectural depth
  return (
    <gridHelper
      args={[14, 28, "#00b4d8", "#0a2540"]}
      position={[0, 0.01, 0]}
    />
  );
}

function Scene({ alarmActive }: { alarmActive: boolean }) {
  return (
    <>
      <color attach="background" args={["#03080f"]} />
      <fog attach="fog" args={["#03080f", 4, 14]} />

      <ambientLight intensity={0.25} color="#1e3a5f" />

      <directionalLight
        position={[4, 6, 3]}
        intensity={0.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        color="#a5d8ff"
      />

      {/* Cyan rim light */}
      <pointLight position={[-3, 3, 2]} intensity={2.5} color="#00b4d8" distance={8} decay={2} />
      {/* Alert light */}
      <pointLight
        position={[-0.5, 1.4, -1]}
        intensity={alarmActive ? 8 : 0.4}
        color={alarmActive ? "#ff3355" : "#ff8ca0"}
        distance={5}
        decay={2}
      />
      {/* Warm fill from ceiling strip */}
      <pointLight position={[0, 3, -0.5]} intensity={1.2} color="#00b4d8" distance={6} />

      <Walls />
      <AmbientGrid />
      <Bed />
      <SideTable />
      <NurseCallDevice active={alarmActive} />
      <MonitorOnWall active={alarmActive} />
      <Smartphone alertActive={alarmActive} />
      <SignalPath active={alarmActive} />

      <Sparkles
        count={40}
        scale={[6, 3, 4]}
        position={[0, 1.5, 0]}
        size={1.4}
        speed={0.25}
        noise={0.8}
        color="#67e8f9"
      />

      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.6}
        scale={10}
        blur={2.2}
        far={4}
      />

      <Environment preset="night" />
    </>
  );
}

export function HospitalRoomScene({
  autoLoop = true,
  playLabel = "Spill av demo-sekvens",
}: {
  autoLoop?: boolean;
  playLabel?: string;
}) {
  const [alarmActive, setAlarmActive] = useState(false);
  const [dpr, setDpr] = useState<[number, number]>([1, 1.8]);

  useEffect(() => {
    if (!autoLoop) return;
    let timeout: ReturnType<typeof setTimeout>;
    const runCycle = () => {
      setAlarmActive(true);
      timeout = setTimeout(() => {
        setAlarmActive(false);
        timeout = setTimeout(runCycle, 3800);
      }, 3000);
    };
    timeout = setTimeout(runCycle, 1800);
    return () => clearTimeout(timeout);
  }, [autoLoop]);

  const triggerManual = () => {
    setAlarmActive(true);
    setTimeout(() => setAlarmActive(false), 3000);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Canvas
        shadows
        dpr={dpr}
        camera={{ position: [3.8, 2.6, 3.9], fov: 40 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        aria-label="Interaktiv 3D-visualisering av pasientvarsling: knappen ved sengen utløser et signal som lyser opp sykepleierens smarttelefon."
        role="img"
      >
        <PerformanceMonitor
          onDecline={() => setDpr([1, 1])}
          onIncline={() => setDpr([1, 2])}
        />
        <Suspense fallback={null}>
          <Scene alarmActive={alarmActive} />
          <EffectComposer multisampling={0} disableNormalPass>
            <Bloom
              intensity={1.1}
              luminanceThreshold={0.25}
              luminanceSmoothing={0.8}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.0008, 0.0008]}
              radialModulation={false}
              modulationOffset={0}
            />
            <Vignette eskil={false} offset={0.25} darkness={0.85} />
          </EffectComposer>
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3.3}
          maxPolarAngle={Math.PI / 2.05}
          minAzimuthAngle={-Math.PI / 5}
          maxAzimuthAngle={Math.PI / 5}
          enableDamping
          dampingFactor={0.06}
          autoRotate
          autoRotateSpeed={0.35}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,#05152a_100%)]" aria-hidden />

      <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3">
        <Button
          type="button"
          size="sm"
          variant="dark"
          onClick={triggerManual}
          aria-pressed={alarmActive}
          className="glass-dark !bg-navy-900/70 !backdrop-blur-md"
        >
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              alarmActive ? "bg-rose-400 shadow-[0_0_12px_rgba(255,51,85,0.8)]" : "bg-cyan-400"
            } animate-pulse`}
            aria-hidden
          />
          {playLabel}
        </Button>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/70 backdrop-blur-md">
          {alarmActive ? "Alarm • prio 1" : "System • idle"}
        </span>
      </div>
    </div>
  );
}

// Keep the fallback export available
export { HeroFallback };
