import { OrbitControls, AdaptiveDpr, AdaptiveEvents, BakeShadows, PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense, useState } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const [dpr, setDpr] = useState(1.5); // Dynamic DPR setting

  return (
    <Canvas 
      camera={{ position: [0, 0, 15], fov: 45 }} 
      style={{ width: '100%', height: '100%' }}
      dpr={dpr} // Use the dynamic DPR setting
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      frameloop="demand" // Only render when needed
    >
      <PerformanceMonitor
        onIncline={() => setDpr(Math.min(dpr + 0.5, 2))}
        onDecline={() => setDpr(Math.max(dpr - 0.5, 1))}
      />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      
      {/* deep blue ambient */}
      <ambientLight intensity={0.3} color="#1a1a40" />
      {/* Directional light to enhance the room visibility */}
      <directionalLight position={[5, 10, 5]} intensity={0.8} color="#ffffff" />
      
      {/* Configure OrbitControls to disable panning and control zoom based on device type */}
      <OrbitControls
        enablePan={false} // Prevents panning of the scene
        enableZoom={!isTablet} // Disables zoom on tablets
        maxDistance={20} // Maximum distance for zooming out
        minDistance={5} // Minimum distance for zooming in
        minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
        maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
        autoRotate={true} // Auto-rotate for better showcase
        autoRotateSpeed={0.5} // Slow rotation speed
        enableDamping={true} // Smooth camera movement
        dampingFactor={0.05} // Lower value for smoother rotation
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={isMobile ? 50 : 100} /> {/* Reduce particles on mobile */}
        <group
          scale={isMobile ? 0.7 : 1.2}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room />
        </group>
        <BakeShadows /> {/* Bake shadows for better performance */}
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
