const easeSettle = [0.22, 1, 0.36, 1] as const;
const easeCinematic = [0.65, 0, 0.35, 1] as const;

export const heroEntranceMotion = {
  lockup: {
    delay: 1.1,
    duration: 1.6,
    ease: easeSettle,
  },
  letters: {
    delay: 2.8,
    stagger: 0.24,
    duration: 1.44,
    ease: easeSettle,
  },
  portrait: {
    delay: 4.1,
    duration: 3.1,
    ease: easeCinematic,
  },
  dissolve: {
    delay: 7.1,
    duration: 1.4,
    ease: easeCinematic,
  },
  copy: {
    delay: 0.28,
    duration: 1.4,
    ease: easeSettle,
  },
  light: {
    delay: 0.96,
    duration: 2.5,
    ease: easeSettle,
    haloDelay: 1.08,
    haloDuration: 2,
  },
  title: {
    duration: 0.6,
    stagger: 0.07,
  },
} as const;
