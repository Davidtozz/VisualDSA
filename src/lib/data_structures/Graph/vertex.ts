import { VERTEX_STATE } from '@/constants.ts';
import { delay, generateUID } from '@/utils.ts';
import { graph } from '@/data_structures/Graph/graph.ts';

export class Vertex<T> {
    readonly data: T;
    public neighbors: Vertex<T>[];
    public pos: Coords;
    public readonly id: string;
    public fill: string = VERTEX_STATE.UNVISITED;

    public constructor(data: T, coordinates: Coords, id = 'Vertex#' + generateUID()) {
        this.data = data;
        this.neighbors = [];
        this.pos = coordinates;
        this.id = id;
    }

    public addNeighbor(neighbor: Vertex<T>): void {
        this.neighbors.push(neighbor);
    }

    public hasNeighbor(neighbor: Vertex<T>): boolean {
        return this.neighbors.includes(neighbor);
    }

    public async highlight(color: string, ms = 500): Promise<void> {
        this.fill = color;
        graph.update(g => g);
        await delay(ms);
    }


    public getEdgeWeight(neighbor: Vertex<T>): number {
        return 1;
    }
}
