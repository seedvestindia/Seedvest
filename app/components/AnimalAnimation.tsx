"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

const animals = [
  { name: "Confident Bull", emoji: "🐂", image: "/images/png/Bull Venus.png" },
  { name: "Cautious Bear", emoji: "🐻", image: "/images/png/Bear Saturn.png" },
  {
    name: "Agile Rabbit",
    emoji: "🐇",
    image: "/images/png/Rabbit Mercury.png",
  },
  {
    name: "Opportunistic Stag",
    emoji: "🦌",
    image: "/images/png/Stag Jupiter.png",
  },
  {
    name: "Steady Turtle",
    emoji: "🐢",
    image: "/images/png/Turtle Earth.png",
  },
  {
    name: "Avoidant Ostrich",
    emoji: "🦩",
    image: "/images/png/Ostrich Uranus.png",
  },
  { name: "Follower Sheep", emoji: "🐑", image: "/images/png/Sheep Pluto.png" },
  {
    name: "Influential Whale",
    emoji: "🐋",
    image: "/images/png/Whale Neptune.png",
  },
  { name: "Strategic Wolf", emoji: "🐺", image: "/images/png/Wolf Mars.png" },
];

const radius = 190; // Increased spacing between orbiting images
const ORBIT_DURATION = 28;

export function AnimalOrbitAnimation() {
  const controls = useAnimation();
  const counterControls = useAnimation();
  const [active, setActive] = useState(0);

  // Smooth infinite rotation
  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: ORBIT_DURATION,
      },
    });

    // Counter-rotate at the same rate so each image visually stays upright
    counterControls.start({
      rotate: -360,
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: ORBIT_DURATION,
      },
    });
  }, [controls, counterControls]);

  // Change active independently (no layout jump)
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % animals.length);
    }, 2700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-1 h-[320px] sm:h-[470px] items-center justify-center">
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
                  animate={counterControls}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={animal.image}
                    alt={animal.name}
                    width={100}
                    height={100}
                    draggable={false}
                  />
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
        <Image
          src={animals[active].image}
          alt={animals[active].name}
          width={180}
          height={180}
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
