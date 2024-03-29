'use client';

import { useLayoutEffect } from 'react';
import { gsap, Power1 } from 'gsap';
import { useThree } from '@react-three/fiber';
import { Euler, MathUtils, Vector3 } from 'three';
import { useAnimationStore } from '@/store';
import { animationIds } from '@/constants';
import { useMobileFirstBreakpoint } from '@/hooks/useMobileFirstBreakpoint';

type Transform = { position: Vector3; rotation: Euler };
type CameraKeyFrame = Transform & { startTs?: number; duration: number };

const nCards = animationIds.homeProjects.length;

// TODO: Use array to reuse in Rocks3DScene debug camera

const baseCameraVector = new Vector3(0, 1.15, 2);
const baseCameraRotation = new Euler(MathUtils.degToRad(-21.23), 0, 0); // Look down

export const initialDesktopCameraTransform: Transform = {
  position: baseCameraVector.clone().add(new Vector3(-1.1, 0.1, 0)), // Rocks on the right of the screen
  rotation: new Euler(
    baseCameraRotation.x,
    baseCameraRotation.y,
    baseCameraRotation.z - MathUtils.degToRad(8) // Now that rocks are on the right, roll the camera a bit to make them appear level
  ),
};

const initialMobileCameraTransform: Transform = {
  position: new Vector3(-0.05, 2, 3),
  rotation: baseCameraRotation.clone(),
};

// Use if we want to animate the camera as project cards are revealed
const cameraProjectKeyFrames: CameraKeyFrame[] = [
  // {
  //   position: baseCameraVector.clone().add(new Vector3(0, 0, 0)),
  //   rotation: baseCameraRotation.clone(),
  //   duration: 1,
  // },
  // {
  //   position: baseCameraVector.clone().add(new Vector3(-1, 0, 0)),
  //   rotation: baseCameraRotation.clone(),
  //   duration: 1,
  // },
];

const cameraLessonsLearnedKeyFrames: CameraKeyFrame[] = [
  {
    position: baseCameraVector.clone().multiplyScalar(0.75), // Zoom in
    rotation: baseCameraRotation.clone(),
    duration: 0.5,
  },
];

function LessonsLearnedSubtitleCameraAnimation() {
  const { lessonsLearnedSubtitleScaleDownTl: masterTl } = useAnimationStore();
  const { camera } = useThree();

  useLayoutEffect(() => {
    if (!masterTl) return;

    const gsapContext = gsap.context(() => {
      let cameraRecenterTl = gsap.timeline({
        defaults: { ease: Power1.easeOut },
      });

      cameraLessonsLearnedKeyFrames.forEach((keyFrame, index) => {
        // Add keyframes one after the other
        let startTs: gsap.Position = '>';
        if (index === 0) {
          startTs = 0;
        }

        cameraRecenterTl = cameraRecenterTl
          .to(
            camera.position,
            {
              x: keyFrame.position.x,
              y: keyFrame.position.y,
              z: keyFrame.position.z,
              duration: keyFrame.duration,
            },
            startTs
          )
          .to(
            camera.rotation,
            {
              x: keyFrame.rotation.x,
              y: keyFrame.rotation.y,
              z: keyFrame.rotation.z,
              duration: keyFrame.duration,
            },
            '<'
          );
      });

      // Blend the rocks scene with the dark green background
      cameraRecenterTl.set(
        `#${animationIds.home3DContainer}`,
        {
          'mix-blend-mode': 'multiply',
        },
        0
      );

      // Attach the timeline to the master timeline triggered on scroll
      masterTl.add(cameraRecenterTl, 0);
    });

    return () => {
      gsapContext.revert();
    };
  }, [camera, masterTl]);

  return null;
}

function ProjectCardsCameraAnimation() {
  const { camera } = useThree();

  useLayoutEffect(() => {
    const gsapContext = gsap.context(() => {
      let cardsInViewTL = gsap.timeline({
        scrollTrigger: {
          trigger: `:has(>#${animationIds.homeProjects[0].card})`,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        // Total duration easy to deal with
        duration: nCards,
      });

      cameraProjectKeyFrames.forEach((keyFrame, index) => {
        // Add keyframes one after the other
        let startTs: gsap.Position = '>';
        if (index === 0) {
          startTs = 0;
        }

        cardsInViewTL = cardsInViewTL
          .to(
            camera.position,
            {
              x: keyFrame.position.x,
              y: keyFrame.position.y,
              z: keyFrame.position.z,
              duration: keyFrame.duration,
            },
            startTs
          )
          .to(
            camera.rotation,
            {
              x: keyFrame.rotation.x,
              y: keyFrame.rotation.y,
              z: keyFrame.rotation.z,
              duration: keyFrame.duration,
            },
            '<'
          );
      });
    });

    return () => {
      gsapContext.revert();
    };
  }, [camera]);

  return null;
}

export function CameraAnimation() {
  const { camera } = useThree();
  const breakpoint = useMobileFirstBreakpoint();

  // Initial Camera transform
  useLayoutEffect(() => {
    let initialPosition = initialDesktopCameraTransform.position;
    let initialRotation = initialDesktopCameraTransform.rotation;

    switch (breakpoint) {
      case '2xl':
      case 'xl':
      case 'lg':
      case 'md': {
        initialPosition = initialDesktopCameraTransform.position;
        initialRotation = initialDesktopCameraTransform.rotation;
        break;
      }
      case 'sm':
      case '0': {
        initialPosition = initialMobileCameraTransform.position;
        initialRotation = initialMobileCameraTransform.rotation;
        break;
      }
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = breakpoint;
      }
    }

    camera.position.copy(initialPosition);
    camera.rotation.copy(initialRotation);
  }, [camera, breakpoint]);

  return (
    <>
      <ProjectCardsCameraAnimation />
      <LessonsLearnedSubtitleCameraAnimation />
    </>
  );
}
