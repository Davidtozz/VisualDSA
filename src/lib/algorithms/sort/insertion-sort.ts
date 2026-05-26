import { visualizerFlags } from '@/stores';
import { stopSorting, resetFlags } from "@/visualizer/utils";
import { get } from "svelte/store";
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
                stopSorting();
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
    resetFlags();
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