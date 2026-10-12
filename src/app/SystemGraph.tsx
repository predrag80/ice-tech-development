"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./system-graph.module.css";

type Point = { x: number; y: number };
type NodeId = "interface" | "application" | "data" | "integrations";
type Anchor = Point & { nx: number; ny: number };
/** Spring state: offset from the home position, velocity and scale. */
type Body = { x: number; y: number; vx: number; vy: number; s: number; vs: number };

const VIEW = { w: 600, h: 440 };
const NODE = { w: 200, h: 114 };
const HUB = { x: 258, y: 178, size: 84 };
const HUB_CENTER = { x: HUB.x + HUB.size / 2, y: HUB.y + HUB.size / 2 };
/** Cables end inside the hub so its rounded corners never leave a gap. */
const HUB_ANCHOR_HALF = HUB.size / 2 - 10;

const NODES: { id: NodeId; label: string; detail: string; at: Point; icon: ReactNode }[] = [
  { id: "interface", label: "Interface", detail: "React · Next.js", at: { x: 35, y: 40 }, icon: <><rect x="57" y="60" width="36" height="27" rx="3" /><path d="M57 68H93M64 64h1m4 0h1m-6 12h9m-9 5h18" /></> },
  { id: "application", label: "Application", detail: "Logic · APIs · Node.js", at: { x: 365, y: 40 }, icon: <path d="m402 63-10 10 10 10m14-20 10 10-10 10m-6-23-7 27" /> },
  { id: "data", label: "Data", detail: "PostgreSQL · MySQL", at: { x: 35, y: 286 }, icon: <><ellipse cx="75" cy="313" rx="17" ry="6" /><path d="M58 313v17c0 8 34 8 34 0v-17M58 321c0 8 34 8 34 0" /></> },
  { id: "integrations", label: "Integrations", detail: "Third-party services", at: { x: 365, y: 286 }, icon: <path d="M391 328h33m-28-3-5 3 5 3m23-27 5 3-5 3m-28-3h33" /> },
];
const PEERS: [number, number][] = [[0, 1], [2, 3]];

const SPRING = { stiffness: 0.06, damping: 0.82 };
const DRAG_SPRING = { stiffness: 0.3, damping: 0.62 };
const PACKET_SPEED = { idle: 0.32, active: 0.75 };

const round = (value: number) => Math.round(value * 100) / 100;
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/** Where the line from a box's centre towards `toward` crosses its edge, plus that edge's outward normal. */
function edgeAnchor(center: Point, half: Point, toward: Point): Anchor {
  const dx = toward.x - center.x;
  const dy = toward.y - center.y;
  const tx = dx ? half.x / Math.abs(dx) : Infinity;
  const ty = dy ? half.y / Math.abs(dy) : Infinity;
  const t = Math.min(tx, ty, 1);
  const vertical = tx < ty;
  return { x: center.x + dx * t, y: center.y + dy * t, nx: vertical ? Math.sign(dx) : 0, ny: vertical ? 0 : Math.sign(dy) };
}

/** Blocks are wide, so cables leave from their inner side (clear of the corners) unless a block sits right above or below. */
function nodeAnchor(center: Point, half: Point, toward: Point): Anchor {
  const anchor = edgeAnchor(center, { x: half.x, y: half.y * 2.2 }, toward);
  const inset = Math.min(14, half.y);
  return { ...anchor, y: clamp(anchor.y, center.y - half.y + inset, center.y + half.y - inset) };
}

/** A cable leaves and enters each box at right angles, so it bends naturally as the boxes move. */
function cable(a: Anchor, b: Anchor, bend: number) {
  const k = Math.hypot(b.x - a.x, b.y - a.y) * bend;
  return `M${round(a.x)} ${round(a.y)}C${round(a.x + a.nx * k)} ${round(a.y + a.ny * k)} ${round(b.x + b.nx * k)} ${round(b.y + b.ny * k)} ${round(b.x)} ${round(b.y)}`;
}

const homeCenter = (index: number) => ({ x: NODES[index].at.x + NODE.w / 2, y: NODES[index].at.y + NODE.h / 2 });
const nodeCenter = (index: number, body: Body) => {
  const home = homeCenter(index);
  return { x: home.x + body.x, y: home.y + body.y };
};
const nodeHalf = (body: Body) => ({ x: (NODE.w / 2) * body.s, y: (NODE.h / 2) * body.s });

