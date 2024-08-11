import { writable } from 'svelte/store';
import { delay, randomNumber } from '@/utils';
import type { Field } from '@/data_structures';
import StackControls from './stack-controls.svelte';
import StackLayer from './stack.svelte';

export class Stack {
    public bars: number[];
    public size: number;

    constructor(size: number = 10) {
        this.bars = [];
        this.size = size;

    }

    // #noview
    static get methods(): Function[] {
        return [
            Stack.prototype.pop,
            Stack.prototype.push,
            Stack.prototype.isEmpty,
            Stack.prototype.isFull
        ]
    }

    static get fields(): Field[] {
        return [
            { name: 'bars', type: 'T[]' },
            { name: '_size', type: 'number' }
        ]
    }
    // #noview

    public pop(): number | void {
        if(this.bars.length > 0) return this.bars.pop();
    }

    public push(value: number): void {
        if(this.bars.length < this.size) this.bars.push(value);
    }

    public isEmpty(): boolean {
        return this.bars.length === 0;
    }

    public isFull(): boolean {
        return this.bars.length === this.size;
    }

    public get top(): number | void {
        if(this.bars.length > 0) return this.bars[this.bars.length - 1];
    }
}

function createStackStore() {
    const {subscribe, set, update} = writable(new Stack(0));

    return {
        subscribe, set, update,
        pop: () => update(stack => {
            stack.pop();
            return stack
        }),
        push: () => update(stack => {
            stack.push(randomNumber(0,100));
            return stack;
        }),
        randomize: (size: number = 10) => update(stack => {
            stack = new Stack(size );
            for(let i = 0; i < size; i++) {
                stack.push(randomNumber(0, 100));
            }
            return stack;
        }),
    }
}

export const stack = createStackStore();


export default {
    class: Stack,
    controls: StackControls,
    layer: StackLayer
}