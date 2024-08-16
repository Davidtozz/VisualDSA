import LinkedList from './LinkedList/linkedlist';
import Stack from '@/data_structures/Stack/stack';
import BinarySearchTree from '@/data_structures/BinarySearchTree/bst';
import Graph from '@/data_structures/Graph/graph';

export type Field = { name: string, type: string }

const dataStructures = {
    "linkedlist" : LinkedList,
    "stack" : Stack,
    "binarysearchtree" : BinarySearchTree,
    'graph': Graph,


    [Symbol.iterator]: function*(){
        for(const key in Object.values(dataStructures)){
            yield dataStructures[key];
        }
    }
}

export {
    dataStructures
};