function geometry(nodes: Body[], hub: Body) {
  const hubCenter = { x: HUB_CENTER.x + hub.x, y: HUB_CENTER.y + hub.y };
  const links = nodes.map((body, index) => {
    const from = nodeAnchor(nodeCenter(index, body), nodeHalf(body), hubCenter);
    return cable(from, edgeAnchor(hubCenter, { x: HUB_ANCHOR_HALF, y: HUB_ANCHOR_HALF }, from), 0.5);
  });
  const peers = PEERS.map(([a, b]) => {
    const from = nodeCenter(a, nodes[a]);
    const to = nodeCenter(b, nodes[b]);
    return cable(edgeAnchor(from, nodeHalf(nodes[a]), to), edgeAnchor(to, nodeHalf(nodes[b]), from), 0.3);
  });
  return { links, peers };
}

const restingBody = (): Body => ({ x: 0, y: 0, vx: 0, vy: 0, s: 1, vs: 0 });
const INITIAL = geometry(NODES.map(restingBody), restingBody());

function step(body: Body, target: Point, spring: typeof SPRING, frames: number) {
  const damping = spring.damping ** frames;
  body.vx = (body.vx + (target.x - body.x) * spring.stiffness * frames) * damping;
  body.vy = (body.vy + (target.y - body.y) * spring.stiffness * frames) * damping;
  body.x += body.vx * frames;
  body.y += body.vy * frames;
}

/**
 * Decorative system diagram: blocks drift, data packets travel along the cables, and with a mouse any block
 * (including the hub) can be dragged — the cables follow and everything springs back when released.
 */
