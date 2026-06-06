import { useMemo } from 'react';

export default function Meteors({ number = 20 }) {
  const meteors = useMemo(() => {
    return Array.from({ length: number }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 1200 - 100),
      delay: Math.random() * 0.8 + 0.2,
      duration: Math.floor(Math.random() * 10 + 3),
    }));
  }, [number]);

  return (
    <>
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute top-0 h-0.5 w-0.5 rounded-full bg-zinc-400 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] animate-meteor-effect before:absolute before:top-1/2 before:-translate-y-1/2 before:w-[50px] before:h-px before:bg-gradient-to-r before:from-zinc-400 before:to-transparent"
          style={{
            left: m.left + 'px',
            animationDelay: m.delay + 's',
            animationDuration: m.duration + 's',
          }}
        />
      ))}
    </>
  );
}
