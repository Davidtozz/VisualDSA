import { visualizer } from '@/visualizer/visualizer.svelte.ts';

// Main exported function to match your API
export function* mergeSort(arr: number[]) {
    visualizer.sorting = true;

    // Start the recursive generator helper
    yield* mergeSortHelper(arr, 0, arr.length - 1);

    visualizer.resetFlags();
}

function* mergeSortHelper(arr: number[], start: number, end: number): Generator<any, void, unknown> {
    if (start >= end) return;

    if (visualizer.stopRequested) {
        visualizer.stopSorting();
        return;
    }

    const mid = Math.floor((start + end) / 2);

    // Recurse left and right using yield*
    yield* mergeSortHelper(arr, start, mid);
    yield* mergeSortHelper(arr, mid + 1, end);

    // Merge the sorted halves
    yield* merge(arr, start, mid, end);
}

function* merge(arr: number[], start: number, mid: number, end: number) {
    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        if (visualizer.stopRequested) {
            visualizer.stopSorting();
            return;
        }

        // Yield the absolute indices being compared for the UI
        yield [start + i, mid + 1 + j];

        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
    }

    // Copy remaining elements
    while (i < left.length) {
        if (visualizer.stopRequested) {
            visualizer.stopSorting();
            return;
        }
        arr[k] = left[i];
        yield [k, k]; // Yielding current placement
        i++;
        k++;
    }

    while (j < right.length) {
        if (visualizer.stopRequested) {
            visualizer.stopSorting();
            return;
        }
        arr[k] = right[j];
        yield [k, k]; // Yielding current placement
        j++;
        k++;
    }
}