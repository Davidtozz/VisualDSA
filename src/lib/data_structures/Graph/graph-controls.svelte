<script context="module" lang="ts">
    import { writable } from 'svelte/store';

    export const weight = writable<boolean>(false);
</script>


<script lang="ts">
    import { Vertex } from './vertex';
    import { graph } from '@/data_structures/Graph/graph.ts';
    import { CirclePlus, Search } from 'lucide-svelte';
    import { GRAPH_VIEWBOX_PADDING, VERTEX_STATE } from '@/constants.js';
    import { isFarEnough } from '@/data_structures/Graph/graph.svelte';
    import { Switch } from '@shadcn/switch';


    function addVertex() {
        const viewbox: HTMLDivElement = <HTMLDivElement>document.getElementById('viewbox')!;

        const height = viewbox?.clientHeight - 2 * GRAPH_VIEWBOX_PADDING;
        const width = viewbox?.clientWidth - 2 * GRAPH_VIEWBOX_PADDING;


        let value = Number(prompt('Vertex value: '));

        if (value) {
            let coords: Coords = { x: 0, y: 0 };

            do {
                coords.x = Math.random() * width + GRAPH_VIEWBOX_PADDING;
                coords.y = Math.random() * height + GRAPH_VIEWBOX_PADDING;
            } while (!isFarEnough(coords));

            $graph.addVertex(
                new Vertex(value, coords)
            );
            $graph = $graph;
        }


    }


    let dfs_running = false;
    let bfs_running = false;

    async function traverse(strategy: 'BFS' | 'DFS') {
        const startingVertexId = prompt('Value of starting vertex: ');
        const vertex = $graph.vertices.find(v => v.data === Number(startingVertexId));

        if (vertex) {
            switch (strategy) {
                case 'BFS':
                    bfs_running = true;
                    await $graph.bfs(vertex);
                    bfs_running = false;
                    break;
                case 'DFS':
                    dfs_running = true;
                    await $graph.dfs(vertex);
                    dfs_running = false;
                    break;
            }
            /* restore default state */
            $graph.vertices.forEach(v => {
                v.fill = VERTEX_STATE.UNVISITED;
            });
            $graph = $graph;

            alert(strategy + ' traversal completed');
        } else alert('Vertex doesn\'t exist');
    }


    const GRAPH_CONTROLS = [
        {
            name: 'addVertex',
            label: 'graph.addVertex()',
            icon: CirclePlus,
            parentHtmlTag: 'button',
            action: addVertex
        },
        {
            name: 'addEdge',
            label: 'graph.addEdge()',
            icon: CirclePlus,
            action: () => alert('Double click on a vertex to start linking')
        },
        {
            name: 'bfs',
            label: 'graph.bfs()',
            icon: Search,
            parentHtmlTag: 'button',
            action: async () => await traverse('BFS')

        },
        {
            name: 'dfs',
            label: 'graph.dfs()',
            icon: Search,
            parentHtmlTag: 'button',
            action: async () => await traverse('DFS')
        }
    ];

</script>

<div class="flex flex-1 text-white p-4 bg-primary gap-1">
    {#each GRAPH_CONTROLS as { label, icon, action }}
    <button
        class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2 select-none"
        on:click={action}
    >
        <svelte:component this={icon} />
        <pre>{label}</pre>
    </button>
    {/each}

    <!-- yet to implement -->
    <!--<div
        class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1  border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2 select-none">
        Weighted:
        <Switch bind:checked={$weight} />
    </div>-->

</div>