import { bubblesort } from "./bubble-sort";
import { insertionsort } from "./insertion-sort";
import { quicksort } from "./quick-sort";
import { selectionsort } from "./selection-sort";
import { shellsort } from "./shell-sort";

export interface SortFunction {
    readonly displayName: string;
    readonly name: string;
    readonly hasParams: boolean;
    readonly fn: Function;
    readonly utils?: Function[]
}   

const sorts: SortFunction[] = [
    bubblesort,
    insertionsort,
    quicksort,
    selectionsort,
    shellsort
]

export { sorts };