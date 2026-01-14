import React, { useEffect, useRef } from "react";

interface Drop {
  x: number;
  y: number;
  len: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export default function VisualFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Rain setup
    const dropCount = Math.min(300, Math.floor((width * height) / 8000));
    const drops: Drop[] = Array.from({ length: dropCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: 10 + Math.random() * 20,
      speed: 0.2 + Math.random() * 1.2,
    }));

    // Fireworks setup
    let particles: Particle[] = [];
    const colors = [
      "#60a5fa",
      "#a78bfa",
      "#f472b6",
      "#34d399",
      "#f59e0b",
      "#f87171",
    ];

    const spawnFirework = (sx: number, sy: number) => {
      const count = 60 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
        const speed = 2 + Math.random() * 3;
        particles.push({
          x: sx,
          y: sy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 60 + Math.random() * 30,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const autoFireworks = setInterval(() => {
      spawnFirework(
        Math.random() * width,
        height * (0.2 + Math.random() * 0.5),
      );
    }, 3000);

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      spawnFirework(e.clientX - rect.left, e.clientY - rect.top);
    };
    window.addEventListener("click", onClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle background tint
      ctx.fillStyle = "rgba(3,7,18,0.08)";
      ctx.fillRect(0, 0, width, height);

      // Draw rain
      ctx.strokeStyle = "rgba(125,211,252,0.55)"; // sky-300
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      for (let d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + 0.5, d.y + d.len);
        ctx.stroke();
        d.y += d.speed * d.len;
        d.x += 0.3; // slight wind
        if (d.y > height || d.x > width) {
          d.x = Math.random() * width;
          d.y = -20;
          d.len = 10 + Math.random() * 20;
          d.speed = 0.2 + Math.random() * 1.2;
        }
      }

      // Draw fireworks particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        ctx.fillStyle = p.color;
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // gravity
        p.vx *= 0.99; // air drag
        p.vy *= 0.99;
        p.life -= 1;
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", onClick);
      clearInterval(autoFireworks);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
