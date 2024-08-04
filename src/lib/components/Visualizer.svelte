<script lang="ts">
    import { dsaStore, arrayAccess, arrayStore } from '$lib/stores';
    import { Canvas, Layer, type Render } from 'svelte-canvas';
    import { LinkedList, ListNode } from '$lib/data_structures/linkedlist';
    import { isSortingAlgorithm, isDataStructure } from '@/utils';
    import { createEventDispatcher } from 'svelte';


    function renderArray(context, width, height) {
        context.clearRect(0, 0, width, height);
        context.fillStyle = 'white';
        for (const [index, element] of $arrayStore.entries()) {
            const barHeight = (element / Math.max(...$arrayStore)) * height;
            const offsetX = index * (width / $arrayStore.length);
            const offsetY = height - barHeight;
            const barWidth = width / $arrayStore.length + 1;

            if (index === $arrayAccess) {
                context.fillStyle = 'red';
            } else {
                context.fillStyle = 'white';
            }
            context.fillRect(offsetX, offsetY, barWidth, barHeight);
        }
    }

    function renderLinkedList(context, width, height) {
        //cleanup
        context.clearRect(0, 0, width, height);

        const radius = 20;
        let offsetX = 50;
        const offsetY = height / 2 + 5;
        const spacing = 100;

        const list = new LinkedList<number>();

        // seed 
        for(let i = 0; i < 5; i++) {
            list.append(i);
        }

        let temp = list.head;
        let previousX: number | null = null;

        function drawArrowhead(context: CanvasRenderingContext2D, fromX, fromY, toX, toY) {
            const headLength = 20; // length of head in pixels
            const dx = toX - fromX;
            const dy = toY - fromY;
            const angle = Math.atan2(dy, dx);
            context.strokeStyle = 'white';
            context.beginPath();
            context.moveTo(toX, toY);
            context.lineTo(
                toX - headLength * Math.cos(angle - Math.PI / 6),
                toY - headLength * Math.sin(angle - Math.PI / 6)
            );
            context.moveTo(toX, toY);
            context.lineTo(
                toX - headLength * Math.cos(angle + Math.PI / 6),
                toY - headLength * Math.sin(angle + Math.PI / 6)
            );
            context.stroke();
        }

        while (temp !== null) {
            context.beginPath();
            context.arc(offsetX, offsetY, radius, 0, 2 * Math.PI);
            context.fillStyle = 'white';
            context.fill();
            context.strokeStyle = 'white';
            context.lineWidth = 5;
            context.stroke();

            context.font = '20px Arial';
            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.fillText(String(temp.data), offsetX, offsetY);

            if (previousX !== null) {
                context.beginPath();
                context.moveTo(previousX + radius, offsetY);
                context.lineTo(offsetX - radius, offsetY);
                context.stroke();
                drawArrowhead(context, previousX + radius, offsetY, offsetX - radius, offsetY);
            }

            previousX = offsetX;
            offsetX += spacing;
            temp = temp.next;
        }
    }

    let render: Render;
    $: render = ({ context, width, height }) => {
        if (isSortingAlgorithm($dsaStore)) renderArray(context, width, height);
        else renderLinkedList(context, width, height);
    }, isSortingAlgorithm($dsaStore);

    let className = '';
    export { className as class };
</script>

<section class={className}>
    <Canvas layerEvents>
        <Layer {render} />
    </Canvas>
</section>