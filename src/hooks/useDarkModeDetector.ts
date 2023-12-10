import { useState, useEffect } from 'react';

const useDarkModeDetector = () => {
  const isDarkModePreferred = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDarkMode, setIsDarkMode] = useState(isDarkModePreferred());

  useEffect(() => {
    const darkModeMediaQuery: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    const darkModeChangeHandler = (event: MediaQueryListEvent): void => setIsDarkMode(event.matches);

    darkModeMediaQuery.addEventListener('change', darkModeChangeHandler);

    return () => darkModeMediaQuery.removeEventListener('change', darkModeChangeHandler);
  }, []);

  return isDarkMode;
};

export default useDarkModeDetector;
