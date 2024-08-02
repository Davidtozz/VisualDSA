<script lang="ts">
    import { arrayAccess, arrayStore } from '$lib/stores';
	import { Canvas, Layer, type Render } from 'svelte-canvas';

    let render: Render;
	$: render =   ({ context, width, height }) => {
		context.clearRect(0, 0, width, height);
        context.fillStyle = 'white';
        for( const [index, element] of $arrayStore.entries()) {
            const barHeight = (element / Math.max(...$arrayStore)) * height;
            const offsetX = index * (width / $arrayStore.length)
			const offsetY = height - barHeight;
            const barWidth = width / $arrayStore.length +1;

            if (index === $arrayAccess)  {
                context.fillStyle = 'red'; 
            } else {
                context.fillStyle = 'white';
            }
            context.fillRect(offsetX, offsetY, barWidth, barHeight);
        }		
	};

    let className = '';
    export {className as class}
</script>

<section class="{className}"> 
    <Canvas >
        <Layer {render}/>
    </Canvas>
</section>