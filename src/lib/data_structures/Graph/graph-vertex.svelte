<script lang="ts">
   import { createBubbler } from 'svelte/legacy';

   const bubble = createBubbler();
   import type { Vertex } from '$lib/data_structures/Graph/vertex.svelte.ts';
    import { createEventDispatcher } from 'svelte';
    import { VERTEX_RADIUS } from '@/constants.ts';

    const dispatch = createEventDispatcher();
   interface Props {
      vertex: Vertex<unknown>;
      linkState: boolean;
   }

   let { vertex = $bindable(), linkState = $bindable() }: Props = $props();
    let fill = $derived(vertex.fill);

    let isDragging = $state(false);
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
        }
    }

    function handleMouseUp() {
        isDragging = false;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }
</script>

<g id={vertex.id}
   onclick={() => dispatch('click', { vertex })}
   ondblclick={bubble('dblclick')}
   onmousedown={handleMouseDown}
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