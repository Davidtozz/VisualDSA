import { visualizer } from '@/visualizer/visualizer.svelte.ts';
import { type SortFunction } from "./index";

function* bubbleSort(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            /* Pause sorting */
            if (visualizer.stopRequested) {
                visualizer.stopSorting();
                return;
            }
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                yield i;
            }
        }
    }
    visualizer.resetFlags();
}

const bubblesort: SortFunction = {
    displayName: "Bubble Sort",
    name: bubbleSort.name.toLowerCase(),
    fn: bubbleSort,
    hasParams: true
}

export {
    bubblesort
}   