import { writable, type Writable, get } from "svelte/store";
import { DataStructure } from "../base";


export class ListNode<T> extends DataStructure {
    public data: T;
    public next: ListNode<T> | null;


    constructor(data: T, next: ListNode<T> | null = null) {
        super('ListNode')
        this.data = data;
        this.next = next;
    }
    get methods(): Function[] {
        return []
    }
    get fields(): { name: string; type: string; }[] {
        return [
            { name: 'data', type: typeof this.data },
            { name: 'next', type: 'ListNode<T> | null' }
        ]
    }

}

export class LinkedList<T> extends DataStructure{
    public toClassString(): string {
        return LinkedList.toString()
    }
    public length: number;
    public head: ListNode<T> | null;   

    //Returns a the head of newly created LinkedList
    constructor() {
        super('LinkedList');
        this.length = 0;
        this.head = null;
    }
    get methods(): Function[] {
        return [
            this.append,
            this.removeAt,
            this.removeLast
        ]
    }
    get fields(): { name: string, type: string }[] {
        return [
            { name: 'length', type: typeof this.length },
            { name: 'head', type: 'ListNode<T> | null' }
        ]
    }

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

    /* Visualizer only */
    public toNodesArray(): ListNode<T>[] {
        let current = this.head;
        let arr: ListNode<T>[] = [];
        while(current !== null) {
            arr.push(current);
            current = current.next;
        }
        return arr;
    }
}


function createlinkedListStore() {
    const { subscribe, set, update } = writable(new LinkedList<number>());


    const size = writable<number>(0);

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
                linkedList.append(Math.floor(Math.random() * 100));
            }
            
            return linkedList;
        })
    }
}

export const linkedlist = createlinkedListStore();