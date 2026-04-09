import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const GrainBowl = () => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.y += 0.003;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });

  return (
    <group ref={ref} position={[-1.8, 0, 0]}>
      {/* Bowl body */}
      <mesh rotation={[0.2, 0, 0]}>
        <sphereGeometry args={[0.55, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color="#D4A054" roughness={0.25} metalness={0.5} emissive="#8B6F47" emissiveIntensity={0.15} />
      </mesh>
      {/* Food inside */}
      <mesh position={[0, 0.12, 0]} rotation={[0.2, 0, 0]}>
        <sphereGeometry args={[0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.3]} />
        <meshStandardMaterial color="#8BC34A" roughness={0.5} metalness={0.1} emissive="#6BA826" emissiveIntensity={0.1} />
      </mesh>
      {/* Grains on top */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[Math.cos(i * 1.2) * 0.25, 0.22, Math.sin(i * 1.2) * 0.25]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#F9A825" roughness={0.3} metalness={0.6} emissive="#F9A825" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

const WheatStalk = () => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.y += 0.003;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6 + 2) * 0.15;
  });

  return (
    <group ref={ref} position={[0, 0.3, 0]}>
      {/* Main stem */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.025, 1.8, 12]} />
        <meshStandardMaterial color="#7CB342" roughness={0.4} metalness={0.2} emissive="#5A8C2E" emissiveIntensity={0.1} />
      </mesh>
      {/* Wheat grains along top */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((y, i) => (
        <group key={i} position={[0, 0.55 + y, 0]} rotation={[0, i * 0.8, 0.3 * (i % 2 === 0 ? 1 : -1)]}>
          <mesh position={[0.08, 0, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#F9A825" roughness={0.3} metalness={0.5} emissive="#F9A825" emissiveIntensity={0.15} />
          </mesh>
          <mesh position={[-0.08, 0, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#E8B828" roughness={0.3} metalness={0.5} emissive="#E8B828" emissiveIntensity={0.15} />
          </mesh>
        </group>
      ))}
      {/* Leaves */}
      {[0.2, -0.3].map((y, i) => (
        <mesh key={`leaf-${i}`} position={[i === 0 ? 0.15 : -0.15, y, 0]} rotation={[0, 0, i === 0 ? -0.6 : 0.6]}>
          <planeGeometry args={[0.3, 0.08]} />
          <meshStandardMaterial color="#66BB6A" side={THREE.DoubleSide} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
};

const Lotus = () => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.y += 0.003;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7 + 4) * 0.15;
  });

  return (
    <group ref={ref} position={[1.8, 0, 0]}>
      {/* Center */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#F9A825" roughness={0.2} metalness={0.7} emissive="#F9A825" emissiveIntensity={0.3} />
      </mesh>
      {/* Petals - inner ring */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh key={`inner-${i}`} position={[Math.cos(angle) * 0.25, 0.05, Math.sin(angle) * 0.25]} rotation={[0.4, angle, 0.3]}>
            <planeGeometry args={[0.22, 0.35]} />
            <meshStandardMaterial color="#E91E63" side={THREE.DoubleSide} roughness={0.3} opacity={0.95} transparent emissive="#C2185B" emissiveIntensity={0.2} />
          </mesh>
        );
      })}
      {/* Petals - outer ring */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 + 0.3;
        return (
          <mesh key={`outer-${i}`} position={[Math.cos(angle) * 0.4, -0.05, Math.sin(angle) * 0.4]} rotation={[0.7, angle, 0.2]}>
            <planeGeometry args={[0.25, 0.4]} />
            <meshStandardMaterial color="#F06292" side={THREE.DoubleSide} roughness={0.3} opacity={0.9} transparent emissive="#EC407A" emissiveIntensity={0.15} />
          </mesh>
        );
      })}
    </group>
  );
};

