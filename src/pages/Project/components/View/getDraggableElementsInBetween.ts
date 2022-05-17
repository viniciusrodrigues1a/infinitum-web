/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type DraggableElements = {
  next: HTMLElement | undefined;
  prev: HTMLElement | undefined;
};

export default function getDraggableElementsInBetween(
  elems: HTMLElement[],
  y: number
): DraggableElements {
  const reduced = elems.reduce<any>(
    (closest, elem) => {
      const box = elem.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.nextOffset) {
        return { ...closest, nextOffset: offset, nextElement: elem };
      }
      if (offset > 0 && offset < closest.prevOffset) {
        return { ...closest, prevOffset: offset, prevElement: elem };
      }
      return closest;
    },
    {
      nextOffset: Number.NEGATIVE_INFINITY,
      prevOffset: Number.POSITIVE_INFINITY,
      nextElement: undefined,
      prevElement: undefined,
    }
  );

  return { next: reduced.nextElement, prev: reduced.prevElement };
}
