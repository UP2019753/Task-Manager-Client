import { useEffect, useRef } from "react";

export const useRequestAnimationFrame = (callback: () => void) => {
  const requestRef = useRef(0);
  const callbackFnRef = useRef(callback);

  useEffect(() => {
    callbackFnRef.current = callback;
  }, [callback]); // Make sure the effect runs only once

  const animate = () => {
    callbackFnRef.current();
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once
};
