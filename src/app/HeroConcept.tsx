"use client";

import { useEffect, useRef } from "react";
import styles from "./hero-concept.module.css";

type Offset = { x: number; y: number };

/** SVG units a layer travels at full pointer deflection, per unit of depth. */
const POINTER_TRAVEL = 14;
const MAX_TILT_DEG = { x: 5, y: 4 };
/** Depth sets how far a layer follows the pointer (negative layers move against it); lift is its hover offset. */
const LAYERS = {
  back: { depth: -0.5, lift: -4 },
  window: { depth: 0.2, lift: 0 },
  canvas: { depth: 0.4, lift: 0 },
  stackBase: { depth: 0.55, lift: 8 },
  stackMiddle: { depth: 0.75, lift: -3 },
  stackTop: { depth: 0.95, lift: -16 },
  cards: { depth: 0.5, lift: -2 },
  app: { depth: 1.2, lift: -5 },
} as const;
type LayerName = keyof typeof LAYERS;

const ORIGIN: Offset = { x: 0, y: 0 };
const round = (value: number) => Math.round(value * 100) / 100;

/** The elbow joining the interface window to the application card, recalculated as both layers move. */
function connectorPath(window: Offset, app: Offset) {
  const x = round(240 + window.x);
  const top = round(373 + window.y);
  const y = round(430 + app.y);
  return `M${x} ${top}V${round(y - 16)}Q${x} ${y} ${round(x + 16)} ${y}H${round(347 + app.x)}`;
}

