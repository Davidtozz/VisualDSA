export class Queue<T> {
    private queue: T[];

    public constructor() {
        this.queue = [];
    }

    public enqueue(item: T): void {
        if (this.queue.length === 0) {
            this.queue.push(item);
        } else this.queue.unshift(item);
    }

    public size() {
        return this.queue.length;
    }

    public dequeue(): T | undefined {
        return this.queue.pop();
    }

    includes(neighbor: T) {
        return this.queue.includes(neighbor);
    }
}