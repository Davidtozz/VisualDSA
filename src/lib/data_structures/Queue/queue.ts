export class Queue<T> {
    private queue: T[];

    public constructor() {
        this.queue = [];
    }

    public enqueue(item: T): void {
        this.queue.push(item);
    }

    public size() {
        return this.queue.length;
    }

    public dequeue(): T | undefined {
        return this.queue.shift();
    }

    includes(value: T) {
        return this.queue.includes(value);
    }
}