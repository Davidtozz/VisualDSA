import { Queue } from '../Queue/queue.ts';

export class Graph<T> {
    private numOfVertices: number;
    // The key is the vertex's data
    private adjencyList: Map<T, T[]>;

    public constructor() {
        this.numOfVertices = 0;
        this.adjencyList = new Map();

    }

    public addVertex(vertex: T): void {
        this.adjencyList.set(vertex, []);
        this.numOfVertices++;
    }

    public addEdge(src: T, dest: T): void {
        this.adjencyList.get(src)?.push(dest);
        this.adjencyList.get(dest)?.push(src);
    }

    public dfs(start: T, visited: Map<T, boolean> = new Map()): void {
        if (visited.get(start)) return;
        visited.set(start, true);
        console.log(start + ' ');

        const neighbors = this.adjencyList.get(start);
        if (!neighbors) return;
        for (const neighbor of neighbors) {
            this.dfs(neighbor, visited);
        }
    }

    public bfs(start: T, visited = new Queue<T>()): void {
        visited.enqueue(start);

        while (visited.size() > 0) {
            const vertex = visited.dequeue();
            if (!vertex) return;
            console.log(vertex + ' ');

            const neighbors = this.adjencyList.get(vertex);
            if (!neighbors) return;
            for (const neighbor of neighbors) {
                if (!visited.includes(neighbor)) {
                    visited.enqueue(neighbor);
                }
            }
        }
    }

    public print(): void {
        for (const [vertex, edges] of this.adjencyList) {
            console.log(`${vertex} -> ${edges.join(', ')}`);
        }
    }
}