import _ from "lodash";
import { useCallback, useEffect, useRef } from "react";

export function useThrottle(
  callback: (...args: unknown[]) => void,
  delay: number,
) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });
  return useCallback(
    _.throttle((...args) => callbackRef.current(...args), delay, {
      leading: true,
      trailing: false,
    }),
    [delay],
  );
}
