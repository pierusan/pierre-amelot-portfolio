'use client';
import { useControls } from 'leva';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { MathUtils, Mesh } from 'three';
import { animationIds } from '@/constants';

const rocksStackGLTFUrl =
  'https://storage.googleapis.com/pierre-portfolio-assets/pierre-portfolio-v2/rocks_stack.gltf';
if (typeof window !== 'undefined') {
  useGLTF.preload(rocksStackGLTFUrl);
}

type RocksGLTF = GLTF & {
  nodes: {
    Rock1: Mesh;
    Rock2: Mesh;
    Rock3: Mesh;
    Rock4: Mesh;
    Rock5: Mesh;
  };
};

const rockColors = {
  whiteish: '#cecece',
  grey1: '#b0b6b6',
  grey2: '#929292',
  grey3: '#7e7e7e',
} as const;

export function RocksStackObject() {
  const { nodes } = useGLTF(rocksStackGLTFUrl) as RocksGLTF;

  const { roughness, metalness, stackYRotation } = useControls('Rocks', {
    roughness: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.05,
    },
    metalness: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.05,
    },
    stackYRotation: {
      value: 0,
      min: 0,
      max: 360,
      step: 1,
    },
  });

  return (
    <group rotation={[0, MathUtils.degToRad(stackYRotation), 0]}>
      <group name={animationIds.homeProjects[4].rock} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rock5.geometry}
          position={[-0.878, 87.5, -6.15]}
        >
          <meshStandardMaterial
            attach="material"
            color={rockColors.grey3}
            roughness={roughness}
            metalness={metalness}
          />
        </mesh>
      </group>
      <group name={animationIds.homeProjects[3].rock} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rock4.geometry}
          position={[-0.511, 73.8, -6.822]}
          rotation={[
            MathUtils.degToRad(-0.02),
            MathUtils.degToRad(0.06),
            MathUtils.degToRad(1.83),
          ]}
        >
          <meshStandardMaterial
            attach="material"
            color={rockColors.grey1}
            roughness={roughness}
            metalness={metalness}
          />
        </mesh>
      </group>
      <group name={animationIds.homeProjects[2].rock} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rock3.geometry}
          position={[-9.221, 55, 0.508]}
          rotation={[
            MathUtils.degToRad(-160.7),
            MathUtils.degToRad(38.15),
            MathUtils.degToRad(172.12),
          ]}
        >
          <meshStandardMaterial
            attach="material"
            color={rockColors.whiteish}
            roughness={roughness}
            metalness={metalness}
          />
        </mesh>
      </group>
      <group name={animationIds.homeProjects[1].rock} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rock2.geometry}
          position={[-5.306, 27.901, 0]}
        >
          <meshStandardMaterial
            attach="material"
            color={rockColors.grey2}
            roughness={roughness}
            metalness={metalness}
          />
        </mesh>
      </group>
      <group name={animationIds.homeProjects[0].rock} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rock1.geometry}
          position={[0.034, 0.034, -1.286]}
        >
          <meshStandardMaterial
            attach="material"
            color={rockColors.grey1}
            roughness={roughness}
            metalness={metalness}
          />
        </mesh>
      </group>
    </group>
  );
}
