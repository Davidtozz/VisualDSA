import { visualizer } from '@/visualizer/visualizer.svelte.ts';

/**
 * Bogo Sort Generator for Visualization.
 * Continuously shuffles the array until it happens to be sorted.
 */
export function* bogoSort(arr: number[]): Generator {
    visualizer.sorting = true;
    const n = arr.length;

    // Outer loop repeats until miraculously sorted
    while (true) {
        if (visualizer.stopRequested) return visualizer.stopSorting();

        // Phase 1: Check if sorted.
        // This provides visual feedback so the screen isn't just noise.
        let isSorted = true;
        for (let i = 0; i < n - 1; i++) {
            if (visualizer.stopRequested) return visualizer.stopSorting();

            // Yield comparison state
            yield [i, i + 1];

            if (arr[i] > arr[i + 1]) {
                isSorted = false;
                break; // Stop checking; it's not sorted.
            }
        }

        if (isSorted) {
            visualizer.sorted = true;
            break;
        }

        // Phase 2: Perform standard Fisher-Yates Shuffle.
        for (let i = n - 1; i > 0; i--) {
            if (visualizer.stopRequested) return visualizer.stopSorting();

            const j = Math.floor(Math.random() * (i + 1));

            // Yield swap state
            yield [i, j];

            // Perform the random swap
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    visualizer.resetFlags();
}