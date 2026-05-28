import { visualizer } from '@/visualizer/visualizer.svelte.ts';

export function* quickSort(arr: number[], left = 0, right = arr.length - 1) {
  if (visualizer.stopRequested) {
    visualizer.stopSorting();
    return;
  }
  if (left < right) {
    let pivotIndex = yield* partition(arr, left, right);
    yield* quickSort(arr, left, pivotIndex - 1);
    yield* quickSort(arr, pivotIndex + 1, right);
  }
}

function* partition(arr: number[], left: number, right: number) {
  let pivot = arr[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (visualizer.stopRequested) {
      visualizer.stopSorting();
      return i + 1;
    }
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      yield i;
    }
  }
  let temp = arr[i + 1];
  arr[i + 1] = arr[right];
  arr[right] = temp;
  return i + 1;
}
