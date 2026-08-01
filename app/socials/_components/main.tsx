"use client";

import { Float, Html, Sparkles, Stars, Trail } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

// Comets stay well clear of the icon depths/positions above so an
// on-screen click never has to choose between a comet and a social badge.
const cometPaths: {
  startPos: [number, number, number];
  endPos: [number, number, number];
  speed: number;
  delay: number;
}[] = [
  { startPos: [-20, 10, -10], endPos: [20, -8, -15], speed: 0.05, delay: 0 },
  { startPos: [15, 12, -20], endPos: [-18, -6, -5], speed: 0.035, delay: 0.4 },
  { startPos: [-10, -12, -25], endPos: [22, 10, -10], speed: 0.06, delay: 0.7 },
];

// ---------------------------------------------------------------------------
// Cookie helpers for the comet-clicking game score
// ---------------------------------------------------------------------------
const SCORE_COOKIE_KEY = "seedvest_comet_score";

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
};

const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; SameSite=Lax`;
};

// DVD-logo style bounce, now with icon-vs-icon collisions handled by the
// parent (IconField). This component just renders into a group whose
// position is driven externally each frame — no physics of its own.
const BouncingIcon = ({
  icon,
  url,
  color,
  isDark,
  groupRef,
}: {
  icon: React.ReactNode;
  url: string;
  color: string;
  isDark: boolean;
  groupRef: (el: THREE.Group | null) => void;
}) => {
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

// Mirrors the CSS `clamp(40px, 6.5vw, 66px)` badge diameter so the hitbox
// tracks the actual rendered size instead of guessing a fixed value.
const getBadgeDiameterPx = (canvasWidthPx: number) =>
  Math.min(66, Math.max(40, canvasWidthPx * 0.065));

// Icons are wrapped in memo() and only depend on isDark, so a score update
// in the parent can never cause them (or their real <Link> anchors) to
// re-render or shift position under a comet. All icon physics — edge bounce
// AND icon-vs-icon collisions — run here in a single useFrame so every icon
// can see every other icon's position each tick.
const IconField = React.memo(function IconField({ isDark }: { isDark: boolean }) {
  const count = socials.length;

  const posRefs = useRef<THREE.Vector3[]>(
    socials.map((s) => new THREE.Vector3(...s.position))
  );
  const velRefs = useRef<THREE.Vector2[]>(
    socials.map((_, index) => {
      const speed = 0.45 + (index % 5) * 0.07;
      const angle = (index / socials.length) * Math.PI * 2 + index * 0.7;
      return new THREE.Vector2(Math.cos(angle) * speed, Math.sin(angle) * speed);
    })
  );
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  // recomputed every frame: each icon's real hitbox radius, in world units,
  // matching its actual CSS pixel size at its own depth
  const radiiRef = useRef<number[]>(socials.map(() => 0.4));

  useFrame((state, delta) => {
    const { camera, viewport, size } = state;
    const badgeDiameterPx = getBadgeDiameterPx(size.width);

    // 0. figure out each icon's real on-screen radius, converted to world
    //    units at its own depth, so the hitbox matches what's rendered
    for (let i = 0; i < count; i++) {
      const pos = posRefs.current[i];
      const vp = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, pos.z));
      const worldPerPx = vp.width / size.width;
      radiiRef.current[i] = (badgeDiameterPx * worldPerPx) / 2;
    }

    // 1. integrate motion + bounce off the screen edges (per-icon, since
    //    each icon's visible bounds AND radius depend on its own depth/z)
    for (let i = 0; i < count; i++) {
      const pos = posRefs.current[i];
      const vel = velRefs.current[i];
      const radius = radiiRef.current[i];
      const vp = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, pos.z));
      const halfW = Math.max(vp.width / 2 - radius, 0.2);
      const halfH = Math.max(vp.height / 2 - radius, 0.2);

      pos.x += vel.x * delta;
      pos.y += vel.y * delta;

      if (pos.x > halfW) {
        pos.x = halfW;
        vel.x *= -1;
      } else if (pos.x < -halfW) {
        pos.x = -halfW;
        vel.x *= -1;
      }
      if (pos.y > halfH) {
        pos.y = halfH;
        vel.y *= -1;
      } else if (pos.y < -halfH) {
        pos.y = -halfH;
        vel.y *= -1;
      }
    }

    // 2. icon-vs-icon collisions: equal-mass elastic bounce in the x/y plane
    //    (z is left alone — icons keep their original depth/parallax).
    //    Collision threshold is the SUM of each icon's own real radius, so
    //    every pair bounces at the point their badges actually touch.
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const a = posRefs.current[i];
        const b = posRefs.current[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const collisionDist = radiiRef.current[i] + radiiRef.current[j];

        if (dist > 0.0001 && dist < collisionDist) {
          const nx = dx / dist;
          const ny = dy / dist;

          // push them apart so they stop overlapping
          const overlap = collisionDist - dist;
          a.x -= nx * overlap * 0.5;
          a.y -= ny * overlap * 0.5;
          b.x += nx * overlap * 0.5;
          b.y += ny * overlap * 0.5;

          // swap the velocity components along the collision normal
          // (equal-mass elastic collision)
          const va = velRefs.current[i];
          const vb = velRefs.current[j];
          const vaN = va.x * nx + va.y * ny;
          const vbN = vb.x * nx + vb.y * ny;
          const diff = vbN - vaN;
          va.x += diff * nx;
          va.y += diff * ny;
          vb.x -= diff * nx;
          vb.y -= diff * ny;
        }
      }
    }

    // 3. commit computed positions to the actual object transforms
    for (let i = 0; i < count; i++) {
      const g = groupRefs.current[i];
      if (g) g.position.set(posRefs.current[i].x, posRefs.current[i].y, posRefs.current[i].z);
    }
  });

  return (
    <>
      {socials.map((s, i) => (
        <BouncingIcon
          key={i}
          icon={s.icon}
          url={s.url}
          color={s.color}
          isDark={isDark}
          groupRef={(el) => {
            groupRefs.current[i] = el;
          }}
        />
      ))}
    </>
  );
});

const EXPLOSION_DURATION = 0.4; // seconds the burst takes to play out
const HIDDEN_DURATION = 1.1; // seconds the comet stays fully gone before respawning
const EXPLOSION_PARTICLE_COUNT = 14;

type CometPhase = "flying" | "exploding" | "hidden";

// Comet is clickable: hitting it awards a point via onHit(), freezes it in
// place, fully removes it from the screen (mesh.visible = false — no draw
// call at all, not just a scale hack), plays a bright radiating spark burst,
// then respawns it after a short cooldown. All driven by refs inside
// useFrame so no React re-render/remount is triggered by clicking.
const Comet = ({
  startPos,
  endPos,
  speed = 0.05,
  color = "#ffffff",
  delay = 0,
  onHit,
}: {
  startPos: [number, number, number];
  endPos: [number, number, number];
  speed?: number;
  color?: string;
  delay?: number;
  onHit?: () => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const cometMeshRef = useRef<THREE.Mesh>(null);
  const hitBoxRef = useRef<THREE.Mesh>(null);
  const particleRefs = useRef<(THREE.Mesh | null)[]>([]);
  const start = useMemo(() => new THREE.Vector3(...startPos), [startPos]);
  const end = useMemo(() => new THREE.Vector3(...endPos), [endPos]);
  const [hovered, setHovered] = useState(false);

  const phaseRef = useRef<CometPhase>("flying");
  const phaseProgressRef = useRef(0);
  // total time spent NOT flying — subtracted from elapsed time so the comet's
  // travel pauses exactly where it was hit, then resumes from that same spot
  const pausedDurationRef = useRef(0);

  // fixed random burst directions, generated once
  const particleDirs = useMemo(
    () =>
      Array.from({ length: EXPLOSION_PARTICLE_COUNT }, () => {
        const theta = Math.random() * Math.PI * 2;
        const r = 0.7 + Math.random() * 0.6;
        return new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0);
      }),
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (phaseRef.current === "flying") {
      const t =
        ((state.clock.getElapsedTime() - pausedDurationRef.current) * speed +
          delay) %
        1;
      groupRef.current.position.lerpVectors(start, end, t);
    } else {
      // frozen in place while exploding/hidden
      pausedDurationRef.current += delta;
    }

    if (phaseRef.current === "exploding") {
      phaseProgressRef.current = Math.min(
        phaseProgressRef.current + delta / EXPLOSION_DURATION,
        1
      );
      const progress = phaseProgressRef.current;

      particleRefs.current.forEach((mesh, i) => {
        if (!mesh) return;
        const dir = particleDirs[i];
        mesh.position.set(dir.x * progress, dir.y * progress, dir.z * progress);
        mesh.scale.setScalar(Math.max((1 - progress) * 0.8, 0.001));
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 1 - progress;
      });

      if (progress >= 1) {
        phaseRef.current = "hidden";
        phaseProgressRef.current = 0;
        particleRefs.current.forEach((mesh) => {
          if (!mesh) return;
          mesh.position.set(0, 0, 0);
          (mesh.material as THREE.MeshBasicMaterial).opacity = 0;
        });
      }
    } else if (phaseRef.current === "hidden") {
      phaseProgressRef.current += delta;
      if (phaseProgressRef.current >= HIDDEN_DURATION) {
        // respawn: comet reappears exactly where it was destroyed, then
        // continues flying forward from there
        phaseRef.current = "flying";
        phaseProgressRef.current = 0;
        if (cometMeshRef.current) cometMeshRef.current.visible = true;
        if (hitBoxRef.current) hitBoxRef.current.visible = true;
      }
    }
  });

  const handlePointerDown = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (phaseRef.current !== "flying") return; // ignore clicks mid-burst/hidden
      phaseRef.current = "exploding";
      phaseProgressRef.current = 0;
      if (cometMeshRef.current) cometMeshRef.current.visible = false;
      if (hitBoxRef.current) hitBoxRef.current.visible = false;
      setHovered(false);
      document.body.style.cursor = "auto";
      onHit?.();
    },
    [onHit]
  );

  return (
    <Trail width={2} length={6} color={color} attenuation={(t) => t * t}>
      <group
        ref={groupRef}
        onPointerDown={handlePointerDown}
        onPointerOver={(e) => {
          if (phaseRef.current !== "flying") return;
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        {/* invisible, generous hit-area so the tiny comet is easy to click */}
        <mesh ref={hitBoxRef}>
          <sphereGeometry args={[0.35, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* the visible comet itself, glows on hover, fully hidden while destroyed */}
        <mesh ref={cometMeshRef} scale={hovered ? 2 : 1}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>

        {/* destroy-burst spark particles, invisible until a hit triggers them */}
        {particleDirs.map((_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              particleRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
          </mesh>
        ))}
      </group>
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

// Everything here is purely decorative and only depends on isDark, so it's
// memoized to guarantee the starfield never regenerates/repositions on a
// score update or any other unrelated re-render.
const SceneBackground = React.memo(function SceneBackground({
  isDark,
}: {
  isDark: boolean;
}) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.3 : 0.6} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={2000} factor={3} saturation={0} fade speed={1} />
      <Sparkles
        count={100}
        scale={20}
        size={2}
        speed={0.3}
        color={isDark ? "#ffffff" : "#333355"}
        opacity={isDark ? 0.5 : 0.3}
      />
      <DistantStar position={[-15, 8, -40]} />
    </>
  );
});

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

// Small floating HUD for the comet game. Stays invisible (game is hidden)
// until the very first comet is clicked, then fades in and stays visible.
const CometScoreHUD = ({
  score,
  isDark,
  pulseKey,
}: {
  score: number;
  isDark: boolean;
  pulseKey: number;
}) => (
  <div className={`comet-score ${isDark ? "comet-score-dark" : "comet-score-light"}`}>
    <span className="comet-score-label">✨ Comet Score</span>
    <span key={pulseKey} className="comet-score-value">
      {score}
    </span>
    <style jsx>{`
      .comet-score {
        position: absolute;
        bottom: 10px;
        right: 12px;
        z-index: 20;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border-radius: 999px;
        backdrop-filter: blur(6px);
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.01em;
        animation: comet-score-fade-in 0.4s ease;
        pointer-events: none;
      }
      .comet-score-dark {
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
      }
      .comet-score-light {
        background: rgba(0, 0, 0, 0.06);
        color: #1a1a1a;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
      }
      .comet-score-value {
        display: inline-block;
        min-width: 1.4em;
        text-align: center;
        animation: comet-score-pop 0.3s ease;
      }
      @keyframes comet-score-fade-in {
        from {
          opacity: 0;
          transform: translateY(-6px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes comet-score-pop {
        0% {
          transform: scale(1.6);
          color: #ffd166;
        }
        100% {
          transform: scale(1);
        }
      }
    `}</style>
  </div>
);

const SocialsContent = () => {
  const [ready, setReady] = useState(false);
  const isDark = useIsDarkMode();

  // Comet-clicking game state
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  // Load any previously saved score from the cookie on mount.
  // The HUD stays hidden either way until the player clicks a comet.
  useEffect(() => {
    const saved = getCookie(SCORE_COOKIE_KEY);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!Number.isNaN(parsed)) setScore(parsed);
    }
  }, []);

  // Stable across renders so it never causes Comet's effects/handlers to
  // detach and reattach.
  const handleCometHit = useCallback(() => {
    setScore((prev) => {
      const next = prev + 1;
      setCookie(SCORE_COOKIE_KEY, String(next));
      return next;
    });
    setPulseKey((k) => k + 1);
    setRevealed(true);
  }, []);

  const options = useMemo(() => getParticlesOptions(isDark), [isDark]);
  const cometColors = isDark
    ? ["#ffffff", "#aeefff", "#ffd6a5"]
    : ["#333355", "#2b4c7e", "#8a5a00"];

  return (
    <div
      className={`pt-20 w-full relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-black" : "bg-white"
      }`}
      style={{
        // 80vh is the safe fallback for browsers that don't know dvh yet;
        // 80dvh (dynamic viewport height) is what actually prevents mobile
        // clipping, since it re-measures as the browser's address bar/toolbar
        // show or hide, instead of assuming a viewport height that's too tall.
        height: "80vh",
        // @ts-ignore -- dvh not in the older CSSStyleDeclaration TS lib, safe to ignore
        minHeight: "80dvh",
        overscrollBehavior: "contain",
      }}
    >
      {ready && (
        <Particles
          id="tsparticles"
          options={options}
          className="absolute inset-0 z-0"
        />
      )}

      {revealed && (
        <CometScoreHUD score={score} isDark={isDark} pulseKey={pulseKey} />
      )}

      <Canvas
        className="absolute inset-0 z-10 w-full h-full"
        style={{ touchAction: "none", overscrollBehavior: "contain" }}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
      >
        <SceneBackground isDark={isDark} />

        {cometPaths.map((c, i) => (
          <Comet
            key={i}
            startPos={c.startPos}
            endPos={c.endPos}
            speed={c.speed}
            color={cometColors[i % cometColors.length]}
            delay={c.delay}
            onHit={handleCometHit}
          />
        ))}

        <IconField isDark={isDark} />
      </Canvas>
    </div>
  );
};

export default SocialsContent;