import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value.trim());

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value.trim());
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue.toUpperCase();
};
