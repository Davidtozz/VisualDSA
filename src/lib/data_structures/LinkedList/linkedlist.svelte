<script lang="ts">
    import { Canvas, Layer, type Render } from "svelte-canvas";
    import { LinkedList, ListNode, linkedlist } from "./linkedlist";
    import Node from "./listnode.svelte";
    import { beforeUpdate, createEventDispatcher, onDestroy, onMount } from "svelte";
    import { DISTANCE_BETWEEN_NODES, NODE_RADIUS } from '@/constants';
    import * as ContextMenu from '@shadcn/context-menu'
    import { delay } from '@/utils';

    let nodes: ListNode<number>[] = [];

    linkedlist.subscribe(callback => {
        nodes = $linkedlist.toNodesArray();
    })

    onMount(() => {
        linkedlist.reset();
        linkedlist.randomize();
        nodes = $linkedlist.toNodesArray();
    });
    
    let render: Render
    $: render = ({ context, width, height }) => {
        const offsetY = height / 2 + 5;
        context.beginPath();
        context.strokeStyle = 'white';
        context.lineWidth = 2;

        nodes.forEach((_, i) => {
            if (i < nodes.length - 1) {
                const startX = 50 + (i * DISTANCE_BETWEEN_NODES) + NODE_RADIUS;
                const endX = startX + DISTANCE_BETWEEN_NODES - (NODE_RADIUS * 2);
                context.moveTo(startX, offsetY);
                context.lineTo(endX, offsetY);
            }
        });
        context.stroke();


    };

    onDestroy(() => {
        linkedlist.reset();
        $linkedlist = $linkedlist;
    })
    



</script>

<Canvas autoplay layerEvents>
    {#each nodes as node, i (i)}
        <Node value={node.data} index={i} on:removed={(e) => alert("Removed node at "+e.detail.index)}  />
    {/each}
    <Layer {render} />
</Canvas>        
