import { VERTEX_STATE } from '@/constants.ts';
import { visualizer } from '@/visualizer/visualizer.svelte.ts';

export type Edge<T> = {
    vertex: Vertex<T>;
    weight?: number;
}

export class Vertex<T> {
    readonly data: T;
    public edges: Edge<T>[];
    public pos: Coords;
    public readonly id: string;
    public fill: string = $state(VERTEX_STATE.UNVISITED);

    public constructor(data: T, coordinates: Coords, id = 'Vertex#' + Math.random().toString(12)) {
        this.data = data;
        this.edges = $state([] as Edge<T>[]);
        this.pos = $state(coordinates);
        this.id = id;
    }

    public addEdge(edge: Edge<T>): void {
        this.edges = [...this.edges, edge];
    }

    public hasEdge(edge: Edge<T> | Vertex<T>): boolean {

        if (edge instanceof Vertex) {
            return this.edges.some(e => e.vertex === edge);
        }

        return this.edges.includes(edge);
    }

    public getEdgeWeight(vertex: Vertex<T>): number | undefined {
        return this.edges.find(e => e.vertex === vertex)?.weight;
    }


    public async highlight(color: string, ms = 500): Promise<void> {
        this.fill = color;
        await visualizer.delay(ms);
    }

}