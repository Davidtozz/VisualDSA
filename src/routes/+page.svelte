<script lang="ts">

    const DEFAULT_SIZE = 50;
    const ANIMATION_DELAY = 5;

    let array: number[] = [];
    let size = DEFAULT_SIZE; 
    //Disable slider while sorting the array
    let sorting = false;
    let isSorted = false;

    function generateArray() {
        isSorted = false;
        if(array.length > 0) {
            // reset the array
            array = [];
        }

        for (let i = 0; i < size; i++) {
            array.push(Math.floor(Math.random() * 100) + 1);
        }
        console.log(array);
    }

    generateArray();

    async function bubbleSort() {
        generateArray();
        sorting = true;
        for(let i = 0; i < array.length; i++) {
            for(let j = 0; j < array.length - i - 1; j++) {
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
        generateArray();
        sorting = true;
        let i, key, j;
        for (i = 1; i < array.length; i++) {
            key = array[i];
            j = i - 1;
            while (j >= 0 && array[j] > key) {
                await delay(ANIMATION_DELAY);
                array[j + 1] = array[j];
                j = j - 1;
            }
            array[j + 1] = key;
        }
        isSorted = true;
    }



    async function selectionSort() {
        generateArray();
        sorting = true;
        let n = array.length;

        for (let i = 0; i < n - 1; i++) { 
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

    function computeHeight(value: number, max: number) {
        return (value / max) * 100;
    }
</script>

<main class="h-dvh flex flex-col overflow-auto">
    <nav class="flex-1">
        <h1 class="bg-blue-800 text-white text-center p-2">VisualDSA</h1>
    </nav>
    <section class="flex-[5] flex items-end gap-1 p-2 self-stretch">
        {#each array as number, i}
                <div id={String(number)} class="bg-green-500 flex-1 flex text-center min-w-0" style="height: {computeHeight(number, Math.max(...array))}%">
                    <p class="flex-1 text-white" hidden={size > 69}>{number}</p>                
                </div>
        {/each}
    </section>
    <footer class=" bg-red-800 flex flex-row">
        <button class="flex-1 bg-blue-800 text-center hover:bg-blue-500 text-white" on:click={bubbleSort}>Bubble Sort</button>
        <button class="flex-1 bg-blue-800 text-center hover:bg-blue-500 text-white" on:click={insertionSort}>Insertion Sort</button>
        <button class="flex-1 bg-blue-800 text-center hover:bg-blue-500 text-white" on:click={selectionSort}>Selection Sort</button>
        <label class="flex flex-col items-center justify-center p-3 bg-blue-950 text-white gap-2">
            {"Size: " + size}
            <input type="range" min="5" max="100" bind:value={size} on:input={generateArray} disabled={sorting}/>
        </label>
    </footer>
</main>