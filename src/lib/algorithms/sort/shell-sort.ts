import { visualizer } from '@/visualizer/visualizer.svelte.ts';

function* shellSort(arr: number[]) {
    visualizer.sorting = true;
    let interval = 1
    let length = arr.length;

    while (interval < arr.length / 3) {
        interval = interval * 3 + 1
    }

    while (interval > 0) {
        for (let outer = interval; outer < length; outer++) {
            if (visualizer.stopRequested) {
                visualizer.stopSorting();
                return;
            }
            const value = arr[outer];
            let inner = outer

            while (inner > interval - 1 && arr[inner - interval] >= value) {
                if (visualizer.stopRequested) {
                    visualizer.stopSorting();
                    return;
                }
                arr[inner] = arr[inner - interval];
                inner -= interval
                yield inner
            }

            arr[inner] = value;
        }
        interval = (interval - 1) / 3
    }
    visualizer.resetFlags();
}

export { shellSort };