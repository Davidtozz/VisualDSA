<script lang="ts">
    import { Canvas, Layer, type Render } from "svelte-canvas";
    import { linkedlist, randomize, reset } from './linkedlist.svelte.ts';
    import { onDestroy, onMount } from 'svelte';
    import { DISTANCE_BETWEEN_NODES, NODE_RADIUS } from '@/constants';

    let nodes = $derived.by(() => linkedlist.value.toNodesArray());

    onMount(() => {
        reset();
        randomize();
        nodes = linkedlist.value.toNodesArray();
    });
    
    let render: Render = $derived(({ context, width, height }) => {
        context.clearRect(0, 0, width, height);

        const offsetY = height / 2 + 5;
        if (nodes.length === 0) return;

        context.beginPath();
        context.strokeStyle = 'white';
        context.lineWidth = 2;

        nodes.forEach((_, i) => {
            if (i < linkedlist.value.length - 1) {
                const startX = 50 + (i * DISTANCE_BETWEEN_NODES) + NODE_RADIUS;
                const endX = startX + DISTANCE_BETWEEN_NODES - (NODE_RADIUS * 2);
                context.moveTo(startX, offsetY);
                context.lineTo(endX, offsetY);
            }
        });
        context.stroke();

        nodes.forEach((node, i) => {
            const offsetX = 50 + (i * DISTANCE_BETWEEN_NODES);
            context.beginPath();
            context.arc(offsetX, offsetY, NODE_RADIUS, 0, 2 * Math.PI);
            context.fillStyle = 'white';
            context.fill();
            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.font = '20px system-ui';
            context.fillText(node.data.toString(), offsetX, offsetY);
            context.closePath();
        });
    })

    onDestroy(() => {
        reset();
    })
</script>

<Canvas autoplay layerEvents>
    <Layer {render} />
</Canvas>        
