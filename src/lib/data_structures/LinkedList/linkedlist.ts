import { writable, type Writable, get } from "svelte/store";
import { randomNumber } from '@/utils';
import type { Field } from '@/data_structures';
import LinkedListLayer from './linkedlist.svelte';
import LinkedListControls from './linkedlist-controls.svelte';

export class ListNode<T>  {
    public data: T;
    public next: ListNode<T> | null;


    constructor(data: T, next: ListNode<T> | null = null) {
        
        this.data = data;
        this.next = next;
    }
    static get methods(): Function[] {
        return []
    }
    static get fields(): { name: string; type: string; }[] {
        return [
            { name: 'data', type: 'T' },
            { name: 'next', type: 'ListNode<T> | null' }
        ]
    }
}

export class LinkedList<T>  {
    public length: number;
    public head: ListNode<T> | null;   

    //Returns the head of newly created LinkedList
    constructor() {
        this.length = 0;
        this.head = null;
    }
    // #noview
    static get methods(): Array<Function> {
        return [
            LinkedList.prototype.append,
            LinkedList.prototype.removeAt,
            LinkedList.prototype.removeLast
        ]
    }
    static get fields(): Field[] {
        return [
            { name: 'length', type: 'number' },
            { name: 'head', type: 'ListNode<T> | null' }
        ]
    }
    // #noview

    public append(data: T): void {

        const newNode = new ListNode<T>(data, null);
        if(this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while(current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
            this.length++;
        }

        
    }

    public removeAt(position: number): void {
        if(this.head === null) return;

        if(position === 0) {
            this.head = this.head.next
            return
        }
        let current: ListNode<T> | null = this.head
        let previous: ListNode<T> | null = null
        let count = 0;

        while(current !== null && count < position) {
            previous = current;
            current = current.next;
            count++;
        }
        if(current === null) {
            return 
        }

        if(previous) previous.next = current.next;
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
        this.length--;
    }

    // #noview
    public toNodesArray(): ListNode<T>[] {
        let current = this.head;
        let arr: ListNode<T>[] = [];
        while(current !== null) {
            arr.push(current);
            current = current.next;
        }
        return arr;
    }
    // #noview
}


function createlinkedListStore() {
    const { subscribe, set, update } = writable(new LinkedList<number>());

    return {
        set,
        subscribe,
        removeLast: () => update(linkedList => {
            linkedList.removeLast();
            return linkedList;
        }),
        reset: () => set(new LinkedList<number>()),
        randomize: (size: number = 10) => update(linkedList => {
            linkedList = new LinkedList<number>();  
            
            for(let i = 0; i < size; i++) {
                linkedList.append(randomNumber(1, 100));
            }
            
            return linkedList;
        })
    }
}

export const linkedlist = createlinkedListStore();


export default {
    class: LinkedList,
    controls: LinkedListControls,
    layer: LinkedListLayer
}