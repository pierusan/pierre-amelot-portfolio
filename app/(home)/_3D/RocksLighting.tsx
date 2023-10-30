'use client';
import { type ComponentProps } from 'react';
import { useControls } from 'leva';
import { Environment } from '@react-three/drei';

const spotLightShadowMapSize = 2048;

export function RocksLighting() {
  const {
    color: ambientColor,
    intensity: ambientIntensity,
    visible: ambientVisible,
  } = useControls('Ambient Light', {
    color: '#ffffff',
    intensity: {
      value: 1,
      min: 0,
      max: 3,
      step: 0.1,
    },
    visible: true,
  });

  const {
    color: hemisphereColor,
    groundColor: hemisphereGroundColor,
    intensity: hemisphereIntensity,
    visible: hemisphereVisible,
  } = useControls('Hemisphere Light', {
    color: '#000000',
    groundColor: '#7e3e01',
    intensity: {
      value: 1,
      min: 0,
      max: 3,
      step: 0.1,
    },
    visible: true,
  });

  const {
    color: spotLeftColor,
    intensity: spotLeftIntensity,
    position: spotLeftPosition,
    visible: spotLeftVisible,
    distance: spotLeftDistance,
    angle: spotLeftAngle,
  } = useControls('Spot Light Left', {
    color: '#ffffff',
    intensity: {
      value: 15,
      min: 0,
      max: 30,
      step: 1,
    },
    position: [-2, 2, 1],
    visible: true,
    distance: 4,
    angle: 0.4,
  });

  const {
    color: spotRightColor,
    intensity: spotRightIntensity,
    position: spotRightPosition,
    visible: spotRightVisible,
    distance: spotRightDistance,
    angle: spotRightAngle,
  } = useControls('Spot Light Right', {
    color: '#eed3b4',
    intensity: {
      value: 15,
      min: 0,
      max: 30,
      step: 1,
    },
    position: [2, 2, 1],
    visible: true,
    distance: 4,
    angle: 0.4,
  });

  type EnvironmentName = ComponentProps<typeof Environment>['preset'];
  const defaultEnvironmentPreset: EnvironmentName = 'city';

  const { visible: environmentVisible, preset: environmentPreset } =
    useControls('Environment', {
      preset: defaultEnvironmentPreset,
      visible: false,
    });

  return (
    <>
      <ambientLight
        name="Ambient light White"
        intensity={ambientIntensity}
        color={ambientColor}
        visible={ambientVisible}
      />
      <hemisphereLight
        name="Hemisphere Light Orange"
        intensity={hemisphereIntensity}
        color={hemisphereColor}
        groundColor={hemisphereGroundColor}
        visible={hemisphereVisible}
      />
      <spotLight
        name="Spot Light Left"
        castShadow
        color={spotLeftColor}
        intensity={spotLeftIntensity}
        position={spotLeftPosition}
        distance={spotLeftDistance}
        angle={spotLeftAngle}
        shadow-mapSize-width={spotLightShadowMapSize}
        shadow-mapSize-height={spotLightShadowMapSize}
        visible={spotLeftVisible}
      />
      <spotLight
        name="Spot Light Right"
        castShadow
        color={spotRightColor}
        intensity={spotRightIntensity}
        position={spotRightPosition}
        distance={spotRightDistance}
        angle={spotRightAngle}
        shadow-mapSize-width={spotLightShadowMapSize}
        shadow-mapSize-height={spotLightShadowMapSize}
        visible={spotRightVisible}
      />
      {environmentVisible && (
        <Environment preset={environmentPreset as EnvironmentName} />
      )}
    </>
  );
}
