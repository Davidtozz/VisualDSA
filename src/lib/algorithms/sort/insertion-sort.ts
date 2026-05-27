import { visualizerFlags } from '@/stores';
import { visualizer } from '@/visualizer/visualizer.svelte.ts';
import { type SortFunction } from "./index";

function* insertionSort(arr: number[]) {
    visualizerFlags.sorting = true;
    let i, key, j;
    for (i = 1; i < arr.length; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            /* Visualizer logic */
            if (visualizerFlags.stopRequested) {
                visualizer.stopSorting();
                return;
            }
            /* ================= */
            arr[j + 1] = arr[j];
            j = j - 1;
            yield j;
        }
        arr[j + 1] = key;
    }
    console.log('(Insertionsort) Sorted array: ', arr);
    visualizer.resetFlags();
}

const insertionsort: SortFunction = {
    displayName: "Insertion Sort",
    hasParams: false,
    name: insertionSort.name.toLowerCase(),
    fn: insertionSort
}

export {
    insertionsort
};