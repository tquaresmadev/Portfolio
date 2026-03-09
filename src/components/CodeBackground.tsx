"use client";

import { useEffect, useRef } from "react";

const SYMBOLS = [
  "</>", "{}", "()", "=>", "//", "[]", "&&", "||", "!=", "==",
  "++", "--", "::", "<?", "/>", "/*", "*/", ";;", ">>", "<<",
  "import", "const", "return", "async", "class", "func", "void",
  "let", "new", "if", "for", "int", "pub", "use", "nil", "err",
];

interface Particle {
  x: number;
  y: number;
  speed: number;
  symbol: string;
  opacity: number;
  size: number;
}

export default function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let accentColor = "#6366f1";
    const particles: Particle[] = [];

    const observer = new MutationObserver(() => {
      accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#6366f1";
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#6366f1";

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function createParticle(): Particle {
      if (!canvas) throw new Error("Canvas not available");
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      return {
        x: Math.random() * w,
        y: h + 10,
        speed: 0.2 + Math.random() * 0.4,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        opacity: 0.06 + Math.random() * 0.1,
        size: 10 + Math.random() * 4,
      };
    }

    function init() {
      if (!canvas) return;
      resize();
      const count = Math.floor(canvas.offsetWidth / 50);
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        const p = createParticle();
        p.y = Math.random() * canvas.offsetHeight;
        particles.push(p);
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);
      ctx.font = "400 14px var(--font-geist-mono), monospace";

      for (const p of particles) {
        p.y -= p.speed;

        if (p.y < -20) {
          p.x = Math.random() * w;
          p.y = h + 10;
          p.symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        }

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = accentColor;
        ctx.font = `400 ${p.size}px var(--font-geist-mono), monospace`;
        ctx.fillText(p.symbol, p.x, p.y);
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    }

    init();
    draw();

    window.addEventListener("resize", init);
    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
