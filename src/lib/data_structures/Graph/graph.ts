import { writable } from 'svelte/store';
import GraphLayer from './graph.svelte';
import GraphControls from './graph-controls.svelte';
import type { Field } from '@/data_structures';
import { DEFAULT_VERTICES_AMOUNT, VERTEX_STATE } from '@/constants.ts';
import { Queue } from '@/data_structures/Queue/queue.ts';
import { Vertex } from '@/data_structures/Graph/vertex.ts';
import { computeCoords, vertexOverlapsEdge } from '@/data_structures/Graph/graph.svelte';
import { randomNumber } from '@/utils.ts';


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
            Graph.prototype.addGraphEdge,
            Graph.prototype.dfs,
            Graph.prototype.bfs,
            Graph.prototype.print
        ];
    }

    static get fields(): Field[] {
        return [
            { name: 'vertices', type: 'Vertex[]' },
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

    public addGraphEdge(src: Vertex<T>, dest: Vertex<T>, weight: number = 0): void {

        this.adjacencyList.get(src.id)?.push(dest);
        this.adjacencyList.get(dest.id)?.push(src);

        src.addEdge({
            vertex: dest,
            weight
        });
        dest.addEdge({
            vertex: src,
            weight
        });

        for (const vertex of this.vertices) {
            if (vertex.id === src.id || vertex.id === dest.id) continue;

            while (vertexOverlapsEdge(src.pos, dest.pos, vertex)) {
                vertex.pos = computeCoords();
            }
        }
    }

    public async dfs(start: Vertex<T>, visited: Map<string, boolean> = new Map()): Promise<void> {
        if (visited.get(start.id)) {
            return;
        }

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


        const queue = new Queue<Vertex<T>>();

        visited[start.id] = true;
        queue.enqueue(start);

        while (queue.size()) {
            const curr = queue.dequeue();

            await curr!.highlight(VERTEX_STATE.VISITING);

            const neighbors = this.adjacencyList.get(curr!.id);
            for (const neighbour of neighbors!) {
                if (!visited[neighbour.id]) {
                    visited[neighbour.id] = true;
                    queue.enqueue(neighbour);
                    await neighbour.highlight(VERTEX_STATE.VISITED);
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
        update,
        generate: () => {
            update($graph => {
                $graph.vertices = [];
                for (let i = 0; i < DEFAULT_VERTICES_AMOUNT; i++) {
                    let coords: Coords = { x: 0, y: 0 };

                    coords = computeCoords();

                    $graph.addVertex(new Vertex<number>(i, coords));
                }


                for (let i = 0; i < $graph.vertices.length; i++) {
                    for (let j = i + 1; j < $graph.vertices.length; j++) {

                        if ($graph.vertices[i].edges.length > 1) break;

                        if (Math.random() < 0.5) {
                            $graph.addGraphEdge($graph.vertices[i], $graph.vertices[j],
                                randomNumber(0, 10) // weight
                            );
                        }
                    }
                }

                return $graph;
            });
        }
    }
}

export const graph = createGraphStore();

export default {
    class: Graph,
    controls: GraphControls,
    layer: GraphLayer
};