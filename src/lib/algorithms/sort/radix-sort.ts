import { visualizer } from '@/visualizer/visualizer.svelte.ts';

function getMax(arr: number[]): number {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

export function* radixSort(arr: number[]): Generator {
    visualizer.sorting = true;
    const n = arr.length;

    if (n === 0) {
        visualizer.resetFlags();
        return;
    }

    const max = getMax(arr);

    // Loop through each digit place: 1 (ones), 10 (tens), 100 (hundreds), etc.
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        if (visualizer.stopRequested)
            visualizer.stopSorting();

        // Buckets for digits 0 through 9
        const buckets: number[][] = Array.from({ length: 10 }, () => []);

        // Phase 1: Distribute elements into buckets based on the current digit
        for (let i = 0; i < n; i++) {
            if (visualizer.stopRequested)
                visualizer.stopSorting();

            // Highlight the element we are currently inspecting
            yield [i];

            const digit = Math.floor(arr[i] / exp) % 10;
            buckets[digit].push(arr[i]);
        }

        // Phase 2: Reconstruct the array from the buckets
        let arrIdx = 0;
        for (let bucketIdx = 0; bucketIdx < 10; bucketIdx++) {
            const currentBucket = buckets[bucketIdx];

            for (let j = 0; j < currentBucket.length; j++) {
                if (visualizer.stopRequested) return visualizer.stopSorting();

                // Overwrite the original array element
                arr[arrIdx] = currentBucket[j];

                // Yield a 'swap' state to highlight the bar changing/updating its height
                yield [arrIdx];

                arrIdx++;
            }
        }
    }

    // Finalize: Mark the entire array as perfectly sorted (green)
    visualizer.sorted = true;
    visualizer.resetFlags();
}