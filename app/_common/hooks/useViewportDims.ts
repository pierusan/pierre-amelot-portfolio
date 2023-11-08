import { useEffect, useState } from 'react';

export function useViewportDims() {
  const [viewportDims, setViewportDims] = useState<{
    width: number;
    height: number;
  }>();

  useEffect(() => {
    const handleResize = () => {
      setViewportDims({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewportDims;
}
