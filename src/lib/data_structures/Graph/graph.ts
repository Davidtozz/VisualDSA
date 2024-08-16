import { Queue } from '../Queue/queue.ts';
import { generateUID } from '@/utils.ts';
import { writable } from 'svelte/store';
import GraphLayer from './graph.svelte';
import GraphControls from './graph-controls.svelte';
import type { Field } from '@/data_structures';

export type Coords = {
    x: number;
    y: number;
};

export class Vertex<T> {
    readonly data: T;
    public neighbors: Vertex<T>[];
    public pos: Coords;
    public readonly id: string;

    public constructor(data: T, coordinates: Coords) {
        this.data = data;
        this.neighbors = [];
        this.pos = coordinates;
        this.id = 'Vertex#' + generateUID();
    }

    public addNeighbor(neighbor: Vertex<T>): void {
        this.neighbors.push(neighbor);
    }

    public hasNeighbor(neighbor: Vertex<T>): boolean {
        return this.neighbors.includes(neighbor);
    }
}

export class Graph<T> {
    public vertices: Vertex<T>[];
    private numOfVertices: number;
    // The key is the vertex's data
    private readonly adjacencyList: Map<string, Vertex<T>[]>;

    public constructor() {
        this.numOfVertices = 0;
        this.adjacencyList = new Map();
        this.vertices = [];
    }

    static get methods(): Function[] {
        return [
            Graph.prototype.addVertex,
            Graph.prototype.addEdge,
            Graph.prototype.dfs,
            Graph.prototype.bfs,
            Graph.prototype.print
        ];
    }

    static get fields(): Field[] {
        return [
            { name: 'verteces', type: 'Vertex[]' },
            { name: 'numOfVertices', type: 'number' },
            { name: 'adjacencyList', type: 'Map<string, Vertex<T>[]>' }
        ];
    }

    static get classes(): Function[] {
        return [Vertex];
    }

    public addVertex(vertex: Vertex<T>): void {
        this.adjacencyList.set(vertex.id, []);
        this.vertices.push(vertex);
        this.numOfVertices++;
    }

    public addEdge(src: Vertex<T>, dest: Vertex<T>): void {
        this.adjacencyList.get(src.id)?.push(dest);
        this.adjacencyList.get(dest.id)?.push(src);

        src.addNeighbor(dest);
        dest.addNeighbor(src);
    }

    public dfs(start: Vertex<T>, visited: Map<string, boolean> = new Map()): void {
        if (visited.get(start.id)) return;
        visited.set(start.id, true);
        console.log(start + ' ');

        const neighbors = this.adjacencyList.get(start.id);
        if (!neighbors) return;
        for (const neighbor of neighbors) {
            this.dfs(neighbor, visited);
        }
    }

    public bfs(start: Vertex<T>, visited = new Queue<string>()): void {
        visited.enqueue(start.id);

        while (visited.size() > 0) {
            const vertex = visited.dequeue();
            if (!vertex) return;
            console.log(vertex + ' ');

            const neighbors = this.adjacencyList.get(vertex);
            if (!neighbors) return;
            for (const neighbor of neighbors) {
                if (!visited.includes(neighbor.id)) {
                    visited.enqueue(neighbor.id);
                }
            }
        }
    }

    public print(): void {
        for (const [vertex, edges] of this.adjacencyList) {
            console.log(`${vertex} -> ${edges.join(', ')}`);
        }
    }
}

function createGraphStore() {
    const { subscribe, set, update } = writable<Graph<number>>(new Graph(), () => {
        console.log('(Graph) Got a subscriber');

        return () => {
            console.log('No more subscribers');
        };
    });

    return {
        subscribe,
        set,
        update
    };
}

export const graph = createGraphStore();

export default {
    class: Graph,
    controls: GraphControls,
    layer: GraphLayer
};