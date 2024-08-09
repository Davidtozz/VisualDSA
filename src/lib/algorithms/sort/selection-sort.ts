import { visualizerFlags, arrayStore } from "@/stores";
import { stopSorting, resetFlags } from "@/utils";
import { type SortFunction } from "./index";

function* selectionSort() {
    visualizerFlags.sorting = true;
    let n = arrayStore.length;

    for (let i = 0; i < n - 1; i++) {
        /* Visualizer logic */
        if (visualizerFlags.stopRequested) {
            stopSorting();
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


const selectionsort: SortFunction = {
    displayName: "Selection Sort",
    name: selectionSort.name.toLowerCase(),
    hasParams: false,
    fn: selectionSort
}


export {
    selectionsort
}