import { randomNumber } from '@/utils.ts';
import StackControls from './stack-controls.svelte';
import StackLayer from './stack.svelte';

export class Stack {
    public bars: number[];
    public capacity: number;

    constructor(capacity: number = 10) {
        this.capacity = $state(capacity);
        this.bars = $state(new Array<number>(capacity));
    }

    public pop(): number | void {
        if (this.bars.length > 0)
            return this.bars.shift();
    }

    public push(value?: number): void {
        if (this.bars.length < this.capacity)
            this.bars.unshift(value ?? randomNumber(0, 100));
    }

    public isEmpty(): boolean {
        return this.bars.length === 0;
    }

    public isFull(): boolean {
        return this.bars.length === this.capacity;
    }

    public get top(): number | void {
        if (this.bars.length > 0) return this.bars[this.bars.length - 1];
    }

    public randomize(size: number = this.bars.length) {
        this.bars = [];
        for (let i = 0; i < size; i++) {
            this.bars.push(randomNumber(0, 100));
        }
        return this.bars;
    }
}


export const stack = $state(new Stack());


export default {
    class: Stack,
    controls: StackControls,
    layer: StackLayer
};