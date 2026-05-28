import BstControls from './bst-controls.svelte';
import BstLayer from './bst.svelte';
import { randomNumber } from '@/utils.ts';
import { visualizer } from '@/visualizer/visualizer.svelte.ts';

class Node {
    public value: number;
    public right: Node | null;
    public left: Node | null;

    public constructor(value: number) {
        this.value = $state(value);
        this.right = $state(null);
        this.left = $state(null)
    }

    public toString() {
        return `Node {value: ${this.value}, right: ${this.right}, left: ${this.left}}`
    }
}

export class BinarySearchTree {
    public root: Node | null;
    protected length: number;
    public highlighted: number | null;

    constructor(root: Node | null = null) {
        this.root = $state(root);
        this.length = $state(root ? this.countNodes(root) : 0);
        this.highlighted = $state(null);
    }

    public get nodes(): number {
        return this.length;
    }

    public insert(value: number = randomNumber(0, 100)): BinarySearchTree | undefined {
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

    public async find(value: number): Promise<Node | undefined | false> {
        if (Number.isNaN(value) || !this.root) return false;

        const generator = this.findSteps(value);
        for (let result = generator.next(); !result.done; result = generator.next()) {
            this.highlighted = result.value?.value ?? null;
            await visualizer.delay(1000)
            if (value === result.value?.value) {
                await visualizer.delay(200);
                this.highlighted = null;
                return result.value
            }
        }

        this.highlighted = null;
        return false;
    }

    private *findSteps(value: number): Generator<Node | null, Node | undefined, void> {
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

    private countNodes(node: Node | null): number {
        if (node === null) return 0;
        return 1 + this.countNodes(node.left) + this.countNodes(node.right);
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
        this.highlighted = null;
    }

    public randomize(size: number = 10): BinarySearchTree {
        this.clear();

        for (let i = 0; i < size; i++) {
            this.insert(randomNumber(0, 100));
        }

        return this;
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

export const bst = $state(new BinarySearchTree());



export default {
    class: BinarySearchTree,
    controls: BstControls,
    layer: BstLayer
}