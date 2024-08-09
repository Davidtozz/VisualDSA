import { arrayStore } from "@/stores";
import { get } from "svelte/store";
import { type SortFunction } from "./index";

function* shellSort() {
    let interval = 1
    let length = get(arrayStore).length

    while (interval < get(arrayStore).length / 3) {
        interval = interval * 3 + 1
    }

    while (interval > 0) {
        for (let outer = interval; outer < length; outer++) {
            const value = arrayStore[outer];
            let inner = outer

            while (inner > interval - 1 && arrayStore[inner - interval] >= value) {
                arrayStore[inner] = arrayStore[inner - interval]
                inner -= interval
                yield inner
            }

            arrayStore[inner] = value
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