<script lang="ts">
    import { onMount } from 'svelte';
    import { graph, setViewBox, computeCoords, generate } from '@/data_structures/Graph/graph.svelte.ts';
    import { Vertex } from './vertex.svelte.ts';
    import GraphVertex from './graph-vertex.svelte';
    import GraphEdge from './graph-edge.svelte';
    import { toast } from 'svelte-sonner';
    import { CirclePlus } from 'lucide-svelte';

    import { randomNumber } from '$lib/utils.js';

    let viewBox: HTMLDivElement | undefined = $state();
    let vertices = $derived(graph.vertices);

    onMount(() => {
        if (viewBox) setViewBox(viewBox);
        generate();
    });

    let linking: boolean = $state(false);
    const link_stack: Vertex<number>[] = $state([]);

    function createEdgeLine(start: Vertex<number>, end: Vertex<number>) {
        const result = graph.addGraphEdge(start, end);
        if (!result) {
            toast.error('Edge already exists!');
            linking = false;
            return;
        }
        toast.success('Edge created!');

        linking = false;
        link_stack.length = 0;
    }
</script>
<div class="size-full" bind:this={viewBox} id="viewbox">
    {#if viewBox}
        <svg class="size-full p-5" width="100%" height="100%"
             viewBox={`0 0 ${viewBox.clientWidth} ${viewBox.clientHeight}`}>
            {#each vertices as vertex}
                {#each vertex.edges as edge}
                    <GraphEdge start={vertex} end={edge.vertex} weight={edge.weight} />
                {/each}
            {/each}
            {#each vertices as vertex}
                <GraphVertex
                    {vertex}
                    on:click={(e) => linking && createEdgeLine(e.detail.vertex, link_stack[0])}
                    on:dblclick={() => {
                        linking = true;
                        link_stack.push(vertex);
                    }}
                    bind:linkState={linking}
                />
            {/each}
        </svg>
        <!-- Test -->
        <CirclePlus />
        <button class="text-end p-2"
                onclick={() => graph.addVertex(new Vertex(randomNumber(0,100), computeCoords()))}>
            Generate Vertex
        </button>
    {/if}
</div>
