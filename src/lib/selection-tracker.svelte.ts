import { bubblesort } from '@/algorithms/sort/bubble-sort.ts';
import { insertionsort } from '@/algorithms/sort/insertion-sort.ts';
import { quicksort } from '@/algorithms/sort/quick-sort.ts';
import { selectionsort } from '@/algorithms/sort/selection-sort.ts';
import { shellsort } from '@/algorithms/sort/shell-sort.ts';
import { sorts } from '@/algorithms/sort';
import { dataStructures } from '@/data_structures';
import ArrayControls from '@/data_structures/Array/array-controls.svelte';
import { LinkedList, Queue, Stack } from '@/structures_new/linear-datastructure.svelte.ts';
import { BinarySearchTree, Graph } from '@/structures_new/nonlinear-datastructure.svelte.ts';
import StackControls from '@/data_structures/Stack/stack-controls.svelte';
import type { Component } from 'svelte';

export const validSelection = {
    'bubblesort': bubblesort,
    'insertionsort': insertionsort,
    'quicksort': quicksort,
    'selectionsort': selectionsort,
    'shellsort': shellsort,
    'graph': [Graph],
    'binarysearchtree': [BinarySearchTree],
    'linkedlist': [LinkedList],
    'stack': [Stack, StackControls],
    'queue': [Queue]
} as const;

const sortingAlgorithmControls = Object.fromEntries(
    sorts.map((sort) => [sort.name, ArrayControls])
) as Record<string, Component>;

const dataStructureControls = Object.fromEntries(
    Object.entries(dataStructures).map(([name, value]) => [name, value.controls])
) as Record<string, Component>;

const controlsBySelection: Record<string, Component> = {
    ...sortingAlgorithmControls,
    ...dataStructureControls
};

export class SelectionTracker {

    // @ts-ignore
    public readonly selectionType: 'algorithm' | 'datastructure' = $derived.by(() => {
        return this.selection.endsWith('sort') ? 'algorithm' : 'datastructure';
    });
    public readonly sortFunction = $derived.by(() => {
        if (this.selectionType === 'algorithm') {
            return validSelection[this.selection].fn as Function;
        }
        return null;
    });
    public readonly controlsComponent = $derived.by(() => {
        return controlsBySelection[this.selection] ?? null;
    });

    public selection = $state<keyof typeof validSelection | 'none'>('none');

}