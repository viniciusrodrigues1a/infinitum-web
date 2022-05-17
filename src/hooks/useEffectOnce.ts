import { useRef, useEffect } from "react";

/* eslint-disable-next-line import/prefer-default-export */
export function useEffectOnce(cb: () => void, condition: boolean): void {
  const hasBeenCalledRef = useRef<boolean>(false);

  useEffect(() => {
    if (condition && !hasBeenCalledRef.current) {
      hasBeenCalledRef.current = true;
      cb();
    }
  }, [cb, condition]);
}
