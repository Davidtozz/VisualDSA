<script context="module" lang="ts">
    import { get, writable } from 'svelte/store';
    import { GRAPH_MIN_DISTANCE_BETWEEN_VERTICES, GRAPH_VIEWBOX_PADDING } from '@/constants.ts';


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
    import GraphVertex from './graph-vertex.svelte';
    import GraphEdge from './graph-edge.svelte';
    import { toast } from 'svelte-sonner';
    import * as ContextMenu from '@shadcn/context-menu';
    import { CirclePlus } from 'lucide-svelte';
    import { randomNumber } from '@/utils.ts';

    let viewBox: HTMLDivElement;
    onMount(() => {
        $viewBoxStore = viewBox;
        $graph.vertices.length = 0; // Clear existing vertices

        graph.generate();
    });

    let linking: boolean = false;
    const link_stack: Vertex<number>[] = [];

    function createEdgeLine(start: Vertex<number>, end: Vertex<number>) {

        const result = $graph.addGraphEdge(start, end);
        if (!result) {
            toast.error('Edge already exists!');
            linking = false;
            return;
        }
        $graph = $graph;
        toast.success('Edge created!');

        linking = false;
        link_stack.length = 0;
    }
</script>
<div class="size-full" bind:this={viewBox} id="viewbox">
    {#if viewBox}
        <ContextMenu.Root>
            <ContextMenu.Trigger>
                <svg class="size-full p-5" width="100%" height="100%"
                     viewBox={`0 0 ${viewBox.clientWidth} ${viewBox.clientHeight}`}>
                    {#each $graph.vertices as vertex}
                        {#each vertex.edges as edge}
                            <GraphEdge
                                start={vertex}
                                end={edge.vertex}
                                weight={edge.weight}
                            />
                        {/each}
                    {/each}
                    {#each $graph.vertices as vertex}
                        <GraphVertex
                            {vertex}
                            on:click={(e) => linking && createEdgeLine(e.detail.vertex, link_stack[0])}
                            on:dblclick={() => {
                                     linking = true;
                                     link_stack.push(vertex)
                                }}
                            bind:linkState={linking}
                        />
                    {/each}
                </svg>
            </ContextMenu.Trigger>
            <!-- Test -->
            <ContextMenu.Content>

                <ContextMenu.Item class="gap-2 items-center">
                    <CirclePlus />
                    <button class="text-end p-2"
                            on:click={() => $graph.addVertex(new Vertex(randomNumber(0,100), computeCoords()))}>
                        Generate Vertex
                    </button>
                    <ContextMenu.Shortcut></ContextMenu.Shortcut>
                </ContextMenu.Item>
            </ContextMenu.Content>
        </ContextMenu.Root>
    {/if}
</div>
