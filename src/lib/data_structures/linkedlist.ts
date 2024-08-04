import { SvelteComponent } from "svelte";
import { c } from "svelte-highlight/languages";

export class ListNode<T> {
    data: T;
    next: ListNode<T> | null;

    constructor(data: T, next: ListNode<T> | null = null) {
        this.data = data;
        this.next = next;
    }
}

export class LinkedList<T> {
    length: number;
    head: ListNode<T> | null;

    //Returns a the head of newly created LinkedList
    constructor() {
        this.length = 0;
        this.head = null;
    }

    public append(data: T, node: ListNode<T> | null = null): void {

        const newNode = new ListNode<T>(data, null);
        if(this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while(current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    public removeLast(): void {
        let temp = this.head;

        if(!temp) return;

        while(temp.next !== null) {
            temp = temp.next;
        }
        if(this.head === temp) {
            this.head = null;
        }else temp = null;
    }
}