/** Brand illustration, deliberately not a client product or interactive UI. */
export default function HeroConcept() {
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const figure = figureRef.current;
    const svg = figure?.querySelector("svg");
    if (!figure || !svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const layers = Array.from(svg.querySelectorAll<SVGGElement>("[data-layer]")).map((element) => ({ element, ...LAYERS[element.dataset.layer as LayerName] }));
    const connectors = Array.from(svg.querySelectorAll<SVGPathElement>("[data-connector]"));
    const connectorDot = svg.querySelector<SVGCircleElement>("[data-connector-dot]");
    const target = { x: 0, y: 0, hover: 0 };
    const current = { x: 0, y: 0, hover: 0 };
    let frame = 0;

    const offsetOf = ({ depth, lift }: { depth: number; lift: number }): Offset => ({
      x: current.x * depth * POINTER_TRAVEL,
      y: current.y * depth * POINTER_TRAVEL + lift * current.hover,
    });

    const render = () => {
      frame = 0;
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      current.hover += (target.hover - current.hover) * 0.08;

      for (const item of layers) {
        const { x, y } = offsetOf(item);
        item.element.setAttribute("transform", `translate(${round(x)} ${round(y)})`);
      }

      const windowOffset = offsetOf(LAYERS.window);
      const path = connectorPath(windowOffset, offsetOf(LAYERS.app));
      for (const connector of connectors) connector.setAttribute("d", path);
      connectorDot?.setAttribute("cx", `${round(240 + windowOffset.x)}`);
      connectorDot?.setAttribute("cy", `${round(390 + windowOffset.y)}`);

      figure.style.setProperty("--concept-tilt-x", `${round(current.x * MAX_TILT_DEG.x)}deg`);
      figure.style.setProperty("--concept-tilt-y", `${round(-current.y * MAX_TILT_DEG.y)}deg`);

      const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001 && Math.abs(target.hover - current.hover) < 0.001;
      if (!settled) frame = window.requestAnimationFrame(render);
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const clamp = (value: number) => Math.max(-1, Math.min(1, value));
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = svg.getBoundingClientRect();
      target.x = clamp((event.clientX - rect.left - rect.width / 2) / (rect.width / 2));
      target.y = clamp((event.clientY - rect.top - rect.height / 2) / (rect.height / 2));
      target.hover = 1;
      figure.dataset.active = "";
      requestRender();
    };
    const onLeave = () => {
      Object.assign(target, { x: 0, y: 0, hover: 0 });
      delete figure.dataset.active;
      requestRender();
    };

    figure.addEventListener("pointermove", onMove);
    figure.addEventListener("pointerleave", onLeave);
    return () => {
      figure.removeEventListener("pointermove", onMove);
      figure.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <figure ref={figureRef} className={styles.concept} aria-label="ICE TECH concept illustration: a digital interface connected to application logic and data">
      <div className={styles.label} aria-hidden="true"><span>ICE TECH / Digital systems</span><span>Concept</span></div>
      <svg viewBox="0 0 680 480" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="hero-concept-surface" x1="125" y1="142" x2="392" y2="340" gradientUnits="userSpaceOnUse"><stop stopColor="#e0efff" /><stop offset="1" stopColor="#f3f8ff" /></linearGradient>
          <linearGradient id="hero-concept-panel" x1="196" y1="187" x2="325" y2="305" gradientUnits="userSpaceOnUse"><stop stopColor="#71adff" /><stop offset="1" stopColor="#287aeb" /></linearGradient>
        </defs>

        <g data-layer="back"><rect x="38" y="10" width="613" height="345" rx="12" fill="#e6f0fd" fillOpacity=".65" stroke="#c6d9ed" /></g>

        <g data-layer="window">
          <rect x="14" y="28" width="613" height="345" rx="12" fill="#fcfdff" stroke="#a8c1df" />
          <path d="M14 77H627" stroke="#d9e5f3" />
          <g fill="#a7bdd6"><circle cx="37" cy="53" r="3" /><circle cx="49" cy="53" r="3" /><circle cx="61" cy="53" r="3" /></g>
          <text x="320" y="57" textAnchor="middle" fill="#5d7593" fontSize="11" letterSpacing="1.4">ICE TECH</text>
          <path d="m589 48 6 5-6 5m-6-10-6 5 6 5" stroke="#7c9fc7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          <path d="M82 77V373" stroke="#e1eaf5" />
          <rect x="32" y="98" width="32" height="32" rx="8" fill="#e7f1ff" />
          <g stroke="#2c83f6" strokeWidth="1.5" strokeLinejoin="round"><rect x="41" y="107" width="5" height="5" rx="1" /><rect x="50" y="107" width="5" height="5" rx="1" /><rect x="41" y="116" width="5" height="5" rx="1" /><rect x="50" y="116" width="5" height="5" rx="1" /></g>
          <g stroke="#8ca8c9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M41 155h14m-14 5h10m-10 5h14M41 191l7-4 7 4-7 4-7-4Zm0 5 7 4 7-4m-14 5 7 4 7-4" /><circle cx="48" cy="341" r="7" /><path d="M45 341h6m-3-3v6" /></g>

          <text x="107" y="112" fill="#17304f" fontSize="18" fontWeight="600" letterSpacing="-.5">Digital product</text>
          <text x="107" y="133" fill="#66809e" fontSize="10">Designed. Developed. Connected.</text>
          <rect x="539" y="99" width="62" height="24" rx="12" fill="#edf5ff" stroke="#cbdff6" />
          <text x="570" y="115" textAnchor="middle" fill="#4e79b0" fontSize="9">Interface</text>
          <path d="M108 351H182m10 0h34" stroke="#c4d4e7" strokeWidth="3" strokeLinecap="round" />
          <text x="598" y="355" textAnchor="end" fill="#7890ac" fontSize="9">Interface layer</text>
        </g>

        <g data-layer="canvas">
          <rect x="107" y="154" width="278" height="175" rx="8" fill="url(#hero-concept-surface)" stroke="#cddff1" />
          <g stroke="#c3d8ef" strokeWidth="1"><path d="M137 191H355M137 221H355M137 251H355M137 281H355M166 174V309M206 174V309M246 174V309M286 174V309M326 174V309" /></g>
          <g fill="#6d99cd"><circle cx="137" cy="191" r="2" /><circle cx="355" cy="281" r="2" /></g>
        </g>
        <g data-layer="stackBase"><g className={styles.float}><path d="m176 259 70-39 70 39-70 39-70-39Z" fill="#c4dcf8" stroke="#a0bfe5" /></g></g>
        <g data-layer="stackMiddle"><g className={styles.float}><path d="m176 237 70-39 70 39-70 39-70-39Z" fill="#d9eaff" stroke="#8ab6ed" /></g></g>
        <g data-layer="stackTop">
          <g className={styles.float}>
            <path d="m176 215 70-39 70 39-70 39-70-39Z" fill="url(#hero-concept-panel)" stroke="#619ce9" />
            <path d="m223 216 16-17 13 12 9-4 11 9-29 15-20-15Z" fill="#fff" fillOpacity=".95" />
          </g>
        </g>

        <g data-layer="cards">
          <rect x="400" y="154" width="201" height="76" rx="8" fill="#f8fbff" stroke="#d4e2f1" />
          <text x="417" y="177" fill="#526f90" fontSize="10">Reusable components</text>
          <g className={styles.chips} stroke="#b7cfea" fill="#e6f1ff"><rect x="417" y="190" width="45" height="22" rx="4" /><rect x="471" y="190" width="28" height="22" rx="4" /><rect x="508" y="190" width="76" height="22" rx="4" /></g>
          <rect x="400" y="244" width="201" height="85" rx="8" fill="#f8fbff" stroke="#d4e2f1" />
          <text x="417" y="269" fill="#526f90" fontSize="10">Connected workflows</text>
          <path d="M425 297H471Q483 297 483 285V284Q483 277 491 277H565" stroke="#76a8e7" strokeWidth="1.5" />
          <path className={styles.workflowPulse} d="M425 297H471Q483 297 483 285V284Q483 277 491 277H565" pathLength={1} stroke="#2c83f6" strokeWidth="2.5" strokeLinecap="round" />
          <g className={styles.workflowNodes} fill="#f8fbff" stroke="#5f9cec" strokeWidth="1.5"><circle cx="425" cy="297" r="4" /><circle cx="482" cy="291" r="4" /><circle cx="565" cy="277" r="4" /></g>
        </g>

        <path data-connector d={connectorPath(ORIGIN, ORIGIN)} stroke="#649ee6" strokeWidth="1.5" />
        <path data-connector className={styles.flow} d={connectorPath(ORIGIN, ORIGIN)} stroke="#2c83f6" strokeWidth="1.5" strokeLinecap="round" />
        <circle data-connector-dot cx="240" cy="390" r="3" fill="#2c83f6" />

        <g data-layer="app">
          <rect className={styles.appGlow} x="343" y="395" width="288" height="70" rx="12" stroke="#7db4ff" strokeWidth="1.5" />
          <rect x="347" y="399" width="280" height="62" rx="9" fill="#0c233f" />
          <rect x="360" y="411" width="37" height="37" rx="7" fill="#183959" stroke="#325779" />
          <path d="m373 421-6 8 6 8m11-16 6 8-6 8m-5-18-4 21" stroke="#8fc0ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="413" y="424" fill="#e1edff" fontSize="12" fontWeight="500">Application + data</text>
          <text x="413" y="442" fill="#95b4d9" fontSize="9">Logic, APIs and integrations</text>
          <circle className={styles.status} cx="606" cy="430" r="3" fill="#7db4ff" />
        </g>
      </svg>
      <figcaption>From a thoughtful interface to a connected system.</figcaption>
    </figure>
  );
}
