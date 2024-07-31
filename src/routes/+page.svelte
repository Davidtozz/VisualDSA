<script lang="ts">
  import Sidebar from '../lib/components/Sidebar.svelte';

    import { Play, StopCircle } from 'lucide-svelte'
    import sorts, { quickSort } from '$lib/algorithms/sort'
    import { algorithm, arrayStore, delayStore, visualizerFlags  } from '$lib/stores';
    import { DEFAULT_ARRAY_SIZE } from '$lib/constants';    
	import { capitalizeFirstLetter, delay, randomNumber } from '$lib/utils';
	import { onMount } from 'svelte';
	import { Canvas, Layer, type Render } from 'svelte-canvas';
    import { browser } from '$app/environment';
    import  * as Select  from '@shadcn/select';
    import * as Collapsible from '@shadcn/collapsible';
    import { Button } from '@shadcn/button';
    import ChevronsDownUp from '$lib/components/ChevronsDownUp.svelte';

    onMount(() => {
        size = DEFAULT_ARRAY_SIZE;
        generateArray();
    });

    let size: number;

    function generateArray() {
        $visualizerFlags.sorted = false;
        arrayStore.clear();
        for(let i = 0; i < size; i++) {
            $arrayStore[i] = randomNumber(1, 100);
        }
        console.log($arrayStore);
    }

    function resizeArray() {
        if (size > $arrayStore.length) {
            for(let i = $arrayStore.length - 1; i < size; i++) {
                $arrayStore.push(randomNumber(1, 100));
            }
        } 
        if (size < $arrayStore.length) $arrayStore = $arrayStore.slice(0, size);
    }

    async function sort() { 
        if($algorithm === 'quicksort') {
            const generator = quickSort($arrayStore);
            for (let result = generator.next(); !result.done; result = generator.next()) {
                $arrayStore = [...$arrayStore]; //? reactivity trigger
                await delay($delayStore); 
            }
        } else if($algorithm in sorts) sorts[$algorithm]() 
        else alert("Please select an algorithm to sort the array");
    }

    function stop() {
        console.log("Stop requested: ", $visualizerFlags.stopRequested);
        visualizerFlags.stopRequested = true;
    }

    let render: Render;
	$: render = ({ context, width, height }) => {
		context.clearRect(0, 0, width, height);
		context.fillStyle = 'white';
		$arrayStore.forEach((element, index) => {
			const barHeight = (element / Math.max(...$arrayStore)) * height;
            const offsetX = index * (width / $arrayStore.length)
			const offsetY = height - barHeight;
            const barWidth = width / $arrayStore.length;
            
            context.fillRect(offsetX, offsetY, barWidth, barHeight);
		});
	};

    let isOpen = false;

</script>

<div class="h-dvh flex flex-row bg-primary">
    <Sidebar class="hidden lg:block border-gray-800 border-r-[1px]"/>
    <main class="h-dvh flex flex-col overflow-auto bg-primary flex-[10]">
        <header class="h-fit bg-gray-900 p-2 flex justify-center">
            <div class="relative inline-block text-left">
                <Select.Root>
                    <Select.Trigger class="bg-transparent border-none text-white space-x-1">
                        <p class="text-2xl">VisualDSA</p>
                    </Select.Trigger>
                    <Select.Content class="bg-gray-800 min-w-fit pb-8 pl-8 pr-8 border-none" sameWidth={false}>
                        <div class="flex flex-row justify-between gap-4">
                            <div>
                                <h1 class="text-white font-bold text-lg cursor-default">Algorithms</h1>
                                <div>
                                    {#each Object.keys(sorts) as algorithm}
                                        <div class="bg-gray-800 hover:bg-blue-500 text-white p-2 cursor-pointer text-left">
                                            {capitalizeFirstLetter(algorithm)}
                                        </div>
                                    {/each}
                                </div>
                            </div>
                            <div class="min-w-fit flex flex-col">
                                <h1 class="text-white font-bold text-lg cursor-default">Data Structures</h1>
                                <div class="bg-gray-800 hover:bg-blue-500 cursor-not-allowed text-white p-2 text-left">
                                    Stack
                                </div>
                                <div class="bg-gray-800 hover:bg-blue-500 cursor-not-allowed text-white p-2 text-left">
                                    Queue
                                </div>
                                <div class="bg-gray-800 hover:bg-blue-500 cursor-not-allowed text-white p-2 text-left">
                                    Hashmap
                                </div>
                            </div>
                        </div>
                    </Select.Content>
                </Select.Root>
            </div>
        </header>
        <section class="flex-[5] flex items-end self-stretch overflow-hidden shadow-md"> 
            <Canvas autoplay class="rounded-lg">
                <Layer {render}/>
            </Canvas>
        </section>
        <footer class=" bg-gray-800 flex flex-row">
            <!-- Algorithm selection -->
<!--             <div class="flex">
                {#each Object.keys(sorts) as algorithm}
                    <div class="flex items-center bg-gray-800 hover:bg-blue-500">
                        <input type="radio" bind:group={selectedAlgorithm} class="peer" name="sort" value={algorithm} id={algorithm} hidden/>
                        <label for={algorithm} class="flex-1 flex peer-checked:bg-blue-500 text-white p-2 cursor-pointer h-full items-center" >
                            {capitalizeFirstLetter(algorithm)}
                        </label>        
                    </div>
                {/each}   
            </div>
 -->
            <!-- controls -->
            <div class="flex flex-1 text-white ">
                <button on:click={generateArray} class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-gray-800 hover:bg-gray-800 text-white gap-2">
                    Generate Array
                </button>
                {#if $visualizerFlags.sorting}
                    <button class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-gray-800 hover:bg-gray-800 text-white gap-2" on:click={stop}>
                        <StopCircle /> Stop
                    </button>
                    {:else}
                    <button class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-2 border-gray-800 hover:bg-gray-800 text-white gap-2" on:click={sort}>
                    
                        <Play /> Sort
                    </button>
                {/if}
                <label class="flex flex-col items-center justify-center p-3 bg-blue-950 text-white gap-2">
                    Size: {size}
                    <input type="range" min="100" max="1000" step="50" bind:value={size} on:input={resizeArray} disabled={$visualizerFlags.sorting}/>
                </label>
                <label class="flex flex-col items-center justify-center p-3 bg-blue-950 text-white gap-2">
                    <div class="flex gap-1 items-center ">
                        <p class="text-sm flex items-center">
                            Delay: {$delayStore}ms
                        </p>
                    </div>
                    <input type="range"  max="20" step="0.1" min={0.1} bind:value={$delayStore}/>
                </label>
            </div> 
        </footer>
    </main>
</div>