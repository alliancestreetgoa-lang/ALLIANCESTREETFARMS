/* ─────────────────────────────────────────────────────────
   Shared animation variants — Apple / Stripe quality
   All durations tuned for 60fps hardware-accelerated props
   (transform + opacity only)
───────────────────────────────────────────────────────── */

export const EASE_APPLE   = [0.25, 0.46, 0.45, 0.94] as const;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT  = [0.65, 0, 0.35, 1] as const;

/* Base fade + rise */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

/* Soft fade + rise (for secondary text) */
export const fadeUpSoft = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_APPLE },
  },
};

/* Slide in from left */
export const slideLeft = {
  hidden: { opacity: 0, x: -36 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/* Slide in from right */
export const slideRight = {
  hidden: { opacity: 0, x: 36 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/* Scale pop (cards) */
export const scalePop = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

/* Stagger container — wraps children using above variants */
export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

/* Line reveal — for section labels */
export const lineGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.55, ease: EASE_APPLE },
  },
};

/* Blur clear — soft focus-in reveal */
export const blurClear = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 12 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: EASE_APPLE },
  },
};
