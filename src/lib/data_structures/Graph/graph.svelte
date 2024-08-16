<script context="module" lang="ts">
    import type { Coords } from '@/data_structures/Graph/graph.ts';
    import { get } from 'svelte/store';

    export function distance(from: Coords, to: Coords) {
        return Math.sqrt(
            (from.x - to.x) ** 2 +
            (from.y - to.y) ** 2
        );
    }

    export function isFarEnough(pos: Coords): boolean {
        for (const vertex of get(graph).vertices) {
            if (distance(pos, vertex.pos) < GRAPH_MIN_DISTANCE_BETWEEN_VERTICES) {
                return false;
            }
        }
        return true;
    }
</script>


<script lang="ts">
    import { onMount } from 'svelte';
    import { graph, Vertex } from '@/data_structures/Graph/graph.ts';
    import {
        GRAPH_MIN_DISTANCE_BETWEEN_VERTICES,
        VERTEX_RADIUS,
        GRAPH_VIEWBOX_PADDING
    } from '@/constants';


    let viewBox: HTMLDivElement;
    onMount(init);

    function init() {
        const height = viewBox.clientHeight - 2 * GRAPH_VIEWBOX_PADDING;
        const width = viewBox.clientWidth - 2 * GRAPH_VIEWBOX_PADDING;

        $graph.vertices.length = 0; // Clear existing vertices
        for (let i = 0; i < 5; i++) {
            let coords: Coords = { x: 0, y: 0 };

            do {
                coords.x = Math.random() * width + GRAPH_VIEWBOX_PADDING;
                coords.y = Math.random() * height + GRAPH_VIEWBOX_PADDING;
            } while (!isFarEnough(coords));
            $graph.vertices.push(new Vertex<number>(i, coords));
        }

        //create the edges
        for (let i = 0; i < $graph.vertices.length; i++) {
            for (let j = i + 1; j < $graph.vertices.length; j++) {
                if (Math.random() < 0.5) {
                    $graph.addEdge($graph.vertices[i], $graph.vertices[j]);
                }
            }
        }
    }

    let linking: boolean = false;
    const link_stack: SVGElement[] = [];

    function link(start: SVGElement, end: SVGElement) {
        let from = $graph.vertices.find(v => v.id == start.id);
        let to = $graph.vertices.find(v => v.id == end.id);

        if (from && to) {
            if (from.hasNeighbor(to) || to.hasNeighbor(from)) {
                return;
            }

            $graph.addEdge(from, to);
            $graph = $graph;
        }

        linking = false;

        link_stack.pop();
        link_stack.pop();
    }

    function handleClick(e) {
        if (!linking) return;
        if (link_stack.length === 0) return;

        link(e.currentTarget, link_stack[0]);
    }

</script>

<div class="size-full" bind:this={viewBox} id="viewbox">
    {#if viewBox}
        <svg class="size-full p-5" width="100%" height="100%"
             viewBox={`0 0 ${viewBox.clientWidth} ${viewBox.clientHeight}`}>
            {#each $graph.vertices as vertex}
                {#each vertex.neighbors as neighbor}
                    <line
                        x1={vertex.pos.x}
                        y1={vertex.pos.y}
                        x2={neighbor.pos.x}
                        y2={neighbor.pos.y}
                        stroke="white"
                        stroke-width="1"
                    />
                {/each}
            {/each}
            {#each $graph.vertices as vertex}

                <g
                    id={vertex.id}
                    on:click={handleClick}
                    on:dblclick={(e) => {
                        link_stack.push(e.currentTarget);
                        linking = true;
                    }} style="cursor: auto;">
                    <circle
                        cx={vertex.pos.x}
                        cy={vertex.pos.y}
                        r={VERTEX_RADIUS}
                        fill="white"
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
            {/each}
        </svg>
    {/if}

</div>
