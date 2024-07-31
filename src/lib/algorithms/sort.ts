import { writable, get } from "svelte/store";
import { arrayStore, delayStore, visualizerFlags } from "$lib/stores";
import {delay} from "$lib/utils";

export async function bubbleSort() {
        
    visualizerFlags.sorting = true;
    for(let i = 0; i < arrayStore.length; i++) {
        for(let j = 0; j < arrayStore.length - i - 1; j++) {
            /* Pause sorting */
            if(visualizerFlags.stopRequested) {
                visualizerFlags.stopRequested = false;
                visualizerFlags.sorting = false;
                return;
            }
            await delay(get(delayStore));
            if(arrayStore[j] > arrayStore[j + 1]) {
                let temp = arrayStore[j];
                arrayStore[j] = arrayStore[j + 1];
                arrayStore[j + 1] = temp;
            }
        }
    }
    console.log("(Bubblesort) Sorted array: ", arrayStore);
    resetFlags();
}



export async function insertionSort() {
    visualizerFlags.sorting = true;
    let i, key, j;
    for (i = 1; i < arrayStore.length; i++) {
        key = arrayStore[i];
        j = i - 1;
        while (j >= 0 && arrayStore[j] > key) {
            /* Visualizer logic */
            if(visualizerFlags.stopRequested) {
                visualizerFlags.stopRequested = false;
                visualizerFlags.sorting = false;
                return;
            }
            /* ================= */
            await delay(get(delayStore));
            arrayStore[j + 1] = arrayStore[j];
            j = j - 1;
        }
        arrayStore[j + 1] = key;
    }
    console.log("(Insertionsort) Sorted array: ", get(arrayStore));
    resetFlags();
}


export async function selectionSort() {
    visualizerFlags.sorting = true;
    let n = arrayStore.length;

    for (let i = 0; i < n - 1; i++) { 
        /* Visualizer logic */
        if(visualizerFlags.stopRequested) {
            visualizerFlags.stopRequested = false;
            visualizerFlags.sorting = false;
            return;
        }
        /* ================= */
        await delay(get(delayStore)); 
        let min_idx = i;
        for (let j = i + 1; j < n; j++) {

            await delay(get(delayStore)); 
            if (arrayStore[j] < arrayStore[min_idx]) {
                min_idx = j;
            }
        }
        await delay(get(delayStore)); 
        [arrayStore[min_idx], arrayStore[i]] = [arrayStore[i], arrayStore[min_idx]];
    }
    console.log("(Selectionsort) Sorted array: ", arrayStore);
    resetFlags();
}

export function* quickSort(arr, left = 0, right = arr.length - 1) {
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
        yield;
      }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[right];
    arr[right] = temp;
    arrayStore.set(arr); //? reactivity trigger
    yield;
    return i + 1;
  }

function resetFlags() {
    visualizerFlags.sorted = true;
    visualizerFlags.sorting = false
}

export default { 
    "bubblesort": bubbleSort, 
    "insertionsort" : insertionSort, 
    "selectionsort" : selectionSort,
    "quicksort" : quickSort
};