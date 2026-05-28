<script lang="ts">
    import { Canvas, Layer, type Render } from "svelte-canvas";
    import { linkedlist, randomize, reset } from './linkedlist.svelte.ts';
    import { onDestroy, onMount } from 'svelte';
    import { DISTANCE_BETWEEN_NODES, NODE_RADIUS } from '@/constants';
    import { clearCanvas, drawEdge, drawNode } from '@/visualizer/canvas-utils';

    let nodes = $derived.by(() => linkedlist.value.toNodesArray());

    onMount(() => {
        reset();
        randomize();
        nodes = linkedlist.value.toNodesArray();
    });
    
    let render: Render = $derived(({ context, width, height }) => {
        clearCanvas(context, width, height);

        const offsetY = height / 2 + 5;
        if (nodes.length === 0) return;

        context.beginPath();
        nodes.forEach((_, i) => {
            if (i < linkedlist.value.length - 1) {
                const startX = 50 + (i * DISTANCE_BETWEEN_NODES) + NODE_RADIUS;
                const endX = startX + DISTANCE_BETWEEN_NODES - (NODE_RADIUS * 2);
                drawEdge(context, startX, offsetY, endX, offsetY, {
                    strokeStyle: 'white',
                    lineWidth: 2,
                    lineCap: 'round'
                });
            }
        });

        nodes.forEach((node, i) => {
            const offsetX = 50 + (i * DISTANCE_BETWEEN_NODES);
            drawNode(context, offsetX, offsetY, node.data.toString(), {
                radius: NODE_RADIUS,
                nodeFillStyle: 'white',
                strokeStyle: 'white',
                lineWidth: 2,
                font: '20px system-ui',
                textFillStyle: 'black'
            });
        });
    })

    onDestroy(() => {
        reset();
    })
</script>

<Canvas autoplay layerEvents>
    <Layer {render} />
</Canvas>        
