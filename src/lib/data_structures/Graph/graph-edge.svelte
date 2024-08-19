<script lang="ts">
    import { EDGE_STROKE_WIDTH, VERTEX_STATE } from '@/constants.js';
    import { Vertex } from '@/data_structures/Graph/vertex.js';
    import { showEdgeWeight } from './graph-controls.svelte';
    import { graph } from '@/data_structures/Graph/graph.ts';

    export let start: Vertex<unknown>;
    export let end: Vertex<unknown>;
    export let weight: number | undefined;

    function highlightEdges() {
        start.fill = VERTEX_STATE.WEIGHT_HOVER;
        end.fill = VERTEX_STATE.WEIGHT_HOVER;
        $graph = $graph;
    }

</script>
<g
    on:mousemove={highlightEdges}
    on:mouseleave={() => {
        start.fill = "white";
        end.fill = "white";
        $graph = $graph;
    }}
>

    <line
        x1={start.pos.x}
        y1={start.pos.y}
        x2={end.pos.x}
        y2={end.pos.y}
        stroke="white"
        stroke-width={EDGE_STROKE_WIDTH} />

    {#if $showEdgeWeight}

        {@const center = {
            x: (start.pos.x + end.pos.x) / 2,
            y: (start.pos.y + end.pos.y) / 2
        }}
        <circle
            cx={center.x}
            cy={center.y}
            r="15px"
            fill={!weight ? 'darkgray' : "black"}
            stroke-width="1"
            stroke={!weight ? 'gray': "cyan"}
        />

        <text
            {...center}
            text-anchor="middle"
            alignment-baseline="middle"
            fill={!weight ? 'white' : "cyan"}
            font-size="1rem"
            class="select-none"
        >{weight}</text>
    {/if}
</g>