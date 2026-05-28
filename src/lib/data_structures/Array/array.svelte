<script lang="ts">
    import { Canvas, Layer, type Render } from "svelte-canvas";
    import { array, arrayAccess, sortedUpTo } from '$lib/data_structures/Array/array.svelte.ts';
    import { clearCanvas } from '@/visualizer/canvas-utils';

    // --- Helpers ---

    function getMaxValue(values: number[]): number {
        let max = values[0] ?? 1;
        for (let i = 1; i < values.length; i++) {
            if (values[i] > max) max = values[i];
        }
        return max === 0 ? 1 : max;
    }

    function getBarColor(index: number, currentAccess: number | number[], sortedLimit: number): string {
        // Handle both single index and multiple indices (for swaps)
        const indices = Array.isArray(currentAccess) ? currentAccess : [currentAccess];
        if (indices.includes(index)) return 'red';
        if (index < sortedLimit) return '#22c55e';
        return 'white';
    }

    // Render Strategies
    function drawStandard(
        ctx: CanvasRenderingContext2D,
        values: number[], maxVal: number,
        width: number, height: number
    ) {
        const len = values.length;
        const barWidth = width / len;
        const widthCeil = Math.max(1, Math.ceil(barWidth));

        for (let i = 0; i < len; i++) {
            const barHeight = (values[i] / maxVal) * height;
            ctx.fillStyle = getBarColor(i, arrayAccess.value, sortedUpTo.value);
            ctx.fillRect(i * barWidth, height - barHeight, widthCeil, barHeight);
        }
    }

    function drawDownsampled(
        ctx: CanvasRenderingContext2D,
        values: number[], maxVal: number,
        width: number, height: number
    ) {
        const len = values.length;
        const cols = Math.min(Math.max(1, Math.floor(width)), len);
        const step = Math.ceil(len / cols);
        const colWidth = width / cols;
        const widthCeil = Math.max(1, Math.ceil(colWidth));

        for (let col = 0; col < cols; col++) {
            const start = col * step;
            const end = Math.min(start + step, len);

            let bucketMax = 0;
            let hasActiveAccess = false;

            for (let k = start; k < end; k++) {
                if (values[k] > bucketMax) bucketMax = values[k];
                if (k === arrayAccess.value) hasActiveAccess = true;
            }

            const barHeight = (bucketMax / maxVal) * height;

            if (hasActiveAccess) {
                ctx.fillStyle = 'red';
            } else if (start < sortedUpTo.value) {
                ctx.fillStyle = '#22c55e';
            } else {
                ctx.fillStyle = 'white';
            }

            ctx.fillRect(col * colWidth, height - barHeight, widthCeil, barHeight);
        }
    }
    
    let renderArray: Render = $derived(({ context, width, height }) => {
        clearCanvas(context, width, height);

        const values = array.value;
        if (values.length === 0) return;

        const maxVal = getMaxValue(values);
        const sampleThreshold = Math.max(1, Math.floor(width)) * 2;

        if (values.length <= sampleThreshold) {
            drawStandard(context, values, maxVal, width, height);
        } else {
            drawDownsampled(context, values, maxVal, width, height);
        }
    });
</script>

<Canvas layerEvents>
    <Layer render={renderArray} />
</Canvas>