import { visualizer } from '@/visualizer/visualizer.svelte.ts';

export function* heapSort(arr: number[]) {
    visualizer.sorting = true;
    const n = arr.length;

    // Build the max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (visualizer.stopRequested) {
            visualizer.stopSorting();
            return;
        }
        yield* heapify(arr, n, i);
    }

    // One by one extract elements from the heap
    for (let i = n - 1; i > 0; i--) {
        if (visualizer.stopRequested) {
            visualizer.stopSorting();
            return;
        }

        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        yield [0, i]; // Yield the swap for visualization

        // Call max heapify on the reduced heap
        yield* heapify(arr, i, 0);
    }

    visualizer.resetFlags();
}

function* heapify(arr: number[], n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Check if left child is larger than root
    if (left < n) {
        yield [left, largest]; // Yield comparison
        if (arr[left] > arr[largest]) {
            largest = left;
        }
    }

    // Check if right child is larger than largest so far
    if (right < n) {
        yield [right, largest]; // Yield comparison
        if (arr[right] > arr[largest]) {
            largest = right;
        }
    }

    // If largest is not root, swap and continue heapifying
    if (largest !== i) {
        if (visualizer.stopRequested) {
            visualizer.stopSorting();
            return;
        }

        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        yield [i, largest]; // Yield swap

        // Recursively heapify the affected sub-tree
        yield* heapify(arr, n, largest);
    }
}