/**
 * Determines whether a world item is unlocked based on completed chore count.
 */
export function isWorldItemUnlocked(
  item: { unlocked?: boolean; requiredChores?: number },
  completedChores: number
): boolean {
  return (
    item.unlocked === true ||
    (item.requiredChores !== undefined && completedChores >= item.requiredChores)
  );
}
