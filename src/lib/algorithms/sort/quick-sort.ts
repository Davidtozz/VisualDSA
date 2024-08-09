import { visualizerFlags, arrayStore } from "@/stores";
import { stopSorting } from "@/utils";
import type { SortFunction } from "./index";

function* quickSort(arr, left = 0, right = arr.length - 1) {

  if (visualizerFlags.stopRequested) {
    stopSorting();
    return;
  }
  if (left < right) {
    let pivotIndex = yield* partition(arr, left, right);
    yield* quickSort(arr, left, pivotIndex - 1);
    yield* quickSort(arr, pivotIndex + 1, right);
  }
}

function* partition(arr, left, right) {
  let pivot = arr[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      arrayStore.set(arr); //? reactivity trigger
      yield i, j;
    }
  }
  let temp = arr[i + 1];
  arr[i + 1] = arr[right];
  arr[right] = temp;
  arrayStore.set(arr); //? reactivity trigger
  return i + 1;
};


const quicksort: SortFunction ={
  displayName: "Quick Sort",
  name: quickSort.name.toLowerCase(),
  hasParams: true,
  fn: quickSort,
  utils: [partition]
}

export {
  quicksort
};