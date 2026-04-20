import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Floating particles that drift gently ─── */
const Particles = ({ count = 60 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp: { pos: THREE.Vector3; speed: number; offset: number; scale: number }[] = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6 - 2,
        ),
        speed: 0.1 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
        scale: 0.02 + Math.random() * 0.04,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      dummy.position.set(
        p.pos.x + Math.sin(t * p.speed + p.offset) * 0.3,
        p.pos.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.4,
        p.pos.z,
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(t * 0.8 + p.offset) * 0.3));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#F9A825" roughness={0.2} metalness={0.8} emissive="#F9A825" emissiveIntensity={0.4} transparent opacity={0.6} />
    </instancedMesh>
  );
};

/* ─── Orbiting torus knot — top-right ─── */
const OrbitingKnot = () => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.15;
    ref.current.rotation.y = t * 0.2;
    ref.current.position.y = 1.2 + Math.sin(t * 0.5) * 0.3;
    ref.current.position.x = 3.2 + Math.cos(t * 0.3) * 0.2;
  });

  return (
    <mesh ref={ref} position={[3.2, 1.2, -1]}>
      <torusKnotGeometry args={[0.4, 0.12, 100, 16, 2, 3]} />
      <meshStandardMaterial color="#FF6F00" roughness={0.15} metalness={0.85} emissive="#FF6F00" emissiveIntensity={0.25} />
    </mesh>
  );
};

/* ─── Spinning icosahedron — bottom-left ─── */
const SpinningGem = () => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.2;
    ref.current.rotation.z = t * 0.15;
    ref.current.position.y = -1.0 + Math.sin(t * 0.6 + 1) * 0.25;
    ref.current.position.x = -3.5 + Math.cos(t * 0.4) * 0.15;
  });

  return (
    <mesh ref={ref} position={[-3.5, -1, -0.5]}>
      <icosahedronGeometry args={[0.55, 0]} />
      <meshStandardMaterial color="#138808" roughness={0.1} metalness={0.9} emissive="#138808" emissiveIntensity={0.2} />
    </mesh>
  );
};

/* ─── Morphing sphere cluster — top-left ─── */
const SphereCluster = () => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.1;
    ref.current.position.y = 1.8 + Math.sin(t * 0.4) * 0.2;
  });

  const spheres = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        pos: [
          Math.cos((i / 5) * Math.PI * 2) * 0.35,
          Math.sin((i / 5) * Math.PI * 2) * 0.35,
          0,
        ] as [number, number, number],
        color: ['#FF6F00', '#F9A825', '#138808', '#E65100', '#2E7D32'][i],
        size: 0.12 + (i % 3) * 0.04,
      })),
    [],
  );

  return (
    <group ref={ref} position={[-3, 1.8, -1.5]}>
      <mesh>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#F9A825" roughness={0.1} metalness={0.9} emissive="#F9A825" emissiveIntensity={0.35} />
      </mesh>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[s.size, 16, 16]} />
          <meshStandardMaterial color={s.color} roughness={0.15} metalness={0.8} emissive={s.color} emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

/* ─── Rotating ring — bottom-right ─── */
const GlowRing = () => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = Math.PI * 0.35 + Math.sin(t * 0.3) * 0.15;
    ref.current.rotation.y = t * 0.12;
    ref.current.position.y = -1.5 + Math.sin(t * 0.45 + 2) * 0.2;
  });

  return (
    <mesh ref={ref} position={[3.5, -1.5, -1]}>
      <torusGeometry args={[0.6, 0.06, 24, 64]} />
      <meshStandardMaterial color="#F9A825" roughness={0.1} metalness={0.9} emissive="#F9A825" emissiveIntensity={0.35} />
    </mesh>
  );
};

/* ─── Orbiting dots trail — mid-right ─── */
const OrbitDots = () => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * 0.08;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
  });

  return (
    <group ref={ref} position={[0, 0, -3]}>
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 3.8;
        const colors = ['#FF6F00', '#138808', '#F9A825'];
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
            <sphereGeometry args={[0.06 + (i % 3) * 0.02, 12, 12]} />
            <meshStandardMaterial
              color={colors[i % 3]}
              roughness={0.15}
              metalness={0.8}
              emissive={colors[i % 3]}
              emissiveIntensity={0.3}
              transparent
              opacity={0.5 + (i % 4) * 0.12}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const ThreeScene = () => {
  return (
    <div className="absolute inset-0 hidden sm:block">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[-4, 5, 3]} intensity={1.2} color="#FF6F00" />
        <directionalLight position={[4, 2, 4]} intensity={0.7} color="#F9A825" />
        <directionalLight position={[0, -3, 2]} intensity={0.4} color="#138808" />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#FFFFFF" />

        {/* Ambient particle field */}
        <Particles count={50} />

        {/* Orbiting dots ring — background */}
        <OrbitDots />

        {/* Corner / edge elements — away from center text */}
        <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.15}>
          <OrbitingKnot />
        </Float>

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <SpinningGem />
        </Float>

        <Float speed={0.9} rotationIntensity={0.05} floatIntensity={0.1}>
          <SphereCluster />
        </Float>

        <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.12}>
          <GlowRing />
        </Float>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
