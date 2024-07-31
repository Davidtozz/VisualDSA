<script lang="ts">
	import { browser } from '$app/environment';
	import { randomNumber } from '@/utils';
	import { onMount } from 'svelte';
	import { Button } from '@/components/ui/button';

	import { Canvas, Layer, type Render } from 'svelte-canvas';
	import { LoaderCircle } from 'lucide-svelte';

	let len: number = 400;

	const DELAY = 0.1;

	let bars: number[] = Array.from({ length: len }, () => Math.floor(Math.random() * 100) + 1);

	onMount(() => {
		generateArray();
	});

	let running: boolean = false;

	function generateArray() {
		for (let i = 0; i < len; i++) {
			bars[i] = randomNumber(1, 100);
		}
	}

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	function* quickSortGenerator(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
      let pivotIndex = yield* partitionGenerator(arr, left, right);
      yield* quickSortGenerator(arr, left, pivotIndex - 1);
      yield* quickSortGenerator(arr, pivotIndex + 1, right);
    }
  }

  function* partitionGenerator(arr, left, right) {
    let pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        i++;
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        bars = [...arr]; //? reactivity trigger
        yield;
      }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[right];
    arr[right] = temp;
    bars = [...arr]; //? reactivity trigger
    yield;
    return i + 1;
  }

  async function runQuickSort() {
    running = true;
   
    const generator = quickSortGenerator(bars);
    for (let result = generator.next(); !result.done; result = generator.next()) {
      bars = [...bars]; //? reactivity trigger
      await sleep(DELAY); 
    }
    running = false;

    


  }

	let render: Render;
	$: render = ({ context, width, height }) => {
		context.clearRect(0, 0, width, height);
		context.fillStyle = 'white';
		bars.forEach((element, index) => {
			const barHeight = (element / Math.max(...bars)) * height;
			context.fillRect(
				index * (width / bars.length),
				height - barHeight,
				width / bars.length - 2,
				barHeight
			);
		});
	};
</script>

<div class="h-dvh flex flex-col gap-1 items-center justify-center overflow-hidden">
	<Canvas class="bg-black shadow-xl">
		<Layer {render} />
	</Canvas>
	<div>
		<Button on:click={runQuickSort} class="bg-blue-500 text-white p-2 rounded-md" disabled={running}>
			{#if running} 
				<LoaderCircle class="animate-spin" />
			{/if}
			Quick Sort</Button>
		<Button on:click={generateArray}>Reset</Button>
	</div>
</div>
