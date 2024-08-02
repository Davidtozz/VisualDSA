import { get } from "svelte/store";
import { arrayStore, visualizerFlags } from "$lib/stores";

function* bubbleSort(arr: number[]) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length - i - 1; j++) {
            /* Pause sorting */
            if(visualizerFlags.stopRequested) {
                visualizerFlags.stopRequested = false;
                visualizerFlags.sorting = false;
                return;
            }
            if(arr[j] > arr[j + 1]) { 
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                arrayStore.set(arr); //? reactivity trigger
                yield i;                
            }
        }
    }
    console.log("(Bubblesort) Sorted array: ", arr);
    resetFlags();
}



function* insertionSort() {
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
            arrayStore[j + 1] = arrayStore[j];
            j = j - 1;
            yield j;
        }
        arrayStore[j + 1] = key;
    }
    console.log("(Insertionsort) Sorted array: ", get(arrayStore));
    resetFlags();
}


function* selectionSort() {
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
        let min_idx = i;
        yield i;
        for (let j = i + 1; j < n; j++) {

            if (arrayStore[j] < arrayStore[min_idx]) {
                min_idx = j;
            }
        }
        [arrayStore[min_idx], arrayStore[i]] = [arrayStore[i], arrayStore[min_idx]];
    }
    console.log("(Selectionsort) Sorted array: ", arrayStore);
    resetFlags();
}

function* quickSort(arr, left = 0, right = arr.length - 1) {
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
  }

function resetFlags() {
    visualizerFlags.sorted = true;
    visualizerFlags.sorting = false
}


interface FunctionMetadata {
    readonly displayName: string;
    readonly name: string;
    readonly hasParams: boolean;
    readonly isRecursive: boolean;
    readonly fn: Function;
}

export const sortingFunctions: FunctionMetadata[] = [
    {
        displayName: "Bubble Sort",
        name: bubbleSort.name.toLowerCase(),
        hasParams: true,
        isRecursive: false,
        fn: bubbleSort
    },
    {
        displayName: "Insertion Sort",
        hasParams: false,
        name: insertionSort.name.toLowerCase(),
        isRecursive: false,
        fn: insertionSort
    },
    {
        displayName: "Selection Sort",
        name: selectionSort.name.toLowerCase(),
        hasParams: false,
        isRecursive: false,
        fn: selectionSort
    },
    {
        displayName: "Quick Sort",
        name: quickSort.name.toLowerCase(),
        hasParams: true,
        isRecursive: true,
        fn: quickSort
    }
]
