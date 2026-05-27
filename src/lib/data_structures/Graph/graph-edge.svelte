<script lang="ts">
    import { EDGE_STROKE_WIDTH } from '@/constants.js';
    import type { Vertex } from '$lib/data_structures/Graph/vertex.svelte.ts';
    import { showEdgeWeight } from './graph-controls.svelte';

    interface Props {
        start: Vertex<unknown>;
        end: Vertex<unknown>;
        weight: number | undefined;
    }

    let { start = $bindable(), end = $bindable(), weight }: Props = $props();

</script>
<g role="presentation">

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