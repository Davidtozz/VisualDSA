<script lang="ts">
    import { Canvas, Layer, type Render } from 'svelte-canvas';
    import { stack } from './stack.svelte.ts';
    import { onMount } from 'svelte';
    import { clearCanvas, drawCenteredText, drawRoundedRect } from '@/visualizer/canvas-utils';

    onMount(() => {
        stack.randomize();
    });

    function drawSlotBg(context: CanvasRenderingContext2D, x: number, innerY: number, w: number, innerH: number) {
        drawRoundedRect(context, x, innerY, w, innerH, 4, {
            fillStyle: '#0f172a',
            strokeStyle: 'white',
            lineWidth: 2
        });
    }

    function fillSlot(valueIndex: number, context: CanvasRenderingContext2D, x: number, innerY: number, w: number, innerH: number) {
        if (valueIndex >= 0) {
            const padding = 6;
            drawRoundedRect(context, x + padding, innerY + padding / 2, w - padding * 2, innerH - padding, 4, {
                fillStyle: 'white',
                strokeStyle: '#0b1220',
                lineWidth: 1
            });

            const fontSize = Math.max(12, innerH * 0.5);
            if (valueIndex === 0) {
                drawCenteredText(context, 'Top: ' + String(stack.bars[valueIndex]), x + w / 2, innerY + innerH / 2, {
                    font: `${fontSize}px system-ui`,
                    fillStyle: '#ef4444'
                });
            } else {
                drawCenteredText(context, String(stack.bars[valueIndex]), x + w / 2, innerY + innerH / 2, {
                    font: `${fontSize}px system-ui`,
                    fillStyle: 'black'
                });
            }
        }
    }

    let render: Render = $derived(({ context, width, height }) => {
        clearCanvas(context, width, height);

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
