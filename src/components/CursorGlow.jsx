import { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const ref = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const current = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouse = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    let raf;
    const tick = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.06;
      current.current.y += (mouse.current.y - current.current.y) * 0.06;
      if (ref.current) {
        ref.current.style.setProperty('--gx', current.current.x + 'px');
        ref.current.style.setProperty('--gy', current.current.y + 'px');
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'radial-gradient(500px at var(--gx, -1000px) var(--gy, -1000px), rgba(255,255,255,0.08) 0%, transparent 70%)',
      }}
    />
  );
};

export default CursorGlow;
