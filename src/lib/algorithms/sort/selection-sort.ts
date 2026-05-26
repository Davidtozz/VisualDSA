import { visualizerFlags } from '@/stores';
import { stopSorting, resetFlags } from "@/visualizer/utils";
import { type SortFunction } from "./index";

function* selectionSort(arr: number[]) {
    visualizerFlags.sorting = true;
    let n = arr.length;

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

            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        [arr[min_idx], arr[i]] = [arr[i], arr[min_idx]];
    }
    console.log('(Selectionsort) Sorted array: ', arr);
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