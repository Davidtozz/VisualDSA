import { randomNumber } from '@/visualizer/utils';
import LinkedListLayer from './linkedlist.svelte';
import LinkedListControls from './linkedlist-controls.svelte';

export class ListNode<T> {
    public data: T;
    public next: ListNode<T> | null;

    constructor(data: T, next: ListNode<T> | null = null) {

        this.data = $state(data);
        this.next = $state(next);
    }
}

export class LinkedList<T> {
    public head: ListNode<T> | null;
    private _nodes: ListNode<T>[];

    public get length(): number {
        return this._nodes.length;
    }

    constructor() {
        this._nodes = $state([]);
        this.head = $state(null);
    }

    public append(data: T): void {

        const newNode = new ListNode<T>(data, null);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        this._nodes.push(newNode);
    }

    public removeAt(position: number): void {
        if (this.head === null) return;

        if (position === 0) {
            this.head = this.head.next;
            return;
        }
        let current: ListNode<T> | null = this.head;
        let previous: ListNode<T> | null = null;
        let count = 0;

        while (current !== null && count < position) {
            previous = current;
            current = current.next;
            count++;
        }
        if (current === null) {
            return;
        }

        if (previous) previous.next = current.next;
        this._nodes.splice(this._nodes.indexOf(current), 1);
    }

    public removeLast(): void {
        let temp = this.head;

        if (!temp) return;

        while (temp.next !== null) {
            temp = temp.next;
        }
        if (this.head === temp) {
            this.head = null;
        } else temp = null;
        this._nodes.pop();
    }

    public toNodesArray(): ReadonlyArray<ListNode<T>> {
        return this._nodes as ReadonlyArray<ListNode<T>>;
    }
}

export const linkedlist = $state({ value: new LinkedList<number>() });

export function randomize(size: number = 10) {
    linkedlist.value = new LinkedList<number>();
    for (let i = 0; i < size; i++) {
        linkedlist.value.append(randomNumber(1, 100));
    }
    return linkedlist;
}

export function reset() {
    linkedlist.value = new LinkedList<number>();
}

export default {
    class: LinkedList,
    controls: LinkedListControls,
    layer: LinkedListLayer
};