// 3D Rotating Mandala Ring
const MandalaRing = () => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.z += 0.004;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
  });

  return (
    <group ref={ref} position={[0, 0, -0.5]}>
      {/* Outer ring with Indian colors (Saffron, White, Green) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const colors = ['#FF6F00', '#FFFFFF', '#138808']; // Saffron, White, Green
        const color = colors[i % 3];
        
        return (
          <mesh key={i} position={[Math.cos(angle) * 2, Math.sin(angle) * 2, 0]} rotation={[0, 0, angle]}>
            <cylinderGeometry args={[0.12, 0.12, 0.05, 12]} />
            <meshStandardMaterial 
              color={color} 
              roughness={color === '#FFFFFF' ? 0.2 : 0.25} 
              metalness={0.6} 
              emissive={color === '#FF6F00' ? '#FF6F00' : color === '#138808' ? '#138808' : '#FFFFFF'} 
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
      
      {/* Inner decorative rings */}
      {[1.3, 1.6, 2.0].map((radius, ringIdx) => (
        <group key={`ring-${ringIdx}`}>
          {Array.from({ length: 8 + ringIdx * 2 }).map((_, i) => {
            const angle = (i / (8 + ringIdx * 2)) * Math.PI * 2;
            return (
              <mesh key={`ring-${ringIdx}-dot-${i}`} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
                <sphereGeometry args={[0.08 - ringIdx * 0.02, 12, 12]} />
                <meshStandardMaterial 
                  color={ringIdx === 0 ? '#F9A825' : ringIdx === 1 ? '#D4A054' : '#FF6F00'}
                  roughness={0.2}
                  metalness={0.7}
                  emissive={ringIdx === 0 ? '#F9A825' : ringIdx === 1 ? '#D4A054' : '#FF6F00'}
                  emissiveIntensity={0.25}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
};

// Spinning Om Symbol / Chakra
const Chakra = () => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.z -= 0.005;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
  });

  return (
    <group ref={ref} position={[0, 2, -1]}>
      {/* Central sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial color="#FF6F00" roughness={0.15} metalness={0.8} emissive="#FF6F00" emissiveIntensity={0.4} />
      </mesh>
      
      {/* Rotating orbits */}
      {Array.from({ length: 3 }).map((_, orbitIdx) => (
        <group key={`orbit-${orbitIdx}`} rotation={[Math.PI * 0.2, 0, Math.PI * 0.3 * orbitIdx]}>
          {Array.from({ length: 4 }).map((_, i) => {
            const angle = (i / 4) * Math.PI * 2;
            const radius = 0.6 + orbitIdx * 0.3;
            const orbitalColors = ['#138808', '#F9A825', '#E91E63'];
            return (
              <mesh key={`orbit-dot-${orbitIdx}-${i}`} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
                <sphereGeometry args={[0.1 - orbitIdx * 0.02, 12, 12]} />
                <meshStandardMaterial 
                  color={orbitalColors[orbitIdx]}
                  roughness={0.2}
                  metalness={0.7}
                  emissive={orbitalColors[orbitIdx]}
                  emissiveIntensity={0.3}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
};

const ThreeScene = () => {
  return (
    <div className="absolute inset-0 hidden sm:block">
      <Canvas 
        camera={{ position: [0, 0, 5.5], fov: 50 }} 
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance'
        }}
      >
        {/* Enhanced professional lighting setup */}
        <ambientLight intensity={0.8} color="#ffffff" />
        
        {/* Key light - Saffron from top left */}
        <directionalLight 
          position={[-5, 6, 3]} 
          intensity={1.5} 
          color="#FF6F00"
          castShadow
        />
        
        {/* Fill light - Gold from right */}
        <directionalLight 
          position={[5, 3, 4]} 
          intensity={0.8} 
          color="#F9A825"
          castShadow
        />
        
        {/* Accent light - Green from bottom */}
        <directionalLight 
          position={[0, -3, -2]} 
          intensity={0.6} 
          color="#138808"
        />

        {/* Central Mandala Ring - prominent Indian element */}
        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.15}>
          <MandalaRing />
        </Float>

        {/* Chakra - sacred Indian symbol */}
        <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.25}>
          <Chakra />
        </Float>

        {/* Traditional elements */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <GrainBowl />
        </Float>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
          <WheatStalk />
        </Float>
        <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.35}>
          <Lotus />
        </Float>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
