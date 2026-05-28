import { visualizer } from '@/visualizer/visualizer.svelte.ts';

export function* bubbleSort(arr: number[]) {
    visualizer.sorting = true;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            /* Pause sorting */
            if (visualizer.stopRequested) {
                visualizer.stopSorting();
                return;
            }
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
            yield j;
        }
    }
    visualizer.resetFlags();
}