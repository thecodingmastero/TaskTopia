"use client";

import { useEffect, useRef, useCallback } from "react";

interface ConfettiProps {
  active: boolean;
  duration?: number;
  particleCount?: number;
  onComplete?: () => void;
}

const COLORS = [
  "#a855f7", "#3b82f6", "#22c55e", "#fbbf24",
  "#f472b6", "#60a5fa", "#86efac", "#fcd34d",
  "#c084fc", "#818cf8",
];

const SHAPES = ["square", "circle", "star"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: string;
  size: number;
  opacity: number;
  life: number;
}

export function Confetti({
  active,
  duration = 3000,
  particleCount = 120,
  onComplete,
}: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);

  const spawnParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#a855f7",
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)] ?? "square",
        size: Math.random() * 8 + 6,
        opacity: 1,
        life: Math.random() * 0.5 + 0.5,
      });
    }
    particlesRef.current = particles;
  }, [particleCount]);

  const drawParticle = (
    ctx: CanvasRenderingContext2D,
    p: Particle
  ) => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);

    if (p.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === "star") {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const r = i === 0 ? p.size / 2 : p.size / 4;
        ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
      }
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    }

    ctx.restore();
  };

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    startTimeRef.current = performance.now();
    spawnParticles();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = elapsed / duration;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // gravity
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, p.life - progress * 1.2);
        drawParticle(ctx, p);
      });

      if (elapsed < duration) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onComplete?.();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active, duration, spawnParticles, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
}
