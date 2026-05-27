<script lang="ts">
    import { Canvas, Layer, type Render } from "svelte-canvas";
    import { array, arrayAccess, sortedUpTo } from '$lib/data_structures/Array/array.svelte.ts';

    let renderArray: Render = $derived(({context, width, height}) => {
        context.clearRect(0, 0, width, height);
        context.fillStyle = 'white';
        for (const [index, element] of array.value.entries()) {
            const barHeight = (element / Math.max(...array.value)) * height;
            const offsetX = index * (width / array.value.length);
            const offsetY = height - barHeight;
            const barWidth = width / array.value.length + 1;

            if (index < sortedUpTo.value) {
                context.fillStyle = '#22c55e'; // green
            } else if (index === arrayAccess.value) {
                context.fillStyle = 'red';
            } else {
                context.fillStyle = 'white';
            }
            context.fillRect(offsetX, offsetY, barWidth, barHeight);
        }
    })

</script>
<Canvas layerEvents>
    <Layer render={renderArray} />
</Canvas>