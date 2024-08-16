<script lang="ts">
    import { type Coords, graph, Vertex } from '@/data_structures/Graph/graph.ts';
    import { CirclePlus } from 'lucide-svelte';
    import { GRAPH_VIEWBOX_PADDING } from '@/constants.js';
    import { isFarEnough } from '@/data_structures/Graph/graph.svelte';


    function addVertex() {
        const viewbox: HTMLDivElement = document.getElementById('viewbox')!;

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

    function dfs() {
        alert('Not implemented');
    }

</script>

<div class="flex flex-1 text-white">
    <button
        class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2 select-none"
        on:click={addVertex}
    >
        <CirclePlus />
        <pre>graph.addVertex()</pre>
    </button>

    <!--<button
        class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2 select-none"
        on:click={dfs}>
        <Search />
        <pre>graph.dfs()</pre>
    </button>-->
</div>