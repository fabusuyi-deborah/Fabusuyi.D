"use client";

import { useEffect, useRef } from "react";

type Drone = { id: string; x: number; y: number; h: number; v: number; trail: [number, number][] };
type Missile = { x: number; y: number; t: Drone; trail: [number, number][]; life: number; dead?: boolean };
type Blast = { x: number; y: number; r: number };
type Colors = { fg: string; muted: string; line: string; acc: string; warn: string };

const DRONES = 8;
const GRID = 64;

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const pad = (n: number, w: number) => String(n).padStart(w, "0");

/**
 * Decorative canvas behind the hero: a grid, a few slow drones, and the odd interceptor.
 * Hovering locks onto the nearest drone. Pauses off-screen and respects reduced motion.
 * `onStatus` receives a short HUD string for the hero meta row.
 */
export function DroneField({ onStatus }: { onStatus?: (text: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef(onStatus);

  useEffect(() => {
    statusRef.current = onStatus;
  }, [onStatus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const host = canvas.parentElement!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let colors: Colors = { fg: "#000", muted: "#666", line: "#ccc", acc: "#00f", warn: "#f60" };
    let drones: Drone[] = [];
    let missiles: Missile[] = [];
    let blasts: Blast[] = [];
    let mouse: { x: number; y: number } | null = null;
    let last = 0;
    let nextLaunch = 2500;
    let raf = 0;
    let visible = true;
    let lastStatus = "";

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      const v = (n: string) => s.getPropertyValue(n).trim();
      colors = { fg: v("--fg"), muted: v("--muted"), line: v("--line"), acc: v("--accent"), warn: v("--warn") };
    };
    const size = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const mkDrone = (i: number): Drone => ({
      id: `UAV-${pad(i + 1, 2)}`,
      x: rnd(0, W),
      y: rnd(0, H),
      h: rnd(0, Math.PI * 2),
      v: rnd(0.25, 0.6),
      trail: [],
    });
    const status = (text: string) => {
      if (text !== lastStatus) {
        lastStatus = text;
        statusRef.current?.(text);
      }
    };

    const draw = (ts: number) => {
      const dt = Math.min(50, ts - last || 16);
      last = ts;
      ctx.clearRect(0, 0, W, H);

      // grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.line;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      for (let x = (W % GRID) / 2; x < W; x += GRID) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); }
      for (let y = 0; y < H; y += GRID) { ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); }
      ctx.stroke();
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = colors.muted;
      ctx.beginPath();
      for (let x = (W % GRID) / 2; x < W; x += GRID * 2)
        for (let y = GRID; y < H; y += GRID * 2) {
          ctx.moveTo(x - 3, y + 0.5); ctx.lineTo(x + 4, y + 0.5);
          ctx.moveTo(x + 0.5, y - 3); ctx.lineTo(x + 0.5, y + 4);
        }
      ctx.stroke();

      // drones
      let lock: Drone | null = null;
      let lockDist = 130;
      for (const d of drones) {
        if (!reduce) {
          d.h += rnd(-0.02, 0.02);
          d.x += (Math.cos(d.h) * d.v * dt) / 16;
          d.y += (Math.sin(d.h) * d.v * dt) / 16;
          if (d.x < -20) d.x = W + 20;
          if (d.x > W + 20) d.x = -20;
          if (d.y < -20) d.y = H + 20;
          if (d.y > H + 20) d.y = -20;
          d.trail.push([d.x, d.y]);
          if (d.trail.length > 14) d.trail.shift();
        }
        ctx.fillStyle = colors.muted;
        for (let i = 0; i < d.trail.length; i += 3) {
          ctx.globalAlpha = (i / d.trail.length) * 0.3;
          ctx.fillRect(d.trail[i][0], d.trail[i][1], 1.4, 1.4);
        }
        const targeted = missiles.some((m) => m.t === d);
        ctx.globalAlpha = targeted ? 0.85 : 0.38;
        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.h);
        ctx.fillStyle = targeted ? colors.warn : colors.fg;
        ctx.beginPath();
        ctx.moveTo(4.5, 0); ctx.lineTo(-3, -2.8); ctx.lineTo(-1.2, 0); ctx.lineTo(-3, 2.8);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        if (mouse) {
          const dd = Math.hypot(d.x - mouse.x, d.y - mouse.y);
          if (dd < lockDist) { lockDist = dd; lock = d; }
        }
      }

      // interceptors
      if (!reduce) {
        nextLaunch -= dt;
        if (nextLaunch < 0 && drones.length) {
          const t = drones[Math.floor(Math.random() * drones.length)];
          missiles.push({ x: Math.random() < 0.5 ? -10 : W + 10, y: rnd(H * 0.3, H), t, trail: [], life: 0 });
          nextLaunch = rnd(3500, 6500);
        }
      }
      for (const m of missiles) {
        m.life += dt;
        const dx = m.t.x - m.x;
        const dy = m.t.y - m.y;
        const dist = Math.hypot(dx, dy) || 1;
        const sp = Math.min(9, 1.5 + m.life * 0.004);
        m.x += ((dx / dist) * sp * dt) / 16;
        m.y += ((dy / dist) * sp * dt) / 16;
        m.trail.push([m.x, m.y]);
        if (m.trail.length > 40) m.trail.shift();
        ctx.strokeStyle = colors.warn;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        m.trail.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = colors.warn;
        ctx.fillRect(m.x - 1.5, m.y - 1.5, 3, 3);
        if (dist < 6) {
          m.dead = true;
          blasts.push({ x: m.x, y: m.y, r: 0 });
          const i = drones.indexOf(m.t);
          if (i > -1) drones[i] = mkDrone(i);
        }
      }
      missiles = missiles.filter((m) => !m.dead);
      ctx.lineWidth = 1;
      for (const b of blasts) {
        b.r += dt * 0.06;
        ctx.globalAlpha = Math.max(0, 1 - b.r / 40);
        ctx.strokeStyle = colors.warn;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      blasts = blasts.filter((b) => b.r < 40);

      // crosshair + lock
      if (mouse) {
        ctx.strokeStyle = colors.acc;
        ctx.globalAlpha = 0.35;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.moveTo(0, mouse.y + 0.5); ctx.lineTo(W, mouse.y + 0.5);
        ctx.moveTo(mouse.x + 0.5, 0); ctx.lineTo(mouse.x + 0.5, H);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = colors.acc;
        ctx.font = '11px "Geist Mono", ui-monospace, monospace';
        ctx.fillText(`X ${pad(Math.round(mouse.x), 4)}  Y ${pad(Math.round(mouse.y), 4)}`, mouse.x + 10, mouse.y - 10);
        if (lock) {
          const s = 14;
          const L = lock;
          ctx.strokeStyle = colors.acc;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 1;
          ctx.beginPath();
          for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
            ctx.moveTo(L.x + sx * s, L.y + sy * (s - 6));
            ctx.lineTo(L.x + sx * s, L.y + sy * s);
            ctx.lineTo(L.x + sx * (s - 6), L.y + sy * s);
          }
          ctx.stroke();
          const hdg = pad(Math.round((((L.h * 180) / Math.PI) % 360 + 360) % 360), 3);
          ctx.fillText(`${L.id} · LOCK · ${hdg}°`, L.x + s + 6, L.y + 4);
          status(`${L.id} LOCKED · HDG ${hdg}°`);
        }
      } else {
        status(`FIELD · ${DRONES} UAV · ${missiles.length ? "INTERCEPT" : "TRACKING"}`);
      }
      ctx.globalAlpha = 1;

      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    readColors();
    size();
    drones = Array.from({ length: DRONES }, (_, i) => mkDrone(i));

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (reduce) start();
    };
    const onLeave = () => {
      mouse = null;
      if (reduce) start();
    };
    const onResize = () => { size(); if (reduce) start(); };
    const onTheme = () => { readColors(); if (reduce) start(); };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    window.addEventListener("themechange", onTheme);
    const themeObserver = new MutationObserver(onTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);
    start();

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("themechange", onTheme);
      themeObserver.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 z-0 size-full" />;
}
