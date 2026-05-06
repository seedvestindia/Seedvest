"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const animals = [
  { name: "Confident Bull", emoji: "🐂" },
  { name: "Cautious Bear", emoji: "🐻" },
  { name: "Agile Rabbit", emoji: "🐇" },
  { name: "Opportunistic Stag", emoji: "🦌" },
  { name: "Overeager Pig", emoji: "🐖" },
  { name: "Steady Tortoise", emoji: "🐢" },
  { name: "Risk-Averse Chicken", emoji: "🐔" },
  { name: "Avoidant Ostrich", emoji: "🦩" },
  { name: "Follower Sheep", emoji: "🐑" },
  { name: "Influential Whale", emoji: "🐋" },
  { name: "Strategic Wolf", emoji: "🐺" },
  { name: "Dominant Elephant", emoji: "🐘" },
];

const radius = 120;

export function AnimalOrbitAnimation() {
  const controls = useAnimation();
  const [active, setActive] = useState(0);

  // Smooth infinite rotation
  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: 28,
      },
    });
  }, [controls]);

  // Change active independently (no layout jump)
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % animals.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-[320px] w-[320px] items-center justify-center sm:h-[400px] sm:w-[400px]">
      {/* MASKED ORBIT CONTAINER */}
      <div className="orbit-mask absolute inset-0 flex items-center justify-center">
        <motion.div animate={controls} className="absolute h-full w-full">
          {animals.map((animal, i) => {
            const theta = (i / animals.length) * 2 * Math.PI;
            const x = radius * Math.cos(theta);
            const y = radius * Math.sin(theta);

            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
              >
                <motion.div
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl">{animal.emoji}</span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Center */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 40, scale: 1.2 }}
        animate={{
          opacity: [0, 1, 1, 1, 0],
          y: [40, 4, 0, 0, 0],
          scale: [1.2, 1.2, 0.92, 0.9],
        }}
        transition={{
          duration: 2.3,
          times: [0, 0.22, 0.35, 0.75, 1],
          ease: ["easeOut", "easeOut", "easeIn", "easeIn"],
        }}
        className="z-10 text-center"
      >
        <div className="text-3xl">{animals[active].emoji}</div>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {animals[active].name}
        </p>
      </motion.div>
    </div>
  );
}
