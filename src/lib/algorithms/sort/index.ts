import { bubbleSort } from './bubble-sort';
import { insertionSort } from './insertion-sort';
import { quickSort } from './quick-sort';
import { selectionSort } from './selection-sort';
import { shellSort } from './shell-sort.ts';
import { mergeSort } from '@/algorithms/sort/merge-sort.ts';
import { heapSort } from '@/algorithms/sort/heap-sort.ts';
import { bogoSort } from '@/algorithms/sort/bogo-sort.ts';
import { radixSort } from '@/algorithms/sort/radix-sort.ts';

const sortingAlgorithms: Record<string, Function> = {
    'bubblesort': bubbleSort,
    'bogosort': bogoSort,
    'heapsort': heapSort,
    'insertionsort': insertionSort,
    'mergesort': mergeSort,
    'quicksort': quickSort,
    'radixsort': radixSort,
    'selectionsort': selectionSort,
    'shellsort': shellSort
} as const;

export { sortingAlgorithms };