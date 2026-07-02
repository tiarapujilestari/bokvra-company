import { useEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

interface Wisp {
  id: number;
  x: number;
  y: number;
}

export default function SteamCursor({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement>;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });
  const [wisps, setWisps] = useState<Wisp[]>([]);
  const lastSpawn = useRef(0);
  const idCounter = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);

      const now = performance.now();
      if (now - lastSpawn.current > 140) {
        lastSpawn.current = now;
        idCounter.current += 1;
        const id = idCounter.current;
        setWisps((prev) => [...prev.slice(-8), { id, x, y }]);
        window.setTimeout(() => {
          setWisps((prev) => prev.filter((w) => w.id !== id));
        }, 1400);
      }
    }

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [containerRef, mouseX, mouseY]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(200,150,101,0.55) 0%, rgba(200,150,101,0) 70%)",
        }}
      />
      <AnimatePresence>
        {wisps.map((w) => (
          <motion.span
            key={w.id}
            className="absolute h-2 w-2 rounded-full bg-cream/70 blur-[2px]"
            style={{ left: w.x, top: w.y }}
            initial={{ opacity: 0, scale: 0.4, y: 0 }}
            animate={{
              opacity: 0.6,
              scale: 1.6,
              y: -70,
              x: (Math.random() - 0.5) * 40,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
