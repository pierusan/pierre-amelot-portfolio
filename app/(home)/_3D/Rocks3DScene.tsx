'use client';

import { Canvas } from '@react-three/fiber';
import { Leva, useControls } from 'leva';
import { Grid, PerspectiveCamera } from '@react-three/drei';
// It seems like Next@14.0.2 broke usage of this performance monitor, probably
// with this change: https://github.com/vercel/next.js/pull/57784. Monitor the
// thread and bring it back later if a fix appears.
// import { Perf } from 'r3f-perf';
import { MathUtils, PCFSoftShadowMap } from 'three';
import { RocksAnimation } from './RocksAnimation';
import { RocksLighting } from './RocksLighting';
import { RocksStackObject } from './RocksStackObject';
import { TurnTableMouseControlled } from './TurnTableMouseControlled';
import { CameraAnimation } from './CameraAnimation';
import { cn } from '@/cn';
import { animationIds } from '@/constants';

// Set to true to debug and edit the scene
const showSceneControls = false;

export function Rocks3DScene({ className }: { className?: string }) {
  const {
    position: debugCameraPosition,
    rotation: debugCameraRotation,
    fov: debugCameraFov,
    show: showDebugCamera,
  } = useControls('Debug Camera', {
    show: false,
    position: [-1, 1.15, 2],
    rotation: [MathUtils.degToRad(-21.23), 0, 0],
    fov: { value: 60, min: 10, max: 100, step: 1 },
  });
  const { show: showGrid } = useControls('Grid', { show: false });
  // const { show: showPerformanceMonitor } = useControls('Performance Monitor', {
  //   show: false,
  // });

  return (
    <div
      id={animationIds.home3DContainer}
      className={cn('fixed top-0 h-screen w-screen', className)}
    >
      <Canvas shadows={{ type: PCFSoftShadowMap }} camera={{ fov: 60 }}>
        <TurnTableMouseControlled speedX={1} speedY={0.2}>
          <RocksStackObject />
          <RocksLighting />
          {showGrid && (
            <Grid
              sectionColor={'grey'}
              sectionThickness={1.25}
              args={[10, 10]}
            />
          )}
        </TurnTableMouseControlled>
        {/* When debugging the camera, turn off animations */}
        {showDebugCamera || (
          <>
            <RocksAnimation />
            <CameraAnimation />
          </>
        )}
        {showDebugCamera && (
          <PerspectiveCamera
            makeDefault
            position={debugCameraPosition}
            rotation={debugCameraRotation}
            fov={debugCameraFov}
          />
        )}
        {/* {showPerformanceMonitor && <Perf />} */}
      </Canvas>
      {showSceneControls || <Leva hidden />}
    </div>
  );
}
