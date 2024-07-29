import { writable, get } from "svelte/store";
import { arrayStore, delayStore, visualizerFlags } from "$lib/stores";


export async function bubbleSort() {
        
    visualizerFlags.sorting = true;
    for(let i = 0; i < arrayStore.length; i++) {
        for(let j = 0; j < arrayStore.length - i - 1; j++) {
            /* Pause sorting */
            if(visualizerFlags.stopRequested) {
                visualizerFlags.stopRequested = false;
                visualizerFlags.sorting = false;
                return;
            }
            await delay(get(delayStore));
            if(arrayStore[j] > arrayStore[j + 1]) {
                let temp = arrayStore[j];
                arrayStore[j] = arrayStore[j + 1];
                arrayStore[j + 1] = temp;
            }
        }
    }
    console.log("(Bubblesort) Sorted array: ", arrayStore);
    resetFlags();
}



export async function insertionSort() {
    visualizerFlags.sorting = true;
    let i, key, j;
    for (i = 1; i < arrayStore.length; i++) {
        key = arrayStore[i];
        j = i - 1;
        while (j >= 0 && arrayStore[j] > key) {
            /* Visualizer logic */
            if(visualizerFlags.stopRequested) {
                visualizerFlags.stopRequested = false;
                visualizerFlags.sorting = false;
                return;
            }
            /* ================= */
            await delay(get(delayStore));
            arrayStore[j + 1] = arrayStore[j];
            j = j - 1;
        }
        arrayStore[j + 1] = key;
    }
    console.log("(Insertionsort) Sorted array: ", get(arrayStore));
    resetFlags();
}


export async function selectionSort() {
    visualizerFlags.sorting = true;
    let n = arrayStore.length;

    for (let i = 0; i < n - 1; i++) { 
        /* Visualizer logic */
        if(visualizerFlags.stopRequested) {
            visualizerFlags.stopRequested = false;
            visualizerFlags.sorting = false;
            return;
        }
        /* ================= */
        await delay(get(delayStore)); 
        let min_idx = i;
        for (let j = i + 1; j < n; j++) {

            await delay(get(delayStore)); 
            if (arrayStore[j] < arrayStore[min_idx]) {
                min_idx = j;
            }
        }
        await delay(get(delayStore)); 
        [arrayStore[min_idx], arrayStore[i]] = [arrayStore[i], arrayStore[min_idx]];
    }
    console.log("(Selectionsort) Sorted array: ", arrayStore);
    resetFlags();
}

function delay(ms: number | null): Promise<void> | void {
    if(ms) return new Promise(resolve => setTimeout(resolve, ms));
}

function resetFlags() {
    visualizerFlags.sorted = true;
    visualizerFlags.sorting = false
}

export default { 
    "bubblesort": bubbleSort, 
    "insertionsort" : insertionSort, 
    "selectionsort" : selectionSort
};