import { useEffect, useState } from 'react';

export function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover)');

    setCanHover(mql.matches);

    // During development we might switch between desktop and mobile devices so
    // we listen to change events
    const handleHoverChange = (event: MediaQueryListEvent) => {
      setCanHover(event.matches);
    };
    mql.addEventListener('change', handleHoverChange);

    return () => {
      mql.removeEventListener('change', handleHoverChange);
    };
  }, []);

  return canHover;
}
