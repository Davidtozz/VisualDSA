<script lang="ts">
    import type { Vertex } from '@/data_structures/Graph/vertex.ts';
    import { createEventDispatcher } from 'svelte';
    import { VERTEX_RADIUS } from '@/constants.ts';
    import { graph } from './graph';

    const dispatch = createEventDispatcher();
    export let vertex: Vertex<unknown>;
    export let linkState: boolean;
    $: fill = vertex.fill;

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    function handleMouseDown(e) {
        isDragging = true;
        startX = e.clientX - vertex.pos.x;
        startY = e.clientY - vertex.pos.y;
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseMove(e) {
        if (isDragging) {
            vertex.pos.x = e.clientX - startX;
            vertex.pos.y = e.clientY - startY;
            $graph = $graph;
        }
    }

    function handleMouseUp() {
        isDragging = false;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }
</script>

<g id={vertex.id}
   on:click={() => dispatch('click', { vertex })}
   on:dblclick
   on:mousedown={handleMouseDown}
   pointer-events="all"
   class:cursor-move={isDragging}
>
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