import { get, writable } from 'svelte/store';
import BstControls from './bst-controls.svelte';
import BstLayer from './bst.svelte';
import type { Field } from '@/data_structures';
import { NonLinearDataStructure } from '@/structures_new/nonlinear-datastructure.svelte';
import { randomNumber } from "@/visualizer/utils";
import { visualizer } from '@/visualizer/visualizer.svelte.ts';

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

export class BinarySearchTree extends NonLinearDataStructure<number> {
    public root: Node | null;
    protected length: number;

    constructor() {
        super('BinarySearchTree');
        this.root = null;
        this.length = 0;
    }

    public get nodes(): number {
        return this.length;
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

    public insert(value: number): BinarySearchTree | undefined {
        let newNode = new Node(value)
        if (this.root == null) {
            this.root = newNode;
            this.length++;
            return this;
        }
        let current = this.root;
        while (current) {
            if (value === current.value) return undefined;
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    this.length++;
                    return this
                }
                current = current.left
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    this.length++;
                    return this
                }
                current = current.right
            }
        }
    }

    public *find(value: number): Generator<Node | null, Node | undefined, void> {
        if (!this.root) return undefined

        let current: Node | null = this.root
        while (current) {
            yield current
            if (value < current.value) {
                current = current.left
            } else if (value > current.value) {
                current = current.right
            } else {
                return current
            }
        }
        return undefined
    }

    public remove(value: number): void {
        const [updatedRoot, removed] = this.removeNode(this.root, value)
        this.root = updatedRoot
        if (removed) {
            this.length--;
        }
    }

    private removeNode(current: Node | null, value: number): [Node | null, boolean] {
        if (current === null) return [current, false]
        if (value === current.value) {

            // for case 1 and 2, node without child or with one child

            if (current.left === null && current.right === null) {

                return [null, true]

            } else if (current.left === null) {

                return [current.right, true]

            } else if (current.right === null) {

                return [current.left, true]

            } else {

                /// node with two children, get the inorder successor,
                //smallest in the right subtree

                let tempNode = this.kthSmallestNode(current.right)
                current.value = tempNode.value

                /// delete the inorder successor

                const [updatedRight] = this.removeNode(current.right, tempNode.value)
                current.right = updatedRight
                return [current, true]
            }

            // recur down the tree

        } else if (value < current.value) {

            const [updatedLeft, removed] = this.removeNode(current.left, value)
            current.left = updatedLeft
            return [current, removed]

        } else {

            const [updatedRight, removed] = this.removeNode(current.right, value)
            current.right = updatedRight
            return [current, removed]
        }
    }

    private kthSmallestNode(node: Node): Node {
        while (node.left !== null)
            node = node.left

        return node
    }

    public size(): number {
        return this.length;
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public clear(): void {
        this.root = null;
        this.length = 0;
    }

    public contains(element: number): boolean {
        let current = this.root;

        while (current !== null) {
            if (element < current.value) {
                current = current.left;
            } else if (element > current.value) {
                current = current.right;
            } else {
                return true;
            }
        }

        return false;
    }

    public toArray(): number[] {
        const result: number[] = [];
        this.inOrder(this.root, result);
        return result;
    }

    private inOrder(node: Node | null, result: number[]): void {
        if (node === null) return;

        this.inOrder(node.left, result);
        result.push(node.value);
        this.inOrder(node.right, result);
    }
}

function createBstStore() {
    const { subscribe, set, update } = writable(new BinarySearchTree(), () => {
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
                await visualizer.delay(1000)
                if (value === result.value?.value) {
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

            for (let i = 0; i < 10; i++) {
                bst.insert(randomNumber(0, 100));
            }
            return bst;
        })
    }
}



export const bst = createBstStore();



export default {
    class: BinarySearchTree,
    controls: BstControls,
    layer: BstLayer
}