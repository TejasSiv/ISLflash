/**
 * Fisher-Yates shuffle algorithm for randomizing array order
 * @param array - Array to shuffle
 * @returns New shuffled array (does not mutate original)
 */
export function shuffleArray<T>(array: T[]): T[] {
  // Create a copy to avoid mutating the original array
  const shuffled = [...array];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * Shuffle array in place (mutates original array)
 * @param array - Array to shuffle in place
 */
export function shuffleArrayInPlace<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}