import type { Collection, ToArray, Contains } from './common';

export interface ILinearStructure<T> extends Collection, ToArray<T>, Contains<T> { }

export abstract class LinearDataStructure<T> implements ILinearStructure<T> {
    protected readonly name: string;
    protected abstract length: number;

    constructor(name: string) {
        this.name = $state.raw(name);
    }

    abstract isEmpty(): boolean
    abstract clear(): void
    abstract toArray(): T[]
    abstract contains(element: T): boolean
    abstract size(): number;
}
// #region LinkedList
export class ListNode<T> {
    public data: T;
    public next: ListNode<T> | null;

    constructor(data: T, next: ListNode<T> | null = null) {
        this.data = data;
        this.next = next;
    }
}

export class LinkedList<T> extends LinearDataStructure<T> {
    public head: ListNode<T> | null;
    protected length: number;

    constructor(head: ListNode<T> | null = null) {
        super('LinkedList');
        this.length = 0;
        this.head = head;
    }

    public size(): number {
        return this.length;
    }

    public append(data: T): void {
        const newNode = new ListNode<T>(data, null);
        if (this.head === null) {
            this.head = newNode;
            this.length = 1;
            return;
        }

        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
        this.length++;
    }

    public removeAt(position: number): void {
        if (this.head === null) return;

        if (position === 0) {
            this.head = this.head.next;
            this.length = Math.max(0, this.length - 1);
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
        if (current === null) return;

        if (previous) {
            previous.next = current.next;
            this.length = Math.max(0, this.length - 1);
        }
    }

    public removeLast(): void {
        if (!this.head) return;

        if (this.head.next === null) {
            this.head = null;
            this.length = 0;
            return;
        }

        let prev = this.head;
        let curr = this.head.next;
        while (curr && curr.next !== null) {
            prev = curr;
            curr = curr.next;
        }
        if (prev) prev.next = null;
        this.length = Math.max(0, this.length - 1);
    }

    public toNodesArray(): ListNode<T>[] {
        let current = this.head;
        let arr: ListNode<T>[] = [];
        while (current !== null) {
            arr.push(current);
            current = current.next;
        }
        return arr;
    }

    public toArray(): T[] {
        return this.toNodesArray().map(n => n.data);
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public clear(): void {
        this.head = null;
        this.length = 0;
    }

    public contains(element: T): boolean {
        let current = this.head;
        while (current !== null) {
            if (current.data === element) return true;
            current = current.next;
        }
        return false;
    }
}
// #endregion

// #region Stack
export interface IStack<T> {
    pop(): T | void;
    push(value: T): void;
    get top(): T | void;
}
export class Stack<T> extends LinearDataStructure<T> implements IStack<T> {
    protected length: number;
    private items: T[];

    constructor(items: T[] = []) {
        super('Stack');
        this.items = $state(Array.isArray(items) ? [...items] : []);
        this.length = $derived(this.items.length);
    }

    public pop(): void | T {
        if (this.items.length > 0)
            return this.items.pop();
    }

    public push(value: T): void {
        this.items.push(value);
    }

    public get top(): void | T {
        if (this.items.length > 0)
            return this.items[this.items.length - 1];
    }
    public isEmpty(): boolean {
        return this.items.length === 0;
    }
    public clear(): void {
        this.items = [];
    }
    public toArray(): T[] {
        return this.items.slice();
    }
    public contains(element: T): boolean {
        return this.items.includes(element);
    }
    public size(): number {
        return this.items.length;
    }
}
// #endregion 

// #region Queue    
export interface IQueue<T> {
    enqueue(value: T): void;
    dequeue(): T | void;
    get front(): T | void;
}
export class Queue<T> extends LinearDataStructure<T> implements IQueue<T> {
    protected length: number;
    private items: T[];

    constructor(items: T[] = []) {
        super('Queue');
        this.items = $state(Array.isArray(items) ? [...items] : []);
        this.length = $derived(this.items.length);
    }

    public enqueue(value: T): void {
        this.items.push(value);
    }

    public dequeue(): void | T {
        if (this.items.length > 0)
            return this.items.shift();
    }

    public get front(): void | T {
        if (this.items.length > 0)
            return this.items[0];
    }
    public isEmpty(): boolean {
        return this.items.length === 0;
    }
    public clear(): void {
        this.items = [];
    }
    public toArray(): T[] {
        return this.items.slice();
    }
    public contains(element: T): boolean {
        return this.items.includes(element);
    }
    public size(): number {
        return this.items.length;
    }
}
// #endregion

// #region Array 
export class ArrayDS<T> extends LinearDataStructure<T> {
    protected length: number;
    private items: T[];

    constructor(items: T[] = []) {
        super(ArrayDS.name);
        this.items = $state(Array.isArray(items) ? [...items] : []);
        this.length = $derived(this.items.length);
    }

    public isEmpty(): boolean {
        return this.items.length === 0;
    }
    public clear(): void {
        this.items = [];
    }
    public toArray(): T[] {
        return this.items.slice();
    }
    public contains(element: T): boolean {
        return this.items.includes(element);
    }
    public size(): number {
        return this.items.length;
    }
}
// #endregion