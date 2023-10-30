'use client';
import { type ReactNode, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector2 } from 'three';
import { easing } from 'maath';

export function TurnTableMouseControlled({
  speedX,
  speedY,
  children,
}: {
  speedX: number;
  speedY: number;
  children: ReactNode;
}) {
  // To control rotation no matter where the mouse is positioned and hovering
  // on, we add a mousemove event listener to the entire document
  const mousePosition = useRef<Vector2>(new Vector2());
  useEffect(() => {
    const callback = (event: MouseEvent) => {
      mousePosition.current.x = event.x / window.innerWidth;
      mousePosition.current.y = event.y / window.innerHeight;
    };

    document.addEventListener('mousemove', callback);
    return () => {
      document.removeEventListener('mousemove', callback);
    };
  }, []);

  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;

    // Use dampE to smooth out the rotation
    easing.dampE(
      group.current.rotation,
      [
        // Zero rotation when the mouse is in the center of the screen
        (mousePosition.current.y - 0.5) * speedY,
        (mousePosition.current.x - 0.5) * speedX,
        0,
      ],
      0.25,
      delta
    );
  });

  return (
    <group ref={group} dispose={null}>
      {children}
    </group>
  );
}
