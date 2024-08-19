import { VERTEX_STATE } from '@/constants.ts';
import { delay, generateUID } from '@/utils.ts';
import { graph } from '@/data_structures/Graph/graph.ts';

type Edge<T> = {
    vertex: Vertex<T>;
    weight?: number;
}

export class Vertex<T> {
    readonly data: T;
    public edges: Edge<T>[];
    public pos: Coords;
    public readonly id: string;
    public fill: string = VERTEX_STATE.UNVISITED;

    public constructor(data: T, coordinates: Coords, id = 'Vertex#' + generateUID()) {
        this.data = data;
        this.edges = [];
        this.pos = coordinates;
        this.id = id;
    }

    public addEdge(edge: Edge<T>): void {
        this.edges.push(edge);
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
        graph.update(g => g);
        await delay(ms);
    }

}