export default function SystemGraph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodeEls = NODES.map(({ id }) => svg.querySelector<SVGGElement>(`[data-node="${id}"]`)!);
    const hubEl = svg.querySelector<SVGGElement>('[data-node="hub"]')!;
    const linkEls = Array.from(svg.querySelectorAll<SVGPathElement>("[data-link]"));
    const peerEls = Array.from(svg.querySelectorAll<SVGPathElement>("[data-peer]"));
    const packetEls = linkEls.map((link) => Array.from(link.parentElement!.querySelectorAll<SVGCircleElement>("[data-packet]")));
    const highlightEls = Array.from(svg.querySelectorAll<SVGElement>("[data-for]"));

    const nodes = NODES.map(restingBody);
    const hub = restingBody();
    const packets = NODES.map((_, index) => [index * 0.23, index * 0.23 + 0.5]);
    const enterAt: number[] = NODES.map(() => 0);
    const canDrag = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let pointer: Point | null = null;
    let drag: { id: NodeId | "hub"; pointerId: number; grab: Point; at: Point } | null = null;
    let active: NodeId | "hub" | null = null;
    let assembling = svg.getBoundingClientRect().top >= window.innerHeight;
    let entering = false;
    let frame = 0;
    let last = 0;
    let time = 0;
    let visible = false;

    if (assembling) {
      // Start collapsed into the hub; the blocks spring out when the scene scrolls into view.
      svg.dataset.state = "assembling";
      nodes.forEach((body, index) => {
        const home = homeCenter(index);
        Object.assign(body, { x: HUB_CENTER.x - home.x, y: HUB_CENTER.y - home.y, s: 0.3 });
      });
    }
    if (canDrag) svg.dataset.interactive = "";

    const setActive = (id: typeof active) => {
      active = id;
      for (const element of highlightEls) element.toggleAttribute("data-on", !!id && element.dataset.for!.split(" ").includes(id));
      if (id) svg.dataset.active = id;
      else delete svg.dataset.active;
    };

    const toSvg = (event: PointerEvent): Point => {
      const rect = svg.getBoundingClientRect();
      return { x: ((event.clientX - rect.left) / rect.width) * VIEW.w, y: ((event.clientY - rect.top) / rect.height) * VIEW.h };
    };

    const render = () => {
      nodes.forEach((body, index) => {
        const home = homeCenter(index);
        const opacity = clamp((body.s - 0.3) / 0.5, 0, 1);
        nodeEls[index].setAttribute("transform", `translate(${round(body.x + home.x * (1 - body.s))} ${round(body.y + home.y * (1 - body.s))}) scale(${round(body.s)})`);
        nodeEls[index].style.opacity = opacity < 1 ? `${round(opacity)}` : "";
        linkEls[index].style.opacity = nodeEls[index].style.opacity;
      });
      hubEl.setAttribute("transform", `translate(${round(hub.x)} ${round(hub.y)})`);

      const { links, peers } = geometry(nodes, hub);
      links.forEach((d, index) => linkEls[index].setAttribute("d", d));
      peers.forEach((d, index) => peerEls[index].setAttribute("d", d));

      linkEls.forEach((link, index) => {
        const length = link.getTotalLength();
        const showPackets = !assembling && !entering;
        packets[index].forEach((progress, packetIndex) => {
          const packet = packetEls[index][packetIndex];
          // Even packets flow into the hub, odd ones flow back out to the block.
          const point = link.getPointAtLength((packetIndex % 2 ? 1 - progress : progress) * length);
          packet.setAttribute("cx", `${round(point.x)}`);
          packet.setAttribute("cy", `${round(point.y)}`);
          packet.setAttribute("opacity", showPackets ? `${round(Math.sin(progress * Math.PI))}` : "0");
        });
      });
    };

    const tick = (now: number) => {
      const seconds = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      const frames = seconds * 60;
      last = now;
      time += seconds;

      nodes.forEach((body, index) => {
        if (assembling || time < enterAt[index]) return;
        const home = homeCenter(index);
        const target = { x: Math.sin(time * 0.9 + index * 1.7) * 2.5 + hub.x * 0.15, y: Math.cos(time * 0.7 + index * 2.3) * 2.5 + hub.y * 0.15 };
        if (drag?.id === NODES[index].id) {
          step(body, drag.at, DRAG_SPRING, frames);
        } else {
          if (pointer && !drag) {
            target.x += clamp((pointer.x - home.x) * 0.035, -7, 7);
            target.y += clamp((pointer.y - home.y) * 0.035, -7, 7);
          }
          step(body, target, SPRING, frames);
        }
        body.vs = (body.vs + (1 - body.s) * 0.08 * frames) * 0.78 ** frames;
        body.s += body.vs * frames;
      });

      if (drag?.id === "hub") {
        step(hub, drag.at, DRAG_SPRING, frames);
      } else {
        // The hub is tugged by every block, like a knot in elastic cables.
        const pull = nodes.reduce((sum, body) => ({ x: sum.x + body.x * 0.12, y: sum.y + body.y * 0.12 }), { x: 0, y: 0 });
        step(hub, { x: clamp(pull.x, -30, 30), y: clamp(pull.y, -30, 30) }, SPRING, frames);
      }

      if (entering && nodes.every((body) => Math.abs(1 - body.s) < 0.01 && Math.abs(body.vs) < 0.01)) {
        entering = false;
        svg.dataset.state = "ready";
      }

      packets.forEach((pair, index) => {
        const speed = active === NODES[index].id || active === "hub" ? PACKET_SPEED.active : PACKET_SPEED.idle;
        packets[index] = pair.map((progress) => (progress + seconds * speed) % 1);
      });

      render();
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame || !visible || document.hidden) return;
      last = 0;
      frame = window.requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (assembling && entry.intersectionRatio >= 0.3) {
        assembling = false;
        entering = true;
        svg.dataset.state = "entering";
        NODES.forEach((_, index) => { enterAt[index] = time + 0.15 + index * 0.09; });
      }
      if (visible) start();
      else stop();
    }, { threshold: [0, 0.3] });
    observer.observe(svg);

    const onVisibility = () => (document.hidden ? stop() : start());

    const targetId = (event: Event) => (event.target as Element).closest<SVGGElement>("[data-node]")?.dataset.node as NodeId | "hub" | undefined;
    const partOf = (id: NodeId | "hub") => {
      const index = NODES.findIndex((node) => node.id === id);
      return id === "hub" ? { body: hub, element: hubEl } : { body: nodes[index], element: nodeEls[index] };
    };

    const onPointerDown = (event: PointerEvent) => {
      const id = targetId(event);
      if (event.pointerType === "touch" || !canDrag) {
        setActive(id && id !== active ? id : null);
        return;
      }
      if (!id || event.button !== 0) return;
      event.preventDefault();
      const point = toSvg(event);
      const { body, element } = partOf(id);
      drag = { id, pointerId: event.pointerId, grab: { x: point.x - body.x, y: point.y - body.y }, at: { x: body.x, y: body.y } };
      // SVG paints in document order, so the grabbed block moves to the end to stay on top.
      element.parentNode!.appendChild(element);
      svg.setPointerCapture(event.pointerId);
      svg.dataset.dragging = "";
      setActive(id);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = toSvg(event);
      if (!drag || event.pointerId !== drag.pointerId) return;
      const box = drag.id === "hub" ? { x: HUB.x, y: HUB.y, w: HUB.size, h: HUB.size } : { ...NODES.find((node) => node.id === drag!.id)!.at, ...NODE };
      drag.at = {
        x: clamp(pointer.x - drag.grab.x, -box.x - 16, VIEW.w + 16 - box.w - box.x),
        y: clamp(pointer.y - drag.grab.y, -box.y - 16, VIEW.h + 16 - box.h - box.y),
      };
    };

    const endDrag = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      drag = null;
      delete svg.dataset.dragging;
      if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
      const hovered = document.elementFromPoint(event.clientX, event.clientY)?.closest<SVGGElement>("[data-node]");
      setActive(hovered && svg.contains(hovered) ? (hovered.dataset.node as NodeId | "hub") : null);
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "touch" && !drag) setActive(targetId(event) ?? null);
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = null;
      if (!drag) setActive(null);
    };

    svg.addEventListener("pointerdown", onPointerDown);
    svg.addEventListener("pointermove", onPointerMove);
    svg.addEventListener("pointerup", endDrag);
    svg.addEventListener("pointercancel", endDrag);
    svg.addEventListener("pointerover", onPointerOver);
    svg.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    render();

    return () => {
      stop();
      observer.disconnect();
      svg.removeEventListener("pointerdown", onPointerDown);
      svg.removeEventListener("pointermove", onPointerMove);
      svg.removeEventListener("pointerup", endDrag);
      svg.removeEventListener("pointercancel", endDrag);
      svg.removeEventListener("pointerover", onPointerOver);
      svg.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <svg ref={svgRef} className={styles.graph} viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} fill="none">
      <defs>
        <pattern id="system-grid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#b9cde4" /></pattern>
        <filter id="system-node-shadow" x="-20%" y="-20%" width="140%" height="160%"><feGaussianBlur stdDeviation="9" /></filter>
      </defs>
      <rect width={VIEW.w} height={VIEW.h} fill="url(#system-grid)" />

      {PEERS.map(([a, b], index) => <path key={`${a}-${b}`} data-peer data-for={`${NODES[a].id} ${NODES[b].id}`} className={styles.peer} d={INITIAL.peers[index]} />)}
      {NODES.map(({ id }, index) => (
        <g key={id}>
          <path data-link data-for={`${id} hub`} className={styles.link} d={INITIAL.links[index]} />
          <circle data-packet data-for={`${id} hub`} className={styles.packet} r="3.2" opacity="0" />
          <circle data-packet data-for={`${id} hub`} className={styles.packet} r="2.4" opacity="0" />
        </g>
      ))}

      {NODES.map(({ id, label, detail, at, icon }) => (
        <g key={id} data-node={id} data-for={id} className={styles.node}>
          <rect className={styles.nodeShadow} x={at.x + 8} y={at.y + 14} width={NODE.w - 16} height={NODE.h - 6} rx="8" filter="url(#system-node-shadow)" />
          <rect className={styles.nodeCard} x={at.x} y={at.y} width={NODE.w} height={NODE.h} rx="8" />
          <g className={styles.nodeIcon}>{icon}</g>
          <text className={styles.nodeLabel} x={at.x + 22} y={at.y + 78}>{label}</text>
          <text className={styles.nodeDetail} x={at.x + 22} y={at.y + 98}>{detail}</text>
        </g>
      ))}

      <g data-node="hub" data-for="hub" className={styles.hub}>
        <circle className={styles.hubRing} cx={HUB_CENTER.x} cy={HUB_CENTER.y} r="58" />
        <rect x={HUB.x} y={HUB.y} width={HUB.size} height={HUB.size} rx="20" fill="#07162d" />
        <path d="m279 236 15-29 10 16 8-11 14 24h-47Z" fill="#78b4ff" /><path d="m294 207 10 16-6-3-4 5-4-3 4-15Z" fill="#f4f9ff" />
      </g>
    </svg>
  );
}
