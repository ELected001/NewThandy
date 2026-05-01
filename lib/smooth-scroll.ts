export type SmoothScrollHandle = {
  cancel: () => void;
};

type SmoothScrollOptions = {
  minDuration?: number;
  maxDuration?: number;
  distanceFactor?: number;
  offset?: number;
  onComplete?: () => void;
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getScrollOffset(element: HTMLElement, fallbackOffset = 0) {
  const styles = window.getComputedStyle(element);
  const marginOffset = Number.parseFloat(styles.scrollMarginTop);

  return Number.isFinite(marginOffset) ? marginOffset : fallbackOffset;
}

function getTargetPosition(element: HTMLElement, offset?: number) {
  const scrollOffset = offset ?? getScrollOffset(element);
  const startPosition = window.scrollY;
  const maxScrollPosition = document.documentElement.scrollHeight - window.innerHeight;

  return Math.max(
    0,
    Math.min(startPosition + element.getBoundingClientRect().top - scrollOffset, maxScrollPosition),
  );
}

function majesticEase(progress: number) {
  if (progress < 0.5) {
    return 8 * progress ** 4;
  }

  return 1 - (-2 * progress + 2) ** 4 / 2;
}

export function smoothScrollToPosition(
  targetPosition: number,
  {
    minDuration = 900,
    maxDuration = 1750,
    distanceFactor = 0.48,
    onComplete,
  }: SmoothScrollOptions = {},
): SmoothScrollHandle | null {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;

  if (prefersReducedMotion() || Math.abs(distance) < 2) {
    window.scrollTo(0, targetPosition);
    onComplete?.();
    return null;
  }

  const duration = Math.min(maxDuration, Math.max(minDuration, Math.abs(distance) * distanceFactor));
  const startTime = window.performance.now();
  let frameId: number | null = null;
  let cancelled = false;

  document.documentElement.dataset.majesticScroll = "true";

  const finish = () => {
    if (document.documentElement.dataset.majesticScroll === "true") {
      delete document.documentElement.dataset.majesticScroll;
    }

    onComplete?.();
  };

  const animateScroll = (timestamp: number) => {
    if (cancelled) {
      return;
    }

    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = majesticEase(progress);

    window.scrollTo(0, startPosition + distance * easedProgress);

    if (progress < 1) {
      frameId = window.requestAnimationFrame(animateScroll);
      return;
    }

    frameId = null;
    finish();
  };

  frameId = window.requestAnimationFrame(animateScroll);

  return {
    cancel: () => {
      cancelled = true;

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      if (document.documentElement.dataset.majesticScroll === "true") {
        delete document.documentElement.dataset.majesticScroll;
      }
    },
  };
}

export function smoothScrollToElement(
  element: HTMLElement,
  options: SmoothScrollOptions = {},
) {
  return smoothScrollToPosition(getTargetPosition(element, options.offset), options);
}
