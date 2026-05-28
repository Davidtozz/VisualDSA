import { visualizer } from '@/visualizer/visualizer.svelte.ts';

export function* insertionSort(arr: number[]) {
    visualizer.sorting = true;
    let i, key, j;
    for (i = 1; i < arr.length; i++) {
        key = arr[i];
        j = i - 1;
        yield i;
        while (j >= 0 && arr[j] > key) {
            /* Visualizer logic */
            if (visualizer.stopRequested) {
                visualizer.stopSorting();
                return;
            }
            /* ================= */
            arr[j + 1] = arr[j];
            j = j - 1;
            yield [j + 1, j + 2]; // Yield both positions in the shift
        }
        arr[j + 1] = key;
    }
    console.log('(Insertionsort) Sorted array: ', arr);
    visualizer.resetFlags();
}