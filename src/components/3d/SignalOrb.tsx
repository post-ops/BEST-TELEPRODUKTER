"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Abstract signal sphere — a floating, glowing orb made of interconnected
 * nodes. Signal pulses travel along random edges. The core breathes.
 * Reads as "intelligent network" without being a literal hospital diagram.
 */

function Core() {
  const inner = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    if (inner.current) {
      const t = state.clock.elapsedTime;
      const pulse = 1 + Math.sin(t * 1.6) * 0.08;
      inner.current.scale.setScalar(pulse);
      const mat = inner.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 3.5 + Math.sin(t * 2.2) * 0.8;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.15;
      outerRef.current.rotation.x += delta * 0.05;
    }
  });
  return (
    <>
      <mesh ref={inner}>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshStandardMaterial
          color="#00b4d8"
          emissive="#00e0ff"
          emissiveIntensity={3.5}
          roughness={0.2}
          metalness={0.6}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

function NetworkShell({
  alarmSeed,
}: {
  alarmSeed: number;
}) {
  const group = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => {
    const n = 140;
    const list: THREE.Vector3[] = [];
    for (let i = 0; i < n; i++) {
      // Distribute evenly on a sphere via Fibonacci lattice
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.9;
      list.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ),
      );
    }
    return list;
  }, []);

  const edges = useMemo(() => {
    const list: [THREE.Vector3, THREE.Vector3][] = [];
    const max = 2; // neighbors per node
    for (let i = 0; i < nodes.length; i++) {
      const distances = nodes
        .map((p, j) => ({ j, d: p.distanceTo(nodes[i]) }))
        .filter(({ j }) => j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, max);
      for (const { j } of distances) {
        if (i < j) list.push([nodes[i], nodes[j]]);
      }
    }
    return list;
  }, [nodes]);

  const edgeGeometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      positions[i * 6 + 0] = a.x;
      positions[i * 6 + 1] = a.y;
      positions[i * 6 + 2] = a.z;
      positions[i * 6 + 3] = b.x;
      positions[i * 6 + 4] = b.y;
      positions[i * 6 + 5] = b.z;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [edges]);

  const pointsGeometry = useMemo(() => {
    const positions = new Float32Array(nodes.length * 3);
    nodes.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [nodes]);

  const pulsesRef = useRef<THREE.InstancedMesh>(null!);
  const pulseCount = 24;
  const pulseData = useRef(
    Array.from({ length: pulseCount }, () => ({
      edge: Math.floor(Math.random() * Math.max(edges.length, 1)),
      t: Math.random(),
      speed: 0.3 + Math.random() * 0.6,
    })),
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }

    if (!pulsesRef.current) return;
    for (let i = 0; i < pulseCount; i++) {
      const p = pulseData.current[i];
      p.t += delta * p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * edges.length);
      }
      const [a, b] = edges[p.edge];
      const pos = new THREE.Vector3().lerpVectors(a, b, p.t);
      dummy.position.copy(pos);
      const scale = Math.sin(p.t * Math.PI) * 0.035;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      pulsesRef.current.setMatrixAt(i, dummy.matrix);
    }
    pulsesRef.current.instanceMatrix.needsUpdate = true;
  });

  // Reference alarmSeed to keep the prop live (future: trigger visual bursts)
  const _touch = alarmSeed;

  return (
    <group ref={group}>
      <lineSegments>
        <primitive object={edgeGeometry} attach="geometry" />
        <lineBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      </lineSegments>
      <points>
        <primitive object={pointsGeometry} attach="geometry" />
        <pointsMaterial
          color="#67e8f9"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </points>
      <instancedMesh ref={pulsesRef} args={[undefined, undefined, pulseCount]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

function Rings() {
  const g1 = useRef<THREE.Mesh>(null!);
  const g2 = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (g1.current) g1.current.rotation.z += delta * 0.25;
    if (g2.current) g2.current.rotation.x -= delta * 0.15;
  });
  return (
    <>
      <mesh ref={g1}>
        <torusGeometry args={[2.4, 0.012, 8, 120]} />
        <meshBasicMaterial color="#00b4d8" transparent opacity={0.45} toneMapped={false} />
      </mesh>
      <mesh ref={g2} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.7, 0.008, 8, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} toneMapped={false} />
      </mesh>
    </>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#03080f"]} />
      <fog attach="fog" args={["#03080f", 5, 12]} />

      <ambientLight intensity={0.3} color="#1e3a5f" />
      <pointLight position={[3, 3, 4]} intensity={2.4} color="#00b4d8" distance={10} />
      <pointLight position={[-3, -2, -2]} intensity={1.6} color="#4f46e5" distance={10} />

      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <Core />
        <NetworkShell alarmSeed={0} />
        <Rings />
      </Float>

      <Sparkles
        count={80}
        scale={[8, 8, 8]}
        size={1.2}
        speed={0.25}
        noise={0.5}
        color="#67e8f9"
      />
    </>
  );
}

export function SignalOrb() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        role="img"
        aria-label="Abstrakt 3D-visualisering av et intelligent kommunikasjonsnettverk."
      >
        <Suspense fallback={null}>
          <Scene />
          <EffectComposer multisampling={0} disableNormalPass>
            <Bloom
              intensity={1.4}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.7}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.3} darkness={0.75} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* Soft glow behind */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(0,180,216,0.25),transparent_70%)]" aria-hidden />
    </div>
  );
}
