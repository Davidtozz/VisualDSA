import { visualizerFlags, arrayStore } from "@/stores";
import { stopSorting, resetFlags } from "@/utils";
import { get } from "svelte/store";
import { type SortFunction } from "./index";

function* insertionSort() {
    visualizerFlags.sorting = true;
    let i, key, j;
    for (i = 1; i < arrayStore.length; i++) {
        key = arrayStore[i];
        j = i - 1;
        while (j >= 0 && arrayStore[j] > key) {
            /* Visualizer logic */
            if (visualizerFlags.stopRequested) {
                stopSorting();
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

const insertionsort: SortFunction =  {
    displayName: "Insertion Sort",
    hasParams: false,
    name: insertionSort.name.toLowerCase(),
    fn: insertionSort
}

export {
    insertionsort
};