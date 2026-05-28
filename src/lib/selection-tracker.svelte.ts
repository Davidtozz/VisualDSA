import { sortingAlgorithms } from '@/algorithms/sort';
import { dataStructures } from '@/data_structures';
import ArrayControls from '@/data_structures/Array/array-controls.svelte';
import ArrayLayer from '@/data_structures/Array/array.svelte';
import type { Component } from 'svelte';
import CodeSnippets from '@/code-snippets.json';
import { selectionTracker } from '@/stores.svelte.ts';

type ValidSelection = keyof typeof sortingAlgorithms | keyof typeof dataStructures | 'none'
type SelectionType = 'algorithm' | 'datastructure' | 'none';

const controls = Object.assign({},
    Object.fromEntries(
        Object.keys(sortingAlgorithms).map((sortFunctionName) => [sortFunctionName, ArrayControls])
    ),
    Object.fromEntries(
        Object.entries(dataStructures).map(([name, value]) => [name, value.controls])
    )
) as Record<string, Component>;

export class SelectionTracker {

    public readonly selectionType: SelectionType = $derived.by(() => {
        if (this.selection in sortingAlgorithms)
            return 'algorithm';

        if (this.selection in dataStructures)
            return 'datastructure';

        return 'none';
    });

    public readonly sortFunction = $derived.by(() => {
        if (this.selectionType === 'algorithm')
            return sortingAlgorithms[this.selection];

        return null;
    });

    public readonly dataStructure = $derived.by(() => {
        if (this.selectionType === 'datastructure') {
            return dataStructures[this.selection].class;
        }
    });

    public readonly codeSnippet = $derived.by(() => {
        if (this.selectionType === 'algorithm') {
            return CodeSnippets['algorithms']['sorts'][selectionTracker.selection]['code'] as Record<string, string>;
        } else if (this.selectionType === 'datastructure') {
            return CodeSnippets['datastructures'][selectionTracker.selection]['code'] as Record<string, string>;
        }
        return null;
    });

    public readonly controlsComponent = $derived.by(() => {
        return controls[this.selection] ?? null;
    });

    public readonly layerComponent = $derived.by(() => {
        if (this.selectionType === 'algorithm') {
            return ArrayLayer;
        }

        if (this.selectionType === 'datastructure') {
            return dataStructures[this.selection].layer;
        }

        return null;
    });
    public selection = $state<ValidSelection>('none');
}