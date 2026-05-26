import { type SortFunction } from "./index";

function* shellSort(arr: number[]) {
    let interval = 1
    let length = arr.length;

    while (interval < arr.length / 3) {
        interval = interval * 3 + 1
    }

    while (interval > 0) {
        for (let outer = interval; outer < length; outer++) {
            const value = arr[outer];
            let inner = outer

            while (inner > interval - 1 && arr[inner - interval] >= value) {
                arr[inner] = arr[inner - interval];
                inner -= interval
                yield inner
            }

            arr[inner] = value;
        }
        interval = (interval - 1) / 3
    }
    return { done: true }
}


const shellsort: SortFunction = {
    displayName: "Shell Sort",
    name: shellSort.name.toLowerCase(),
    hasParams: false,
    fn: shellSort
}

export {
    shellsort
}