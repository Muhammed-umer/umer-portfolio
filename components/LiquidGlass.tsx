"use client";

import { useEffect } from "react";

/**
 * Drives every `.liquid-glass` surface on the page (see the LIQUID GLASS block
 * in app/globals.css). Mounted once, in the root layout.
 *
 * It does five things, all of them progressive enhancement — the glass still
 * flows and lights up on hover with this component absent:
 *
 *  1. Feeds the hovered surface the pointer position (`--lg-x` / `--lg-y`, in
 *     element-local px) so its specular highlight and rim follow the cursor.
 *     One delegated listener, coalesced into a single rAF, one rect read.
 *  2. Moves the ambient light behind the page (`--gx` / `--gy`).
 *  3. Tips `.lg-tilt` surfaces away under the pointer (writes `--lg-ax`,
 *     `--lg-ay`, `--lg-tilt`, read by the `rotate` rule), fine pointers only.
 *  4. Parks the rim animation on surfaces scrolled out of view, so the page
 *     only pays for the gradients you can actually see.
 *  5. Turns on real backdrop refraction where it actually renders. Chromium
 *     resolves `backdrop-filter: url(#…)`; other engines parse it and then drop
 *     the backdrop entirely, which would leave surfaces blank — so this is
 *     gated on the engine, not just on CSS.supports().
 */
export default function LiquidGlassLayer() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (window.matchMedia("(pointer: fine)").matches) {
      root.classList.add("lg-pointer-fine");
    }

    if (
      "chrome" in window &&
      CSS.supports?.("backdrop-filter", "url(#lg-refraction)") &&
      !reduceMotion.matches
    ) {
      root.classList.add("lg-refraction-ready");
    }

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const TILT_MAX = 5; // degrees, reached at the edge of a surface

    let pending: { x: number; y: number; target: Element | null } | null = null;
    let frame = 0;
    let tilted: HTMLElement | null = null;

    const paint = () => {
      frame = 0;
      const event = pending;
      pending = null;
      if (!event) return;

      root.style.setProperty("--gx", `${event.x}px`);
      root.style.setProperty("--gy", `${event.y}px`);

      // Walk the whole nest, not just the innermost surface: a chip inside a
      // card leaves the card hovered too, and each needs its own local
      // coordinates. Depth is 2-3 in practice.
      let surface =
        (event.target?.closest?.(".liquid-glass") as HTMLElement | null) ?? null;
      let tiltTarget: HTMLElement | null = null;

      while (surface) {
        const rect = surface.getBoundingClientRect();
        const x = event.x - rect.left;
        const y = event.y - rect.top;
        surface.style.setProperty("--lg-x", `${x}px`);
        surface.style.setProperty("--lg-y", `${y}px`);

        // 3D: the nearest tilting surface tips away under the pointer, like a
        // pane of glass being pressed. The axis (-ny, nx, 0) is the line
        // perpendicular to the pointer's offset from centre; the browser
        // normalises it. The angle grows with distance from centre.
        if (!tiltTarget && finePointer && surface.classList.contains("lg-tilt")) {
          const nx = x / rect.width - 0.5;
          const ny = y / rect.height - 0.5;
          const reach = Math.min(1, Math.hypot(nx, ny) * 2);
          surface.style.setProperty("--lg-ax", (-ny).toFixed(3));
          surface.style.setProperty("--lg-ay", nx.toFixed(3));
          surface.style.setProperty("--lg-tilt", `${(reach * TILT_MAX).toFixed(2)}deg`);
          tiltTarget = surface;
        }

        surface =
          (surface.parentElement?.closest(".liquid-glass") as HTMLElement | null) ??
          null;
      }

      if (tilted && tilted !== tiltTarget) tilted.style.setProperty("--lg-tilt", "0deg");
      tilted = tiltTarget;
    };

    const settle = () => {
      if (tilted) tilted.style.setProperty("--lg-tilt", "0deg");
      tilted = null;
    };

    const track = (e: PointerEvent) => {
      pending = { x: e.clientX, y: e.clientY, target: e.target as Element | null };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", track, { passive: true });
    window.addEventListener("pointerdown", track, { passive: true });
    document.addEventListener("pointerleave", settle);

    // Each rim animates a conic gradient, which repaints on the main thread.
    // Park the ones that are scrolled away so only what you can actually see
    // costs anything; `lg-offscreen` is what the stylesheet reads.
    const seen = new WeakSet<Element>();
    const inView = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("lg-offscreen", !entry.isIntersecting);
        }
      },
      { rootMargin: "150px" },
    );

    const observe = (el: Element) => {
      if (seen.has(el)) return;
      seen.add(el);
      inView.observe(el);
    };

    const observeWithin = (scope: ParentNode) => {
      if (scope instanceof Element && scope.classList.contains("liquid-glass")) {
        observe(scope);
      }
      for (const el of scope.querySelectorAll(".liquid-glass")) observe(el);
    };

    observeWithin(document);

    // Carousels, modals and the gallery mount surfaces after first paint.
    // Only walk what was actually added — Framer Motion mutates constantly.
    const added = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === 1) observeWithin(node as Element);
        }
      }
    });
    added.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", track);
      window.removeEventListener("pointerdown", track);
      document.removeEventListener("pointerleave", settle);
      settle();
      if (frame) cancelAnimationFrame(frame);
      inView.disconnect();
      added.disconnect();
      root.classList.remove("lg-pointer-fine", "lg-refraction-ready");
    };
  }, []);

  return (
    <>
      {/* Displacement map for `.lg-refract` surfaces: low-frequency noise,
          softened, used to bend the backdrop the way thick glass would. */}
      <svg
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <filter
          id="lg-refraction"
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.011"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2.5" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale={12}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="lg-cursor-glow" aria-hidden="true" />
    </>
  );
}
