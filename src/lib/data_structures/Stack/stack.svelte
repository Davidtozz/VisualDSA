<script lang="ts">
    import { Canvas, Layer, type Render } from 'svelte-canvas';
    import { stack } from './stack.svelte.ts';
    import { onMount } from 'svelte';


    onMount(() => {
        stack.randomize();
    });

    function drawSlotBg(context: CanvasRenderingContext2D, x: number, innerY: number, w: number, innerH: number) {
        context.beginPath();
        context.rect(x, innerY, w, innerH);
        context.fillStyle = '#0f172a'; // dark bg
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = 'white';
        context.stroke();
    }

    function fillSlot(valueIndex: number, context: CanvasRenderingContext2D, x: number, innerY: number, w: number, innerH: number) {
        if (stack.bars[valueIndex]) {
            // draw inner pill
            const padding = 6;
            context.beginPath();
            context.rect(x + padding, innerY + padding / 2, w - padding * 2, innerH - padding);
            context.fillStyle = 'white';
            context.fill();
            context.strokeStyle = '#0b1220';
            context.stroke();

            // draw text centered
            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            const fontSize = Math.max(12, innerH * 0.5);
            context.font = `${fontSize}px system-ui`;
            if (valueIndex === 0) {
                context.fillStyle = '#ef4444'; // red for top of stack
                context.fillText('Top: ' + String(stack.bars[valueIndex]), x + w / 2, innerY + innerH / 2);
            } else {
                context.fillText(String(stack.bars[valueIndex]), x + w / 2, innerY + innerH / 2);
            }
        }
    }

    let render: Render = $derived(({ context, width, height }) => {
        context.clearRect(0, 0, width, height);

        const slotHeight = height / Math.max(1, stack.capacity);
        const slotPadding = Math.min(8, slotHeight * 0.12);

        for (let slot = 0; slot < stack.capacity; slot++) {
            const y = height - (slot + 1) * slotHeight;
            const x = 8;
            const w = Math.max(32, width - 16);
            const innerY = y + slotPadding;
            const innerH = Math.max(4, slotHeight - slotPadding * 2);

            drawSlotBg(context, x, innerY, w, innerH);

            const valueIndex = stack.bars.length - 1 - slot; // last element = top
            fillSlot(valueIndex, context, x, innerY, w, innerH);
        }
    });
</script>

<Canvas layerEvents>
    <Layer {render} />
</Canvas>
