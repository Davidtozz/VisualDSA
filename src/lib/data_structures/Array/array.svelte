<script lang="ts">
    import { arrayStore, arrayAccess } from "@/stores";
    import { Canvas, Layer, type Render } from "svelte-canvas";

    let renderArray: Render
    
    $: renderArray = ({context, width, height}) => {
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
</script>
<Canvas layerEvents>
    <Layer render={renderArray} />
</Canvas>