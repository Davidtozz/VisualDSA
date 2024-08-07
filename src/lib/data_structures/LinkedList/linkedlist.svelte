<script lang="ts">
    import { Canvas, Layer, type Render } from "svelte-canvas";
    import { LinkedList, ListNode, linkedlist } from "./linkedlist";
    import Node from "./listnode.svelte";
    import { beforeUpdate, createEventDispatcher, onDestroy, onMount } from "svelte";
    import { DISTANCE_BETWEEN_NODES } from "@/constants";
    import * as ContextMenu from '@shadcn/context-menu'

    let nodes: ListNode<number>[] = [];

    let distanceBetweenNodes;

    linkedlist.subscribe(callback => {
        nodes = $linkedlist.toNodesArray();
    })

    onMount(() => {
        linkedlist.reset();
        linkedlist.randomize();
        nodes = $linkedlist.toNodesArray();
    });
    
    let render: Render
    $: render = ({context, width, height}) => {
        
        context.beginPath();
        context.strokeStyle = 'white';

        const radius = 30;
        const offsetY = height / 2;

        for (let i = 0; i < nodes.length; i++) {
            const offsetX = 50 + (i * DISTANCE_BETWEEN_NODES); // Calculate offsetX based on index
            context.moveTo(offsetX + radius, offsetY);
            context.arc(offsetX, offsetY, radius, 0, 2 * Math.PI);
            context.moveTo(offsetX + radius, offsetY);
            context.lineTo(offsetX + DISTANCE_BETWEEN_NODES, offsetY);
        }

    }

    onDestroy(() => {
        linkedlist.reset();
        $linkedlist = $linkedlist;
    })
    

    function showToast() {

    }

</script>

<Canvas autoplay layerEvents>
    {#each nodes as node, i (i)}
        <Node value={node.data} index={i} on:removed={(e) => alert("Removed node at "+e.detail.index)}  />
        <Layer render={render} />
    {/each}
</Canvas>        
