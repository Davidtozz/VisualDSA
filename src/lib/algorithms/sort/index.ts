import { bubbleSort } from './bubble-sort';
import { insertionSort } from './insertion-sort';
import { quickSort } from './quick-sort';
import { selectionSort } from './selection-sort';
import { shellSort } from './shell-sort.ts';

const sortingAlgorithms: Record<string, Function> = {
    'bubblesort': bubbleSort,
    'insertionsort': insertionSort,
    'quicksort': quickSort,
    'selectionsort': selectionSort,
    'shellsort': shellSort
} as const;

export { sortingAlgorithms };