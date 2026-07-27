"use client";

import { Float, Html, Sparkles, Stars, Trail } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaQuora,
  FaRedditAlien,
  FaSnapchatGhost,
  FaSpotify,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import * as THREE from "three";

type SocialIcon = {
  icon: React.ReactNode;
  url: string;
  position: [number, number, number];
  color: string;
};

const socials: SocialIcon[] = [
  {
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/seedvest-835425415/",
    position: [-3, 1, 0],
    color: "#0077B5",
  },
  {
    icon: <FaInstagram />,
    url: "https://www.instagram.com/seedvest.in/",
    position: [3, 1.5, -1],
    color: "#E1306C",
  },
  {
    icon: <FaYoutube />,
    url: "https://www.youtube.com/channel/UCxrJat6aEGpsnvgdhGWSmjw",
    position: [-2, -1.5, 1],
    color: "#FF0000",
  },
  {
    icon: <FaWhatsapp />,
    url: "https://api.whatsapp.com/send/?phone=8169546916&text&type=phone_number&app_absent=0",
    position: [2, -1, -2],
    color: "#25D366",
  },
  {
    icon: <FaXTwitter />,
    url: "https://x.com/SeedVest",
    position: [0, 2, -1.5],
    color: "#4a4a4a",
  },
  {
    icon: <FaFacebook />,
    url: "https://www.facebook.com/profile.php?id=61591058955716",
    position: [3.5, -2, 1.5],
    color: "#1877F2",
  },
  {
    icon: <FaThreads />,
    url: "https://www.threads.com/@seedvest.in",
    position: [-3.5, 2, -2],
    color: "#4a4a4a",
  },
  {
    icon: <FaSpotify />,
    url: "https://open.spotify.com/user/31qkf7paqq5zn6mbaudqewkfbhpu",
    position: [1.5, 2.5, 1],
    color: "#1DB954",
  },
  {
    icon: <FaPinterest />,
    url: "https://in.pinterest.com/seedvestindia/",
    position: [-1.5, -2.5, -1],
    color: "#E60023",
  },
  {
    icon: <FaSnapchatGhost />,
    url: "https://www.snapchat.com/@seedvest",
    position: [4, 1, -2.5],
    color: "#c9b400",
  },
  {
    icon: <FaRedditAlien />,
    url: "https://www.reddit.com/user/SeedVest/",
    position: [-4, -1, 2],
    color: "#FF4500",
  },
  {
    icon: <FaQuora />,
    url: "https://www.quora.com/profile/Seedvest",
    position: [0, -2.8, -0.5],
    color: "#B92B27",
  },
];

// DVD-logo style bounce: each icon owns a position + velocity and
// reflects off the exact visible bounds at its own depth (z).
const BouncingIcon = ({
  icon,
  url,
  position,
  color,
  index,
  isDark,
}: SocialIcon & { index: number; isDark: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const posRef = useRef(new THREE.Vector3(...position));
  const speed = 0.45 + (index % 5) * 0.07;
  const angle = (index / socials.length) * Math.PI * 2 + index * 0.7;
  const velRef = useRef(
    new THREE.Vector2(Math.cos(angle) * speed, Math.sin(angle) * speed)
  );
  const margin = 0.85; // buffer so the badge itself never clips the edge

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const { camera, viewport } = state;
    const z = posRef.current.z;

    // visible half-width/height at this icon's depth, accounting for perspective
    const vp = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, z));
    const halfW = Math.max(vp.width / 2 - margin, 0.2);
    const halfH = Math.max(vp.height / 2 - margin, 0.2);

    posRef.current.x += velRef.current.x * delta;
    posRef.current.y += velRef.current.y * delta;

    if (posRef.current.x > halfW) {
      posRef.current.x = halfW;
      velRef.current.x *= -1;
    } else if (posRef.current.x < -halfW) {
      posRef.current.x = -halfW;
      velRef.current.x *= -1;
    }

    if (posRef.current.y > halfH) {
      posRef.current.y = halfH;
      velRef.current.y *= -1;
    } else if (posRef.current.y < -halfH) {
      posRef.current.y = -halfH;
      velRef.current.y *= -1;
    }

    groupRef.current.position.set(posRef.current.x, posRef.current.y, z);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.4}>
        <Html center transform occlude={false}>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`icon-badge ${isDark ? "icon-badge-dark" : "icon-badge-light"}`}
            style={{ ["--icon-color" as string]: color }}
          >
            <span className="icon-badge-inner">{icon}</span>
          </Link>
        </Html>
      </Float>
      <style jsx>{`
        .icon-badge {
          --icon-color: ${color};
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(40px, 6.5vw, 66px);
          height: clamp(40px, 6.5vw, 66px);
          border-radius: 50%;
          cursor: pointer;
          background: radial-gradient(
            circle at 32% 28%,
            rgba(255, 255, 255, 0.95) 0%,
            var(--icon-color) 45%,
            rgba(0, 0, 0, 0.55) 100%
          );
          transform-style: preserve-3d;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .icon-badge-dark {
          box-shadow:
            0 6px 18px rgba(0, 0, 0, 0.55),
            inset -5px -5px 12px rgba(0, 0, 0, 0.45),
            inset 4px 4px 10px rgba(255, 255, 255, 0.35);
        }
        .icon-badge-light {
          box-shadow:
            0 6px 16px rgba(0, 0, 0, 0.25),
            0 0 0 2px rgba(0, 0, 0, 0.06),
            inset -5px -5px 12px rgba(0, 0, 0, 0.35),
            inset 4px 4px 10px rgba(255, 255, 255, 0.5);
        }
        .icon-badge:hover {
          transform: scale(1.22) rotateY(16deg) rotateX(-6deg);
        }
        .icon-badge-inner {
          color: #ffffff;
          font-size: clamp(1.05rem, 2.8vw, 1.9rem);
          filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.6));
          display: flex;
        }
      `}</style>
    </group>
  );
};

