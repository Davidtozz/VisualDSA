import LinkedList from './LinkedList/linkedlist.svelte.ts';
import Stack from '@/data_structures/Stack/stack.svelte.ts';
import BinarySearchTree from '@/data_structures/BinarySearchTree/bst.svelte.ts';
import Graph from '@/data_structures/Graph/graph.svelte.ts';

export const dataStructures = {
    'graph': Graph,
    'binarysearchtree': BinarySearchTree,
    'linkedlist': LinkedList,
    'stack': Stack
} as const