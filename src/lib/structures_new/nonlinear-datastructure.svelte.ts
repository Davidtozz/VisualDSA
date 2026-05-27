import { VERTEX_STATE } from '@/constants';
import { graph, vertexOverlapsEdge } from '@/data_structures/Graph/graph';
import { computeCoords } from '@/data_structures/Graph/graph.svelte';
import { Queue } from './linear-datastructure.svelte';
import type { Collection, ToArray, Contains } from './common';
import { visualizer } from '@/visualizer/visualizer.svelte.ts';


// #region NonLinearDataStructure
export interface INonLinearStructure<T> extends Collection, ToArray<T>, Contains<T> { }

export abstract class NonLinearDataStructure<T> implements INonLinearStructure<T> {
    protected readonly name: string;
    protected abstract length: number;

    constructor(name: string) {
        this.name = $state.raw(name);
    }

    abstract isEmpty(): boolean
    abstract clear(): void
    abstract toArray(): T[]
    abstract contains(element: T): boolean
    abstract size(): number;
}
// #endregion

// #region Graph
export interface Edge<T> {
    vertex: Vertex<T>;
    weight?: number;
}

export class Vertex<T> {
    readonly data: T;
    public edges: Edge<T>[];
    public pos: Coords;
    public readonly id: string;
    public fill: string = VERTEX_STATE.UNVISITED;

    public constructor(data: T, coordinates: Coords, id = 'Vertex#' + Math.random().toString(12)) {
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
        await visualizer.delay(ms);
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

    public getVisualizationType(): string {
        return 'graph';
    }

    public addVertex(vertex: Vertex<T>): void {
        this.adjacencyList.set(vertex.id, []);
        this.vertices.push(vertex);
        this.numOfVertices++;
    }

    public addGraphEdge(src: Vertex<T>, dest: Vertex<T>, weight: number = 0): boolean {

        if (src.hasEdge(dest) || dest.hasEdge(src)) {
            return false;
        }

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

        return true;
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
// #endregion

// #region BinarySearchTree
class BinaryTreeNode<T> {
    public value: T;
    public right: BinaryTreeNode<T> | null;
    public left: BinaryTreeNode<T> | null;

    public constructor(value: T) {
        this.value = value;
        this.right = null;
        this.left = null
    }

    public toString() {
        return `Node {value: ${this.value}, right: ${this.right}, left: ${this.left}}`
    }
}

export class BinarySearchTree extends NonLinearDataStructure<number> {
    public root: BinaryTreeNode<number> | null;
    protected length: number;

    constructor(root: BinaryTreeNode<number> | null = null) {
        super('BinarySearchTree');
        this.root = root;
        this.length = this.countNodes(root);
    }

    public getVisualizationType(): string {
        return 'bst';
    }

    private countNodes(node: BinaryTreeNode<number> | null): number {
        if (node === null) return 0;
        return 1 + this.countNodes(node.left) + this.countNodes(node.right);
    }

    public size(): number {
        return this.length;
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public clear(): void {
        this.root = null;
        this.length = 0;
    }

    public contains(element: number): boolean {
        let current = this.root;

        while (current !== null) {
            if (element < current.value) {
                current = current.left;
            } else if (element > current.value) {
                current = current.right;
            } else {
                return true;
            }
        }

        return false;
    }

    public toArray(): number[] {
        const result: number[] = [];
        this.inOrder(this.root, result);
        return result;
    }

    private inOrder(node: BinaryTreeNode<number> | null, result: number[]): void {
        if (node === null) return;

        this.inOrder(node.left, result);
        result.push(node.value);
        this.inOrder(node.right, result);
    }

    public insert(value: number): BinarySearchTree | undefined {
        const newNode = new BinaryTreeNode<number>(value);

        if (this.root === null) {
            this.root = newNode;
            this.length++;
            return this;
        }

        let current = this.root;
        while (current) {
            if (value === current.value) return undefined;

            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    this.length++;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    this.length++;
                    return this;
                }
                current = current.right;
            }
        }
    }

    public *find(value: number): Generator<BinaryTreeNode<number>, BinaryTreeNode<number> | undefined, void> {
        let current = this.root;

        while (current) {
            yield current;

            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                return current;
            }
        }

        return undefined;
    }

    public remove(value: number): void {
        const [updatedRoot, removed] = this.removeNode(this.root, value);
        this.root = updatedRoot;

        if (removed) {
            this.length--;
        }
    }

    private removeNode(node: BinaryTreeNode<number> | null, value: number): [BinaryTreeNode<number> | null, boolean] {
        if (node === null) return [null, false];

        if (value < node.value) {
            const [updatedLeft, removed] = this.removeNode(node.left, value);
            node.left = updatedLeft;
            return [node, removed];
        }

        if (value > node.value) {
            const [updatedRight, removed] = this.removeNode(node.right, value);
            node.right = updatedRight;
            return [node, removed];
        }

        if (node.left === null && node.right === null) {
            return [null, true];
        }

        if (node.left === null) {
            return [node.right, true];
        }

        if (node.right === null) {
            return [node.left, true];
        }

        const successor = this.minNode(node.right);
        node.value = successor.value;

        const [updatedRight] = this.removeNode(node.right, successor.value);
        node.right = updatedRight;
        return [node, true];
    }

    private minNode(node: BinaryTreeNode<number>): BinaryTreeNode<number> {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }
}
// #endregion