const Comet = ({
  startPos,
  endPos,
  speed = 0.05,
  color = "#ffffff",
  delay = 0,
}: {
  startPos: [number, number, number];
  endPos: [number, number, number];
  speed?: number;
  color?: string;
  delay?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const start = new THREE.Vector3(...startPos);
  const end = new THREE.Vector3(...endPos);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * speed + delay) % 1;
    ref.current.position.lerpVectors(start, end, t);
  });

  return (
    <Trail width={2} length={6} color={color} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
};

const DistantStar = ({
  position = [-15, 8, -40] as [number, number, number],
}) => (
  <group position={position}>
    <mesh>
      <sphereGeometry args={[0.6, 16, 16]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
    <mesh>
      <sphereGeometry args={[1.2, 16, 16]} />
      <meshBasicMaterial color="#aaddff" transparent opacity={0.25} />
    </mesh>
    <mesh>
      <sphereGeometry args={[2.2, 16, 16]} />
      <meshBasicMaterial color="#88bbff" transparent opacity={0.08} />
    </mesh>
    <pointLight color="#aaddff" intensity={2} distance={50} />
  </group>
);

const getParticlesOptions = (isDark: boolean): ISourceOptions => ({
  fullScreen: { enable: false },
  background: { color: "transparent" },
  fpsLimit: 60,
  particles: {
    number: { value: 200, density: { enable: true } },
    color: {
      value: isDark
        ? ["#ffffff", "#aeefff", "#ffd6a5"]
        : ["#1a1a2e", "#2b4c7e", "#8a5a00"],
    },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.3, max: isDark ? 1 : 0.7 },
      animation: { enable: true, speed: 0.6, sync: false },
    },
    size: { value: { min: 0.5, max: 2.2 } },
    move: {
      enable: false,
      speed: 0.4,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
    links: { enable: false },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: ["grab"] },
      onClick: { enable: true, mode: "bubble" },
      resize: { enable: true },
    },
    modes: {
      grab: { distance: 160, links: { opacity: isDark ? 0.3 : 0.4 } },
      repulse: { distance: 120, duration: 0.4, speed: 1 },
      bubble: { distance: 120, size: 3.5, opacity: 0.9, duration: 1.5 },
    },
  },
  detectRetina: true,
});

const useIsDarkMode = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const compute = () => {
      if (root.classList.contains("dark")) return true;
      if (root.classList.contains("light")) return false;
      return media.matches;
    };

    setIsDark(compute());

    const observer = new MutationObserver(() => setIsDark(compute()));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    const onMediaChange = () => setIsDark(compute());
    media.addEventListener("change", onMediaChange);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", onMediaChange);
    };
  }, []);

  return isDark;
};

