export function array(length: number): number[];
export function array<T>(length: number, filler: (index: number) => T): T[];
export function array(
  length: number,
  filler: (index: number) => any = (i) => i
) {
  return Array.from({ length }, (_, i) => filler(i));
}

export function shuffle<T>(array: T[]) {
  // copied from
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
