import type { Render } from "svelte-canvas";
import { LinkedList } from "./LinkedList/linkedlist";
import { Stack } from '@/data_structures/Stack/stack';

export type Field = { name: string, type: string }

const dataStructures = {
    "linkedlist" : LinkedList,
    "stack" : Stack
}

export {
    dataStructures
};