const SocialsContent = () => {
  const [ready, setReady] = useState(false);
  const isDark = useIsDarkMode();

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options = useMemo(() => getParticlesOptions(isDark), [isDark]);
  const cometColors = isDark
    ? ["#ffffff", "#aeefff", "#ffd6a5"]
    : ["#333355", "#2b4c7e", "#8a5a00"];

  return (
    <div
      className={`pt-20 h-[clamp(420px,70vh,700px)] w-full relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {ready && (
        <Particles
          id="tsparticles"
          options={options}
          className="absolute inset-0 z-0"
        />
      )}

      <Canvas
        className="absolute inset-0 z-10"
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={isDark ? 0.3 : 0.6} />
        <pointLight position={[10, 10, 10]} />

        <Stars
          radius={100}
          depth={50}
          count={2000}
          factor={3}
          saturation={0}
          fade
          speed={1}
        />
        <Sparkles
          count={100}
          scale={20}
          size={2}
          speed={0.3}
          color={isDark ? "#ffffff" : "#333355"}
          opacity={isDark ? 0.5 : 0.3}
        />

        <DistantStar position={[-15, 8, -40]} />

        <Comet
          startPos={[-20, 10, -10]}
          endPos={[20, -8, -15]}
          speed={0.05}
          color={cometColors[0]}
          delay={0}
        />
        <Comet
          startPos={[15, 12, -20]}
          endPos={[-18, -6, -5]}
          speed={0.035}
          color={cometColors[1]}
          delay={0.4}
        />
        <Comet
          startPos={[-10, -12, -25]}
          endPos={[22, 10, -10]}
          speed={0.06}
          color={cometColors[2]}
          delay={0.7}
        />

        {socials.map((s, i) => (
          <BouncingIcon key={i} {...s} index={i} isDark={isDark} />
        ))}
      </Canvas>
    </div>
  );
};

export default SocialsContent;

// "use client";

// import { Float, Html, Sparkles, Stars, Trail } from "@react-three/drei";
// import { Canvas, useFrame } from "@react-three/fiber";
// import type { Engine, ISourceOptions } from "@tsparticles/engine";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";
// import Link from "next/link";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaPinterest,
//   FaQuora,
//   FaRedditAlien,
//   FaSnapchatGhost,
//   FaSpotify,
//   FaWhatsapp,
//   FaYoutube,
// } from "react-icons/fa";
// import { FaThreads, FaXTwitter } from "react-icons/fa6";
// import * as THREE from "three";

// type SocialIcon = {
//   icon: React.ReactNode;
//   url: string;
//   position: [number, number, number];
//   color: string;
// };

// const socials: SocialIcon[] = [
//   {
//     icon: <FaLinkedin />,
//     url: "https://www.linkedin.com/in/seedvest-835425415/",
//     position: [-3, 1, 0],
//     color: "#0077B5",
//   },
//   {
//     icon: <FaInstagram />,
//     url: "https://www.instagram.com/seedvest.in/",
//     position: [3, 1.5, -1],
//     color: "#E1306C",
//   },
//   {
//     icon: <FaYoutube />,
//     url: "https://www.youtube.com/channel/UCxrJat6aEGpsnvgdhGWSmjw",
//     position: [-2, -1.5, 1],
//     color: "#FF0000",
//   },
//   {
//     icon: <FaWhatsapp />,
//     url: "https://api.whatsapp.com/send/?phone=8169546916&text&type=phone_number&app_absent=0",
//     position: [2, -1, -2],
//     color: "#25D366",
//   },
//   {
//     icon: <FaXTwitter />,
//     url: "https://x.com/SeedVest",
//     position: [0, 2, -1.5],
//     color: "#ffffff",
//   },
//   {
//     icon: <FaFacebook />,
//     url: "https://www.facebook.com/profile.php?id=61591058955716",
//     position: [3.5, -2, 1.5],
//     color: "#1877F2",
//   },
//   {
//     icon: <FaThreads />,
//     url: "https://www.threads.com/@seedvest.in",
//     position: [-3.5, 2, -2],
//     color: "#ffffff",
//   },
//   {
//     icon: <FaSpotify />,
//     url: "https://open.spotify.com/user/31qkf7paqq5zn6mbaudqewkfbhpu",
//     position: [1.5, 2.5, 1],
//     color: "#1DB954",
//   },
//   {
//     icon: <FaPinterest />,
//     url: "https://in.pinterest.com/seedvestindia/",
//     position: [-1.5, -2.5, -1],
//     color: "#E60023",
//   },
//   {
//     icon: <FaSnapchatGhost />,
//     url: "https://www.snapchat.com/@seedvest",
//     position: [4, 1, -2.5],
//     color: "#FFFC00",
//   },
//   {
//     icon: <FaRedditAlien />,
//     url: "https://www.reddit.com/user/SeedVest/",
//     position: [-4, -1, 2],
//     color: "#FF4500",
//   },
//   {
//     icon: <FaQuora />,
//     url: "https://www.quora.com/profile/Seedvest",
//     position: [0, -2.8, -0.5],
//     color: "#B92B27",
//   },
// ];

// // DVD-logo style bounce: each icon owns a position + velocity and
// // reflects off the exact visible bounds at its own depth (z).
// const BouncingIcon = ({
//   icon,
//   url,
//   position,
//   color,
//   index,
//   isDark,
// }: SocialIcon & { index: number; isDark: boolean }) => {
//   const groupRef = useRef<THREE.Group>(null);
//   const posRef = useRef(new THREE.Vector3(...position));
//   const speed = 0.45 + (index % 5) * 0.07;
//   const angle = (index / socials.length) * Math.PI * 2 + index * 0.7;
//   const velRef = useRef(
//     new THREE.Vector2(Math.cos(angle) * speed, Math.sin(angle) * speed)
//   );
//   const margin = 0.6; // buffer so the icon itself never clips the edge

//   useFrame((state, delta) => {
//     if (!groupRef.current) return;
//     const { camera, viewport } = state;
//     const z = posRef.current.z;

//     // visible half-width/height at this icon's depth, accounting for perspective
//     const vp = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, z));
//     const halfW = Math.max(vp.width / 2 - margin, 0.2);
//     const halfH = Math.max(vp.height / 2 - margin, 0.2);

//     posRef.current.x += velRef.current.x * delta;
//     posRef.current.y += velRef.current.y * delta;

//     if (posRef.current.x > halfW) {
//       posRef.current.x = halfW;
//       velRef.current.x *= -1;
//     } else if (posRef.current.x < -halfW) {
//       posRef.current.x = -halfW;
//       velRef.current.x *= -1;
//     }

//     if (posRef.current.y > halfH) {
//       posRef.current.y = halfH;
//       velRef.current.y *= -1;
//     } else if (posRef.current.y < -halfH) {
//       posRef.current.y = -halfH;
//       velRef.current.y *= -1;
//     }

//     groupRef.current.position.set(posRef.current.x, posRef.current.y, z);
//   });

//   return (
//     <group ref={groupRef}>
//       <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
//         <Html center transform occlude={false}>
//           <Link
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             style={{
//               color: isDark ? color : color === "#ffffff" ? "#1a1a1a" : color,
//               fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
//               cursor: "pointer",
//               display: "block",
//             }}
//             className="hover:scale-125 transition-transform duration-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
//           >
//             {icon}
//           </Link>
//         </Html>
//       </Float>
//     </group>
//   );
// };

// const Comet = ({
//   startPos,
//   endPos,
//   speed = 0.05,
//   color = "#ffffff",
//   delay = 0,
// }: {
//   startPos: [number, number, number];
//   endPos: [number, number, number];
//   speed?: number;
//   color?: string;
//   delay?: number;
// }) => {
//   const ref = useRef<THREE.Mesh>(null);
//   const start = new THREE.Vector3(...startPos);
//   const end = new THREE.Vector3(...endPos);

//   useFrame(({ clock }) => {
//     if (!ref.current) return;
//     const t = (clock.getElapsedTime() * speed + delay) % 1;
//     ref.current.position.lerpVectors(start, end, t);
//   });

//   return (
//     <Trail width={2} length={6} color={color} attenuation={(t) => t * t}>
//       <mesh ref={ref}>
//         <sphereGeometry args={[0.05, 8, 8]} />
//         <meshBasicMaterial color={color} />
//       </mesh>
//     </Trail>
//   );
// };

// const DistantStar = ({
//   position = [-15, 8, -40] as [number, number, number],
// }) => (
//   <group position={position}>
//     <mesh>
//       <sphereGeometry args={[0.6, 16, 16]} />
//       <meshBasicMaterial color="#ffffff" />
//     </mesh>
//     <mesh>
//       <sphereGeometry args={[1.2, 16, 16]} />
//       <meshBasicMaterial color="#aaddff" transparent opacity={0.25} />
//     </mesh>
//     <mesh>
//       <sphereGeometry args={[2.2, 16, 16]} />
//       <meshBasicMaterial color="#88bbff" transparent opacity={0.08} />
//     </mesh>
//     <pointLight color="#aaddff" intensity={2} distance={50} />
//   </group>
// );

// // tsParticles config: interactive stars with a grab effect on hover (original behavior)
// const getParticlesOptions = (isDark: boolean): ISourceOptions => ({
//   fullScreen: { enable: false },
//   background: { color: "transparent" },
//   fpsLimit: 60,
//   particles: {
//     number: { value: 160, density: { enable: true } },
//     color: {
//       value: isDark
//         ? ["#ffffff", "#aeefff", "#ffd6a5"]
//         : ["#1a1a2e", "#2b4c7e", "#8a5a00"],
//     },
//     shape: { type: "circle" },
//     opacity: {
//       value: { min: 0.3, max: isDark ? 1 : 0.7 },
//       animation: { enable: true, speed: 0.6, sync: false },
//     },
//     size: { value: { min: 0.5, max: 2 } },
//     move: {
//       enable: true,
//       speed: 0.3,
//       direction: "none",
//       random: true,
//       straight: false,
//       outModes: { default: "out" },
//     },
//     links: { enable: false },
//   },
//   interactivity: {
//     events: {
//       onHover: { enable: true, mode: "grab" },
//       onClick: { enable: true, mode: "bubble" },
//       resize: { enable: true },
//     },
//     modes: {
//       grab: {
//         distance: 120,
//         links: { opacity: isDark ? 0.15 : 0.25 },
//       },
//       bubble: {
//         distance: 100,
//         size: 3,
//         opacity: 0.8,
//         duration: 1.5,
//       },
//     },
//   },
//   detectRetina: true,
// });

// const useIsDarkMode = () => {
//   const [isDark, setIsDark] = useState(true);

//   useEffect(() => {
//     const root = document.documentElement;
//     const media = window.matchMedia("(prefers-color-scheme: dark)");

//     const compute = () => {
//       if (root.classList.contains("dark")) return true;
//       if (root.classList.contains("light")) return false;
//       return media.matches;
//     };

//     setIsDark(compute());

//     const observer = new MutationObserver(() => setIsDark(compute()));
//     observer.observe(root, { attributes: true, attributeFilter: ["class"] });

//     const onMediaChange = () => setIsDark(compute());
//     media.addEventListener("change", onMediaChange);

//     return () => {
//       observer.disconnect();
//       media.removeEventListener("change", onMediaChange);
//     };
//   }, []);

//   return isDark;
// };

// const SocialsContent = () => {
//   const [ready, setReady] = useState(false);
//   const isDark = useIsDarkMode();

//   useEffect(() => {
//     initParticlesEngine(async (engine: Engine) => {
//       await loadSlim(engine);
//     }).then(() => setReady(true));
//   }, []);

//   const options = useMemo(() => getParticlesOptions(isDark), [isDark]);
//   const cometColors = isDark
//     ? ["#ffffff", "#aeefff", "#ffd6a5"]
//     : ["#333355", "#2b4c7e", "#8a5a00"];

//   return (
//     <div
//       className={`pt-20 h-150 w-full relative overflow-hidden transition-colors duration-500 ${
//         isDark ? "bg-black" : "bg-white"
//       }`}
//     >
//       {/* interactive particle background layer */}
//       {ready && (
//         <Particles
//           id="tsparticles"
//           options={options}
//           className="absolute inset-0 z-0"
//         />
//       )}

//       {/* 3D layer: transparent bg so particles show through */}
//       <Canvas
//         className="absolute inset-0 z-10"
//         camera={{ position: [0, 0, 8], fov: 50 }}
//         gl={{ alpha: true }}
//         onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
//       >
//         <ambientLight intensity={isDark ? 0.3 : 0.6} />
//         <pointLight position={[10, 10, 10]} />

//         <Stars
//           radius={100}
//           depth={50}
//           count={2000}
//           factor={3}
//           saturation={0}
//           fade
//           speed={1}
//         />
//         <Sparkles
//           count={100}
//           scale={20}
//           size={2}
//           speed={0.3}
//           color={isDark ? "#ffffff" : "#333355"}
//           opacity={isDark ? 0.5 : 0.3}
//         />

//         <DistantStar position={[-15, 8, -40]} />

//         <Comet
//           startPos={[-20, 10, -10]}
//           endPos={[20, -8, -15]}
//           speed={0.05}
//           color={cometColors[0]}
//           delay={0}
//         />
//         <Comet
//           startPos={[15, 12, -20]}
//           endPos={[-18, -6, -5]}
//           speed={0.035}
//           color={cometColors[1]}
//           delay={0.4}
//         />
//         <Comet
//           startPos={[-10, -12, -25]}
//           endPos={[22, 10, -10]}
//           speed={0.06}
//           color={cometColors[2]}
//           delay={0.7}
//         />

//         {socials.map((s, i) => (
//           <BouncingIcon key={i} {...s} index={i} isDark={isDark} />
//         ))}
//       </Canvas>
//     </div>
//   );
// };

// export default SocialsContent;