<script lang="ts">
    import { Play, StopCircle } from 'lucide-svelte'
    import { bubbleSort, insertionSort, selectionSort } from '$lib/algorithms/sort'
    import { arrayStore, delayStore, visualizerFlags  } from '$lib/stores';
    import { DEFAULT_ARRAY_SIZE } from '$lib/constants';    

    //TODO: Delay slider
    let size = DEFAULT_ARRAY_SIZE; 
    let shouldUseDelay = false;
  
    $: if(!shouldUseDelay) {
        $delayStore = null;
    } else {
        $delayStore = 0;
    }
    
    let selectedAlgorithm: string = "";

    $: bubblesortSelected = selectedAlgorithm === "bubblesort";
    $: insertionsortSelected = selectedAlgorithm === "insertionsort";
    $: selectionsortSelected = selectedAlgorithm === "selectionsort";


    function generateArray() {
        $visualizerFlags.sorted = false;
        $arrayStore = [];
        for (let i = 0; i < size; i++) {
            $arrayStore.push(Math.floor(Math.random() * 100) + 1);
        }
        console.log($arrayStore);
    }

    function sort() {
        switch(selectedAlgorithm) {
            case "bubblesort":
                bubbleSort();
                break;
            case "insertionsort":
                insertionSort();
                break;
            case "selectionsort":
                selectionSort();
                break;
            default:
                alert("Please select an algorithm");
        }
    }

    function computeHeight(value: number, max: number) {
        return (value / max) * 100;
    }

    function stop() {
        console.log("Stop requested: ", $visualizerFlags.stopRequested);
        visualizerFlags.stopRequested = true;
    }
</script>

<main class="h-dvh flex flex-col overflow-auto">
    <nav class="flex-1">
        <h1 class="bg-blue-800 text-white text-center p-2">VisualDSA</h1>
    </nav>
    <section class="flex-[5] flex items-end gap-1 p-2 self-stretch"> 
        {#if $arrayStore.length === 0}
            <h1 class="text-black flex-1 self-center text-center text-4xl">Click on "Generate Array" to start!</h1>        
        {/if}
        {#each $arrayStore as number}
            <div id={String(number)} class="bg-green-500 flex-1 flex text-center min-w-0" style="height: {computeHeight(number, Math.max(...$arrayStore))}%">
                <p class="flex-1 text-white" hidden={size > 69}>{number}</p>                
            </div>
        {/each}

    </section>
    <footer class=" bg-blue-800 flex flex-row justify-between">
        <!-- Algorithm selection -->
        <div class="flex">
            <label class="flex items-center justify-center {bubblesortSelected ? "bg-blue-500" : "bg-blue-800"}  hover:bg-blue-500 text-white p-2 cursor-pointer">
                Bubble Sort
                <input type="radio" bind:group={selectedAlgorithm} class="appearance-none" name="alg" value="bubblesort" />
            </label>
            <label class="flex items-center justify-center {insertionsortSelected ? "bg-blue-500" : "bg-blue-800"}  text-center hover:bg-blue-500 text-white p-2 cursor-pointer">
                Insertion Sort
                <input type="radio" bind:group={selectedAlgorithm} class="appearance-none" name="alg" value="insertionsort" /> 
            </label>
            <label class="flex items-center justify-center {selectionsortSelected ? "bg-blue-500" : "bg-blue-800"}   text-center hover:bg-blue-500  text-white p-2 cursor-pointer">
                Selection Sort
                <input type="radio" bind:group={selectedAlgorithm} class="appearance-none" on:click={alert} name="alg" value="selectionsort" /> 
            </label>  
        
        </div>

        <!-- controls -->
        <div class="flex text-white">
            <p>{selectedAlgorithm}</p>
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
                {"Size: " + size}
                <input type="range" min="10" max="100" step="10" bind:value={size} on:input={generateArray} disabled={$visualizerFlags.sorting}/>
            </label>
            <label class="flex flex-col items-center justify-center p-3 bg-blue-950 text-white gap-2">
                <div class="flex gap-1 items-center ">
                    <input type="checkbox" name="delay" bind:value={shouldUseDelay}>
                    <p class="text-sm flex items-center">
                        {#if !shouldUseDelay}
                            Delay
                        {:else}
                            Delay: {$delayStore ?? 0}ms
                        {/if}
                    </p>
                </div>
                <input type="range"  max="100" step="2" min="0" bind:value={$delayStore}  disabled={!shouldUseDelay}/>
            </label>
        </div> 
    </footer>
</main>