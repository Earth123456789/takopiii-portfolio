/**
 * Checks if the target element (or any of its parents) can scroll internally in the given direction.
 * @param target The touched or scrolled element
 * @param direction "up" (moving down/next, deltaY > 0) or "down" (moving up/prev, deltaY < 0)
 */
export function canContainerScrollInDirection(
  target: HTMLElement | null,
  direction: "up" | "down",
): boolean {
  let currentElement: HTMLElement | null = target;

  while (currentElement) {
    const style = window.getComputedStyle(currentElement);
    const isScrollable =
      style.overflowY === "auto" || style.overflowY === "scroll";

    if (isScrollable) {
      const { scrollTop, scrollHeight, clientHeight } = currentElement;
      // Allow internal scrolling if content overflows
      if (scrollHeight > clientHeight + 4) {
        const canScrollDownMore = scrollTop + clientHeight < scrollHeight - 6;
        const canScrollUpMore = scrollTop > 6;

        if (direction === "up" && canScrollDownMore) {
          return true; // Internal scroll down is possible
        }
        if (direction === "down" && canScrollUpMore) {
          return true; // Internal scroll up is possible
        }
      }
    }
    currentElement = currentElement.parentElement;
  }

  return false;
}

export function isInsideScrollContainer(target: HTMLElement | null): boolean {
  return canContainerScrollInDirection(target, "up");
}
