import LinkedList  from "./LinkedList/linkedlist";
import Stack from '@/data_structures/Stack/stack';
import BinarySearchTree from '@/data_structures/BinarySearchTree/bst';

export type Field = { name: string, type: string }

const dataStructures = {
    "linkedlist" : LinkedList,
    "stack" : Stack,
    "binarysearchtree" : BinarySearchTree,


    [Symbol.iterator]: function*(){
        for(const key in Object.values(dataStructures)){
            yield dataStructures[key];
        }
    }
}

export {
    dataStructures
};