<script lang="ts">

    const DEFAULT_SIZE = 50;

    let array: number[] = [];
    let size = DEFAULT_SIZE; 

    function generateArray() {
        if(array.length > 0) {
            // reset the array
            array = [];
        }

        for (let i = 0; i < size; i++) 
            array.push(Math.floor(Math.random() * 100) + 1);
        console.log(array);
    }

    generateArray();

    function bubbleSort() {
        for(let i = 0; i < array.length; i++) {
            for(let j = 0; j < array.length - i - 1; j++) {

                document.getElementById(String(array[j]))?.classList.add("bg-red-500");
                if(array[j] > array[j + 1]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
    }

    function delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function insertionSort() {
        alert("Insertion sort not implemented yet.");
    }

    function selectionSort() {
        alert("Selection sort not implemented yet.");
    }

    // Function to calculate height percentage
    function getHeightPercentage(value: number, max: number) {
        return (value / max) * 100;
    }
</script>

<main class="h-dvh flex flex-col overflow-auto">
    <section class="flex-[5] flex items-end gap-1 p-2 self-stretch">
        {#each array as number, i}
            <div id={String(number)} class="bg-green-500 flex-1 flex text-center min-w-0" style="height: {getHeightPercentage(number, Math.max(...array))}%">
                <p class="flex-1 text-white" hidden={size > 69}>{number}</p>                
            </div>
        {/each}
    </section>
    <footer class="flex-1 bg-red-800 flex flex-row">
        <button class="flex-1 bg-blue-800 text-center hover:bg-blue-500 text-white" on:click={bubbleSort}>Bubble Sort</button>
        <button class="flex-1 bg-blue-800 text-center hover:bg-blue-500 text-white" on:click={insertionSort}>Insertion Sort</button>
        <button class="flex-1 bg-blue-800 text-center hover:bg-blue-500 text-white" on:click={selectionSort}>Selection Sort</button>
        <label class="flex flex-col items-center justify-center p-3 bg-blue-950 text-white gap-2">
            {"Size: " + size}
            <input type="range" min="5" max="200" bind:value={size} on:input={generateArray}/>
        </label>
    </footer>
</main>