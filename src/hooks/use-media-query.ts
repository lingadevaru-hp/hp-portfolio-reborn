import { useState, useEffect } from "react";

/**
 * Custom hook for responsive media queries
 * @param query CSS media query string
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create media query list
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Define callback
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener for changes
    mediaQuery.addEventListener("change", handleChange);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
