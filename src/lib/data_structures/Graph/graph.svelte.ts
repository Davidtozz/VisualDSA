import GraphLayer from './graph.svelte';
import GraphControls from './graph-controls.svelte';
import { DEFAULT_VERTICES_AMOUNT, VERTEX_RADIUS, VERTEX_STATE } from '@/constants.ts';
import { Vertex } from '@/data_structures/Graph/vertex.svelte.ts';
import { randomNumber } from '@/utils.ts';

let _viewBox = $state<HTMLDivElement | undefined>(undefined);

export function setViewBox(el: HTMLDivElement | undefined) {
    _viewBox = el;
}

export class Graph<T> {
    public vertices: Vertex<T>[];
    private numOfVertices: number;
    private readonly adjacencyList: Map<string, Vertex<T>[]>;

    public constructor() {
        this.numOfVertices = $state(0);
        this.adjacencyList = new Map();
        this.vertices = $state([] as Vertex<T>[]);
    }

    static get classes(): Function[] {
        return [Vertex];
    }

    public addVertex(vertex: Vertex<T>): void {
        this.adjacencyList.set(vertex.id, []);
        this.vertices = [...this.vertices, vertex];
        this.numOfVertices++;
    }

    public addGraphEdge(src: Vertex<T>, dest: Vertex<T>, weight: number = 0): boolean {
        if (src.hasEdge(dest) || dest.hasEdge(src)) {
            return false;
        }

        this.adjacencyList.get(src.id)?.push(dest);
        this.adjacencyList.get(dest.id)?.push(src);

        src.addEdge({ vertex: dest, weight });
        dest.addEdge({ vertex: src, weight });
        // ensure no other vertex overlaps the new edge
        for (const vertex of this.vertices) {
            if (vertex.id === src.id || vertex.id === dest.id) continue;

            while (vertexOverlapsEdge(src.pos, dest.pos, vertex)) {
                vertex.pos = computeCoords();
            }
        }

        return true;
    }

    public async dfs(start: Vertex<T>, visited: Map<string, boolean> = new Map()): Promise<void> {
        if (visited.get(start.id)) return;
        visited.set(start.id, true);
        await start.highlight(VERTEX_STATE.VISITING);

        const neighbors = this.adjacencyList.get(start.id);
        if (!neighbors) return;
        for (const neighbor of neighbors) {
            await this.dfs(neighbor, visited);
        }
        await start.highlight(VERTEX_STATE.VISITED);
    }

    public async bfs(start: Vertex<T>) {
        const visited = new Map<string, boolean>(this.vertices.map(v => [v.id, false]));
        const queue: Vertex<T>[] = [];

        visited.set(start.id, true);
        queue.push(start);

        while (queue.length > 0) {
            const curr = queue.shift();
            await curr!.highlight(VERTEX_STATE.VISITING);

            const neighbors = this.adjacencyList.get(curr!.id);
            for (const neighbour of neighbors || []) {
                if (!visited.get(neighbour.id)) {
                    visited.set(neighbour.id, true);
                    queue.push(neighbour);
                    await neighbour.highlight(VERTEX_STATE.VISITED);
                }
            }
        }
    }


    public size(): number {
        return this.numOfVertices;
    }

    public isEmpty(): boolean {
        return this.numOfVertices === 0;
    }

    public clear(): void {
        this.vertices = [];
        this.numOfVertices = 0;
        this.adjacencyList.clear();
    }

    public randomize(size: number = DEFAULT_VERTICES_AMOUNT): Graph<T> {
        this.clear();
        for (let i = 0; i < size; i++) {
            let coords: Coords = { x: 0, y: 0 };
            coords = computeCoords();
            this.addVertex(new Vertex<any>(i as any, coords));
        }

        for (let i = 0; i < this.vertices.length; i++) {
            for (let j = i + 1; j < this.vertices.length; j++) {
                if (this.vertices[i].edges.length > 1) break;
                if (Math.random() < 0.5) {
                    this.addGraphEdge(this.vertices[i], this.vertices[j], randomNumber(0, 10));
                }
            }
        }

        return this;
    }
}

export const graph = $state(new Graph<number>());

/* Utilities */

export function vertexOverlapsEdge(edgeStart: Coords, edgeEnd: Coords, targetVertex: Vertex<unknown>): boolean {
    let Ax = edgeStart.x - targetVertex.pos.x;
    let Ay = edgeStart.y - targetVertex.pos.y;
    let Bx = edgeEnd.x - targetVertex.pos.x;
    let By = edgeEnd.y - targetVertex.pos.y;


    let a = (Bx - Ax) ** 2 + (By - Ay) ** 2;
    let b = 2 * (Ax * (Bx - Ax) + Ay * (By - Ay));
    let c = Ax ** 2 + Ay ** 2 - VERTEX_RADIUS ** 2;

    const discriminant = b ** 2 - 4 * a * c;
    if (discriminant <= 0) return false;

    const sqrt_discriminant = Math.sqrt(discriminant);
    const t1 = (-b + sqrt_discriminant) / (2 * a);
    const t2 = (-b - sqrt_discriminant) / (2 * a);

    return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1);
}

export function isFarEnough(pos: Coords): boolean {
    for (const vertex of graph.vertices) {
        if (distanceFrom(pos, vertex.pos) < DEFAULT_VERTICES_AMOUNT) {
            return false;
        }
    }
    return true;
}

export function distanceFrom(A: Coords, B: Coords) {
    return Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2);
}

export function computeCoords(): Coords {
    let x: number, y: number;
    const box = (_viewBox as any);
    do {
        const w = box?.clientWidth ?? 400;
        const h = box?.clientHeight ?? 300;
        x = Math.random() * (w - 2 * 40) + 40;
        y = Math.random() * (h - 2 * 40) + 40;
    } while (!isFarEnough({ x, y }));

    return { x, y };
}

export function generate() {
    (graph as any).randomize();
}

export default {
    class: Graph,
    controls: GraphControls,
    layer: GraphLayer
};



