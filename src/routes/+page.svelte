<script lang="ts">
    import { Play, StopCircle } from 'lucide-svelte'
    const DEFAULT_SIZE = 50;
    //TODO: Delay slider
    let ANIMATION_DELAY = 5; //expressed in ms

    let array: number[] = [];
    let size = DEFAULT_SIZE; 
    //Disable slider while sorting the array
    let sorting = false;
    let isSorted = false;
    let stopRequested = false;

    $: bubblesortSelected = selectedAlgorithm === "bubblesort";
    $: insertionsortSelected = selectedAlgorithm === "insertionsort";
    $: selectionsortSelected = selectedAlgorithm === "selectionsort";

    let selectedAlgorithm: string = "";

    function generateArray() {
        isSorted = false;
        array = [];
        for (let i = 0; i < size; i++) {
            array.push(Math.floor(Math.random() * 100) + 1);
        }
        console.log(array);
    }

    async function bubbleSort() {
        
        sorting = true;
        for(let i = 0; i < array.length; i++) {
            for(let j = 0; j < array.length - i - 1; j++) {
                /* Pause sorting */
                if(stopRequested) {
                    stopRequested = false;
                    sorting = false;
                    return;
                }
                await delay(ANIMATION_DELAY);
                if(array[j] > array[j + 1]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        sorting = false;
        isSorted = true;
    }

    function delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function insertionSort() {
        sorting = true;
        let i, key, j;
        for (i = 1; i < array.length; i++) {
            key = array[i];
            j = i - 1;
            while (j >= 0 && array[j] > key) {
                /* Visualizer logic */
                if(stopRequested) {
                    stopRequested = false;
                    sorting = false;
                    return;
                }
                /* ================= */
                await delay(ANIMATION_DELAY);
                array[j + 1] = array[j];
                j = j - 1;
            }
            array[j + 1] = key;
        }
        isSorted = true;
        sorting = false;
    }

    console.log(array)

    async function selectionSort() {
        sorting = true;
        let n = array.length;

        for (let i = 0; i < n - 1; i++) { 
            /* Visualizer logic */
            if(stopRequested) {
                stopRequested = false;
                sorting = false;
                return;
            }
            /* ================= */
            await delay(ANIMATION_DELAY); 
            let min_idx = i;
            for (let j = i + 1; j < n; j++) {

                await delay(ANIMATION_DELAY); 
                if (array[j] < array[min_idx]) {
                    min_idx = j;
                }
            }
            await delay(ANIMATION_DELAY); 
            [array[min_idx], array[i]] = [array[i], array[min_idx]];
        }
        sorting = false;
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
</script>

<main class="h-dvh flex flex-col overflow-auto">
    <nav class="flex-1">
        <h1 class="bg-blue-800 text-white text-center p-2">VisualDSA</h1>
    </nav>
    <section class="flex-[5] flex items-end gap-1 p-2 self-stretch">
        {#if array.length === 0}
            <h1 class="text-black flex-1 self-center text-center text-4xl">Click on "Generate Array" to start!</h1>        
        {/if}
        {#each array as number}
            <div id={String(number)} class="bg-green-500 flex-1 flex text-center min-w-0" style="height: {computeHeight(number, Math.max(...array))}%">
                <p class="flex-1 text-white" hidden={size > 69}>{number}</p>                
            </div>
        {/each}

    </section>
    <footer class=" bg-blue-800 flex flex-row justify-between">
        <!-- Algorithm selection -->
        <div class="flex">
            <label class="flex items-center justify-center {bubblesortSelected ? "bg-blue-500" : "bg-blue-800"}  hover:bg-blue-500 text-white p-2">
                Bubble Sort
                <input type="radio" bind:group={selectedAlgorithm} class="appearance-none" name="alg" value="bubblesort" /><!-- on:click={bubbleSort} -->
            </label>
            <label class="flex items-center justify-center {insertionsortSelected ? "bg-blue-500" : "bg-blue-800"}  text-center hover:bg-blue-500 text-white p-2">
                Insertion Sort
                <input type="radio" bind:group={selectedAlgorithm} class="appearance-none" name="alg" value="insertionsort" /> <!--  on:click={insertionSort} -->
            </label>
            <label class="flex items-center justify-center {selectionsortSelected ? "bg-blue-500" : "bg-blue-800"}   text-center hover:bg-blue-500  text-white p-2">
                Selection Sort
                <input type="radio" bind:group={selectedAlgorithm} class="appearance-none" on:click={alert} name="alg" value="selectionsort" /> <!-- on:click={selectionSort} -->
            </label>    
        </div>

        <!-- controls -->
        <div class="flex text-white">
            <button on:click={generateArray} class="flex flex-row items-center justify-center p-3 bg-blue-950 hover:bg-blue-700 text-white gap-2">
                Generate Array
            </button>
            {#if sorting}
                <button class="flex flex-row items-center justify-center p-3 bg-blue-950 hover:bg-blue-700 text-white gap-2" on:click={() => stopRequested = true}>
                    <StopCircle /> Stop
                </button>
                {:else}
                <button class="flex flex-row items-center justify-center p-3 bg-blue-950 hover:bg-blue-700 text-white gap-2" on:click={sort}>
                    <Play /> Sort
                </button>
            {/if}
            <label class="flex flex-col items-center justify-center p-3 bg-blue-950 text-white gap-2">
                {"Size: " + size}
                <input type="range" min="5" max="100" bind:value={size} on:input={generateArray} disabled={sorting}/>
            </label>
            <label class="flex flex-col items-center justify-center p-3 bg-blue-950 text-white gap-2">
                {"Delay: " + ANIMATION_DELAY + "ms"}
                <input type="range"  max="100" step="10" bind:value={ANIMATION_DELAY} />
            </label>
        </div> 
    </footer>
</main>