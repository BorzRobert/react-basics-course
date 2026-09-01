import { useState, useEffect } from 'react';

// Hook care ține dimensiunile ferestrei și se actualizează la resize.
// useEffect are rolul de a seta listener-ul și a-l curata (cleanup).
export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler care se cheamă la fiecare resize.
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Înregistrează listener-ul.
    window.addEventListener('resize', handleResize);

    // Cleanup: elimină listener-ul când componenta se demontează
    // (evităm memory leak-uri și apeluri la componente șterse).
    return () => window.removeEventListener('resize', handleResize);
  }, []); // [] = effect-ul se rulează o singură dată (la montare).

  return size;
}
