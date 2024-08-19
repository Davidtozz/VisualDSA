<script context="module" lang="ts">
    import { get, writable } from 'svelte/store';
    import { GRAPH_MIN_DISTANCE_BETWEEN_VERTICES, GRAPH_VIEWBOX_PADDING, VERTEX_RADIUS } from '@/constants.ts';

    export const viewBoxStore = writable<HTMLDivElement>(undefined);

    export function distanceFrom(A: Coords, B: Coords) {
        return Math.sqrt(
            (A.x - B.x) ** 2 +
            (A.y - B.y) ** 2
        );
    }

    export function isFarEnough(pos: Coords): boolean {
        for (const vertex of get(graph).vertices) {
            if (distanceFrom(pos, vertex.pos) < GRAPH_MIN_DISTANCE_BETWEEN_VERTICES) {
                return false;
            }
        }
        return true;
    }

    // Reference: https://math.stackexchange.com/questions/275529/check-if-line-intersects-with-circles-perimeter
    export function vertexOverlapsEdge(
        edgeStart: Coords,
        edgeEnd: Coords,
        targetVertex: Vertex<unknown>
    ): boolean {

        // a deep clone of the coordinates is made to avoid mutating the source
        let A = structuredClone(edgeStart);
        let B = structuredClone(edgeEnd);

        A.x -= targetVertex.pos.x;
        A.y -= targetVertex.pos.y;
        B.x -= targetVertex.pos.x;
        B.y -= targetVertex.pos.y;

        let a = (B.x - A.x) ** 2 + (B.y - A.y) ** 2;
        let b = 2 * (A.x * (B.x - A.x) + A.y * (B.y - A.y));
        let c = A.x ** 2 + A.y ** 2 - VERTEX_RADIUS ** 2;

        const discriminant = b ** 2 - 4 * a * c;
        if (discriminant <= 0) return false;

        const sqrt_discriminant = Math.sqrt(discriminant);
        const t1 = (-b + sqrt_discriminant) / (2 * a);
        const t2 = (-b - sqrt_discriminant) / (2 * a);

        return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1);
    }

    export function computeCoords(): Coords {
        let x: number, y: number;
        do {
            x = Math.random() * (get(viewBoxStore).clientWidth - 2 * GRAPH_VIEWBOX_PADDING) + GRAPH_VIEWBOX_PADDING;
            y = Math.random() * (get(viewBoxStore).clientHeight - 2 * GRAPH_VIEWBOX_PADDING) + GRAPH_VIEWBOX_PADDING;

        } while (!isFarEnough({ x, y }));


        return {
            x,
            y
        };
    }

</script>


<script lang="ts">
    import { onMount } from 'svelte';
    import { graph } from '@/data_structures/Graph/graph.ts';
    import { Vertex } from './vertex.ts';
    import { EDGE_STROKE_WIDTH, VERTEX_STATE } from '@/constants';
    import { toast } from 'svelte-sonner';
    import { showEdgeWeight } from './graph-controls.svelte';


    let viewBox: HTMLDivElement;
    onMount(() => {
        $viewBoxStore = viewBox;
        $graph.vertices.length = 0; // Clear existing vertices

        graph.generate();
    });

    let linking: boolean = false;
    const link_stack: SVGElement[] = [];

    function createEdgeLine(start: SVGElement, end: SVGElement) {
        let from = $graph.vertices.find(v => v.id == start.id);
        let to = $graph.vertices.find(v => v.id == end.id);

        if (from && to) {
            if (from.hasEdge(to)) {
                toast.error('Edge already exists!');
                linking = false;
                return;
            }

            $graph.addGraphEdge(from, to);
            $graph = $graph;
            toast.success('Edge created!');
        }
        linking = false;
        link_stack.pop();
        link_stack.pop();
    }

    function handleClick(e) {
        if (!linking || link_stack.length === 0) return;

        createEdgeLine(e.currentTarget, link_stack[0]);
    }

    function highlightEdges(A: Vertex<any>, B: Vertex<any>) {
        A.fill = VERTEX_STATE.WEIGHT_HOVER;
        B.fill = VERTEX_STATE.WEIGHT_HOVER;
        $graph = $graph;
    }

</script>

<div class="size-full" bind:this={viewBox} id="viewbox">
    {#if viewBox}
        <svg class="size-full p-5" width="100%" height="100%"
             viewBox={`0 0 ${viewBox.clientWidth} ${viewBox.clientHeight}`}>
            {#each $graph.vertices as vertex (vertex.id)}
                {#each vertex.edges as edge (edge.vertex.id)}
                    <g
                        on:mousemove={()=>highlightEdges(vertex, edge.vertex)}
                        on:mouseleave={() => {
                        vertex.fill = "white";
                        edge.vertex.fill = "white";
                    }}
                    >

                        <line
                        x1={vertex.pos.x}
                        y1={vertex.pos.y}
                        x2={edge.vertex.pos.x}
                        y2={edge.vertex.pos.y}
                        stroke="white"
                        stroke-width={EDGE_STROKE_WIDTH} />

                        {#if $showEdgeWeight}

                            {@const mid = {
                                x: (vertex.pos.x + edge.vertex.pos.x) / 2,
                                y: (vertex.pos.y + edge.vertex.pos.y) / 2
                            }}
                            <circle
                                cx={mid.x}
                                cy={mid.y}
                                r="15px"
                                fill={!edge.weight ? 'darkgray' : "black"}
                                stroke-width="1"
                                stroke={!edge.weight ? 'gray': "cyan"}
                            />

                            <text
                                {...mid}
                                text-anchor="middle"
                                alignment-baseline="middle"
                                fill={!edge.weight ? 'white' : "cyan"}
                                font-size="1rem"
                                class="select-none"
                            >{vertex.getEdgeWeight(edge.vertex)}</text>
                        {/if}
                    </g>
                {/each}
            {/each}
            {#each $graph.vertices as vertex}
                {#key vertex.fill}
                    <g
                        id={vertex.id}
                        on:click={handleClick}
                        on:dblclick={(e) => {
                            link_stack.push(e.currentTarget);
                            linking = true;
                            toast('Click on another vertex to link', );
                        }} style="cursor: auto;">
                        <circle
                            cx={vertex.pos.x}
                            cy={vertex.pos.y}
                            r={VERTEX_RADIUS}
                            fill={vertex.fill}
                            stroke={linking ? "red" : "black"}
                            stroke-width="3"
                        />
                        <text
                            x={vertex.pos.x}
                            y={vertex.pos.y}
                            text-anchor="middle"
                            alignment-baseline="middle"
                            dy=".1em"
                            fill="black"
                            font-size="1.5rem"
                            class="select-none"
                        >{vertex.data}</text>
                    </g>
                {/key}
            {/each}
        </svg>
    {/if}

</div>