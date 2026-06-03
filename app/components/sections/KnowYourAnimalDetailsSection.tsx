"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const animals = [
  {
    name: "Confident Bull",
    date: "April 22, 2025",
    icon: "🐂",
    description:
      "One of the two biggest 'gangs' of the stock market jungle. Bulls refer to investors who are optimistic, strong, and charge towards profits and glory with confidence. A bullish market is the best kind of market you could ask for. It signifies a rising, progressive market that will help its investors create more wealth and strengthen the economy.",
  },
  {
    name: "Cautious Bear",
    date: "July 3, 2025",
    icon: "🐻",
    description:
      "The Bears are the exact opposites of the bulls. Pessimistic and negative in their approach, bears are always worried about losing money. A bearish market is just like a bear in hibernation—a lazy, heavy burden that creates little or no money.",
  },
  {
    name: "Agile Rabbit",
    date: "March 15, 2024",
    icon: "🐇",
    description:
      "Quick and nimble, rabbits are traders who trade on the stock market for very short periods. They want to make a quick buck before moving onto the next profitable stock. Their trading sessions last for mere minutes, and more often than not, they come out winners in the financial race. Not to mention, brokers love them for all the transaction fees they pay.",
  },
  {
    name: "Opportunistic Stag",
    date: "September 8, 2024",
    icon: "🦌",
    description:
      "Stags are a class apart. They prefer not taking sides—they are neither bullish nor bearish. Their modus operandi is simple; they buy stocks of new issues or IPOs and sell them off for a profit as soon as the stocks start trading in the open market. They are good at sensing opportunities and strike while other traders are still deciding whether to buy a stock or not.",
  },
  {
    name: "Overeager Pig",
    date: "January 17, 2025",
    icon: "🐷",
    description:
      "Just like pigs in the animal kingdom who are greedy for more food, these investors cannot get enough of a good return. Forever hungry for more, they gobble up top stock tips, make a decent profit, and then chase even more, often bringing about their own downfall.",
  },
  {
    name: "Steady Tortoise",
    date: "November 11, 2024",
    icon: "🐢",
    description:
      "The tortoise is slow and steady in his approach. He takes carefully analyzed, level-headed decisions and is in no hurry to buy or sell stock. Tortoises are long-term investors who let their money grow patiently rather than chasing quick returns.",
  },
  {
    name: "Risk-Averse Chicken",
    date: "June 5, 2025",
    icon: "🐔",
    description:
      "Chickens are scared and under-confident investors. They dislike taking risks of any kind and therefore tend to stick with conventional investments such as fixed deposits, bonds, and government securities that are reliable and secure.",
  },
  {
    name: "Avoidant Ostrich",
    date: "February 14, 2025",
    icon: "🦤",
    description:
      "An ostrich is known for burying its head in the sand when danger approaches. Similarly, these investors ignore negative information regarding the stocks they trade and hope that poor-performing investments will somehow recover on their own.",
  },
  {
    name: "Follower Sheep",
    date: "August 29, 2024",
    icon: "🐑",
    description:
      "Sheep always live in herds. Likewise, a sheep investor follows the crowd when making financial decisions. They usually trust gurus and market sentiment more than their own independent research, believing that safety lies in numbers.",
  },
  {
    name: "Influential Whale",
    date: "May 9, 2025",
    icon: "🐋",
    description:
      "Whales are the largest creatures in the world and among the most powerful participants in the stock market. Their buying and selling decisions can significantly impact stock prices and market sentiment, creating opportunities for others to follow.",
  },
  {
    name: "Strategic Wolf",
    date: "December 2, 2024",
    icon: "🐺",
    description:
      "Sly and shrewd, wolves have one goal in mind—to make substantial profits. They are risk-takers who aggressively pursue opportunities and constantly look for an edge. They are known for their strategic and highly competitive approach.",
  },
  {
    name: "Dominant Elephant",
    date: "October 18, 2024",
    icon: "🐘",
    description:
      "Elephants are heavyweight investors, typically large institutions whose trades can move market prices. Their investment decisions are closely watched because they can influence overall market trends and create ripples throughout the financial markets.",
  },
];

const topAnimals = animals.slice(0, 6);
const bottomAnimals = animals.slice(6, 12);

function AnimalCard({ animal }: { animal: (typeof animals)[number] }) {
  return (
    <article className="w-[95%] mx-auto md:w-[650px] flex-shrink-0 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex h-full w-full items-center justify-center text-2xl">
            {animal.icon}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--foreground)]">
            {animal.name}
          </h3>
        </div>
      </div>

      <div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-green-500"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <span className="text-xs text-[var(--muted)]">{animal.date}</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)] h-[80px]">
          {animal.description}
        </p>
      </div>

      <div className="mt-6 border-t border-[var(--border)] pt-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[var(--foreground)]">
            SeedVest®
          </span>

          <div className="flex items-center gap-2">
            <span className="text-lg">{animal.icon}</span>

            <span className="text-sm font-medium text-[var(--foreground)]">
              {animal.name}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function KnowYourAnimalDetailsSection() {
  const [activeAnimal, setActiveAnimal] = useState(0);
  const directionRef = useRef(0);

  const cardVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      directionRef.current = 1;
      setActiveAnimal((prev) => (prev + 1) % animals.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-14">
      {/* Mobile / Tablet */}
      <div className="md:hidden overflow-hidden">
        <div className="relative">
          <AnimatePresence mode="wait" custom={directionRef.current}>
            <motion.div
              key={activeAnimal}
              custom={directionRef.current}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) {
                  directionRef.current = 1;
                  setActiveAnimal((prev) => (prev + 1) % animals.length);
                }

                if (info.offset.x > 50) {
                  directionRef.current = -1;
                  setActiveAnimal(
                    (prev) => (prev - 1 + animals.length) % animals.length,
                  );
                }
              }}
            >
              <AnimalCard animal={animals[activeAnimal]} />
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                directionRef.current = -1;
                setActiveAnimal(
                  (prev) => (prev - 1 + animals.length) % animals.length,
                );
              }}
              className="rounded-full border border-[var(--border)] p-2"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => {
                directionRef.current = 1;
                setActiveAnimal((prev) => (prev + 1) % animals.length);
              }}
              className="rounded-full border border-[var(--border)] p-2"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {animals.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  directionRef.current = index > activeAnimal ? 1 : -1;

                  setActiveAnimal(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === activeAnimal
                    ? "w-6 bg-[var(--foreground)]"
                    : "w-2 bg-[var(--border)]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-hidden">
        <div className="animal-marquee pb-6">
          <div className="animal-marquee-track">
            {[...topAnimals, ...topAnimals].map((animal, index) => (
              <AnimalCard key={`${animal.name}-${index}`} animal={animal} />
            ))}
          </div>
        </div>

        <div className="animal-marquee pb-6">
          <div className="animal-marquee-track animal-marquee-track-reverse">
            {[...bottomAnimals, ...bottomAnimals].map((animal, index) => (
              <AnimalCard key={`${animal.name}-${index}`} animal={animal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
