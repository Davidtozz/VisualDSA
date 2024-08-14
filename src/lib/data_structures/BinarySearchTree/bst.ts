import { get, writable } from 'svelte/store';
import BstControls from './bst-controls.svelte';
import BstLayer from './bst.svelte';
import type { Field } from '@/data_structures';
import { delay, randomNumber } from '@/utils.ts';

class Node {
    public value: number;
    public right: Node | null;
    public left: Node | null;

    public constructor(value: number) {
        this.value = value;
        this.right = null;
        this.left = null
    }

    public toString() {
        return `Node {value: ${this.value}, right: ${this.right}, left: ${this.left}}`
    }
}

export class BinarySearchTree {
    public root: Node | null;
    public nodes: number;

    constructor() {
        this.root = null;
        this.nodes = 0;
    }

    // #noview
    static get methods(): Function[] {
        return [
            BinarySearchTree.prototype.insert,
            BinarySearchTree.prototype.find,
            BinarySearchTree.prototype.remove
        ]
    }

    static get fields(): Field[] {
        return [
            { name: 'root', type: 'Node' }
        ]
    }
    // #endnoview

    public insert(value: number) {
        let newNode = new Node(value)
        if(this.root == null) {
            this.root = newNode;
            this.nodes++;
            return this;
        }
        let current = this.root;
        while(current) {
            if(value === current.value) return undefined;
            if(value < current.value) {
                if(current.left === null) {
                    current.left = newNode;
                    this.nodes++;
                    return this
                }
                current = current.left
            } else {
                if(current.right === null) {
                    current.right = newNode;
                    this.nodes++;
                    return this
                }
                current = current.right
            }
        }
    }

    public *find(value: number){
        if(!this.root) return false

        let current: Node | null = this.root
        let found: Node | boolean = false
        while(current && !found){
            if(value < current.value){
                current = current.left
            } else if(value > current.value){
                current = current.right
            } else {
                found = current
            }
            yield current
        }
        if(!found) return undefined;
        return found
    }

        public remove(value: number) {
        this.root = this.removeNode(this.root, value)
        this.nodes--;
    }

    private removeNode(current, value) {
        if(current === null) return current
        if (value === current.value) {

            // for case 1 and 2, node without child or with one child

            if (current.left === null && current.right === null){

                return null

            }else if(current.left === null){

                return current.right

            }else if(current.right === null){

                return current.left

            }else{

                /// node with two children, get the inorder successor,
                //smallest in the right subtree

                let tempNode = this.kthSmallestNode(current.right)
                current.value = tempNode.value

                /// delete the inorder successor

                current.right = this.removeNode(current.right, tempNode.value)
                return current
            }

            // recur down the tree

        }else if(value < current.value) {

            current.left = this.removeNode(current.left, value)
            return current

        }else{

            current.right = this.removeNode(current.right, value)
            return current
        }
    }

    private kthSmallestNode(node) {
        while(!node.left === null)
            node = node.left

        return node
    }

    public clear() {
        this.root = null;
        this.nodes = 0;
    }
}

function createBstStore() {
    const {subscribe, set, update} = writable(new BinarySearchTree(), () =>{
        console.log("(BST) Got a subscriber")

        return () => {
            console.log("No more subscribers")
        }
    });

    return {
        subscribe, set, update,
        insert: () => update(bst => {
            bst.insert(randomNumber(0, 100));
            return bst
        }),
        find: async (value: number) => {

            const generator: Generator<Node | null> = get(bst).find(value);
            for (let result = generator.next(); !result.done; result = generator.next()) {

                const nodeEl = document.getElementById(`node-${result.value?.value}`)
                nodeEl?.classList.add('bg-red-400')
                await delay(1000)
                if(value === result.value?.value) {
                    nodeEl?.classList.remove('bg-red-400');
                    return result.value
                }
                nodeEl?.classList.remove('bg-red-400');
            }

            return false;
        },
        remove: (value: number) => update(bst => {
            bst.remove(value);
            return bst
        }),
        randomize: () => update(bst => {

            for(let i = 0; i < 10; i++) {
                bst.insert(randomNumber(0, 100));
            }
            return bst;
        })
    }
}



export const bst = createBstStore();



export default {
    class:  BinarySearchTree,
    controls: BstControls,
    layer: BstLayer
}