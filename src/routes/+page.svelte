<script lang="ts">
    import { Play, StopCircle } from 'lucide-svelte'
    import { bubbleSort, insertionSort, selectionSort } from '$lib/algorithms/sort'
    import { arrayStore, delayStore, visualizerFlags  } from '$lib/stores';
    import { DEFAULT_ANIMATION_DELAY, DEFAULT_ARRAY_SIZE } from '$lib/constants';    
	import { capitalizeFirstLetter, randomNumber } from '$lib/utils';
    import sorts from '$lib/algorithms/sort'
	import { onMount } from 'svelte';

    onMount(() => {
        size = DEFAULT_ARRAY_SIZE;
        generateArray();
    });

    let size: number;
    let selectedAlgorithm: string = "";

    function generateArray() {
        $visualizerFlags.sorted = false;
        arrayStore.clear();
        if($arrayStore.length === 0) {
            for(let i = 0; i < size; i++) {
                $arrayStore[i] = randomNumber(1, 100);
            }
            return;
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

    function sort() { sorts[selectedAlgorithm]() }

    function stop() {
        console.log("Stop requested: ", $visualizerFlags.stopRequested);
        visualizerFlags.stopRequested = true;
    }
</script>

<main class="h-dvh flex flex-col overflow-auto bg-black">
    <nav class="h-fit bg-gray-900 p-2">
        <h1 class=" text-white text-center p-2 text-2xl">VisualDSA</h1>
    </nav>
    <section class="flex-[5] flex items-end self-stretch overflow-hidden "> 
        {#each $arrayStore as number, i}
            <div id={String(i)} class="bg-white flex-1 flex text-center min-w-0" style="height: {(number / Math.max(...$arrayStore)) * 100}%">
                <p class="flex-1 text-black" hidden={size > 69}>{number}</p>                
            </div>
        {/each}
    </section>
    <footer class=" bg-gray-900 flex flex-row justify-between">
        <!-- Algorithm selection -->
        <div class="flex">
            {#each Object.keys(sorts) as algorithm}
                <div class="flex items-center bg-gray-800 hover:bg-blue-500">
                    <input type="radio" bind:group={selectedAlgorithm} class="peer" name="sort" value={algorithm} id={algorithm} hidden/>
                    <label for={algorithm} class="flex-1 flex peer-checked:bg-blue-500 text-white p-2 cursor-pointer h-full items-center" >
                        {capitalizeFirstLetter(algorithm)}
                    </label>        
                </div>
            {/each}   
        </div>

        <!-- controls -->
        <div class="flex text-white">
            <button on:click={generateArray} class="flex flex-row items-center justify-center p-3 bg-blue-950 hover:bg-blue-700 text-white gap-2">
                Generate Array
            </button>
            {#if $visualizerFlags.sorting}
                <button class="flex flex-row items-center justify-center p-3 bg-blue-950 hover:bg-blue-700 text-white gap-2" on:click={stop}>
                    <StopCircle /> Stop
                </button>
                {:else}
                <button class="flex flex-row items-center justify-center p-3 bg-blue-950 hover:bg-blue-700 text-white gap-2" on:click={sort}>
                
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
                <input type="range"  max="100" step="5" min={DEFAULT_ANIMATION_DELAY} bind:value={$delayStore}/>
            </label>
        </div> 
    </footer>
</main>