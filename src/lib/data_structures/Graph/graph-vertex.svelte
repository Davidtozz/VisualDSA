<script lang="ts">
    import type { Vertex } from '@/data_structures/Graph/vertex.ts';
    import { createEventDispatcher } from 'svelte';
    import { VERTEX_RADIUS } from '@/constants.ts';

    const dispatch = createEventDispatcher();
    export let vertex: Vertex<unknown>;
    export let linkState: boolean;
    $: fill = vertex.fill;
</script>

<g id={vertex.id}
   on:click={() => dispatch('click', { vertex })}
   on:dblclick
   style="cursor: auto;">
    <circle
        cx={vertex.pos.x}
        cy={vertex.pos.y}
        r={VERTEX_RADIUS}
        {fill}
        stroke={linkState ? "red" : "black"}
        stroke-width="3" />
    <text
        x={vertex.pos.x}
        y={vertex.pos.y}
        text-anchor="middle"
        alignment-baseline="middle"
        dy=".1em"
        fill="black"
        font-size="1.5rem"
        class="select-none">{vertex.data}</text>
</g>