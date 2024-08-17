<script context="module" lang="ts">
    import { get } from 'svelte/store';
    import { GRAPH_MIN_DISTANCE_BETWEEN_VERTICES } from '@/constants.ts';


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

    /* export function overlapsEdge(pos: Coords): boolean {
        //
        // reference: https://math.stackexchange.com/questions/275529/check-if-line-intersects-with-circles-perimeter
    } */
</script>


<script lang="ts">
    import { onMount } from 'svelte';
    import { graph } from '@/data_structures/Graph/graph.ts';
    import { weight } from './graph-controls.svelte';
    import { Vertex } from './vertex.ts';

    import {
        VERTEX_RADIUS,
        GRAPH_VIEWBOX_PADDING,
        DEFAULT_VERTICES_AMOUNT
    } from '@/constants';


    let viewBox: HTMLDivElement;
    onMount(init);

    function init() {
        const height = viewBox.clientHeight - 2 * GRAPH_VIEWBOX_PADDING;
        const width = viewBox.clientWidth - 2 * GRAPH_VIEWBOX_PADDING;

        $graph.vertices.length = 0; // Clear existing vertices
        for (let i = 0; i < DEFAULT_VERTICES_AMOUNT; i++) {
            let coords: Coords = { x: 0, y: 0 };

            do {
                coords.x = Math.random() * width + GRAPH_VIEWBOX_PADDING;
                coords.y = Math.random() * height + GRAPH_VIEWBOX_PADDING;
            } while (!isFarEnough(coords));
            $graph.addVertex(new Vertex<number>(i, coords));
        }

        //create the edges
        for (let i = 0; i < $graph.vertices.length; i++) {
            for (let j = i + 1; j < $graph.vertices.length; j++) {

                if ($graph.vertices[i].neighbors.length > 1) break;

                if (Math.random() < 0.5) {
                    $graph.addEdge($graph.vertices[i], $graph.vertices[j]);
                }
            }
        }
    }

    let linking: boolean = false;
    const link_stack: SVGElement[] = [];

    function createEdge(start: SVGElement, end: SVGElement) {
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
        if (!linking || link_stack.length === 0) return;

        createEdge(e.currentTarget, link_stack[0]);
    }

</script>

<div class="size-full" bind:this={viewBox} id="viewbox">
    {#if viewBox}
        <svg class="size-full p-5" width="100%" height="100%"
             viewBox={`0 0 ${viewBox.clientWidth} ${viewBox.clientHeight}`}>
            {#each $graph.vertices as vertex}
                {#each vertex.neighbors as neighbor}
                    <g>

                        <line
                        x1={vertex.pos.x}
                        y1={vertex.pos.y}
                        x2={neighbor.pos.x}
                        y2={neighbor.pos.y}
                        stroke="white"
                        stroke-width="1" />
                        <!-- yet to implement -->
                        <!--{#if $weight}
                            {@const mid = {
                                x: (vertex.pos.x + neighbor.pos.x) / 2,
                                y: (vertex.pos.y + neighbor.pos.y) / 2
                            }}
                            <circle
                                cx={mid.x}
                                cy={mid.y}
                                r="20px"
                                fill="black"
                                stroke-width="1"
                                stroke="cyan"
                            />

                            <text
                                {...mid}
                                text-anchor="middle"
                                alignment-baseline="middle"
                                fill="cyan"
                                font-size="1rem"
                                class="select-none"
                            >{vertex.getEdgeWeight(neighbor)}</text>
                        {/if}-->
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
                        }} style="cursor: auto;">
                        <circle
                            cx={vertex.pos.x}
                            cy={vertex.pos.y}
                            r={VERTEX_RADIUS}
                            fill={vertex.fill ? vertex.fill : "white"}
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


<style>
    .visited {
        fill: #f00;
    }

    .visited > text {
        fill: #fff;
    }
</style>