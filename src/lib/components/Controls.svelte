<script lang="ts">
    import { Play, StopCircle } from 'lucide-svelte';
    import { sortingFunctions } from '$lib/algorithms/sort';
    import { arrayStore, delayStore, arrayAccess, visualizerFlags, dsaStore } from '$lib/stores';
    import { capitalizeFirstLetter, delay, randomNumber } from '$lib/utils';
    import { onMount } from 'svelte';
    import { DEFAULT_ARRAY_SIZE } from '@/constants';

    let size: number;
    onMount(() => {
        size = DEFAULT_ARRAY_SIZE;
        generateArray();
    });

    function generateArray() {
        $visualizerFlags.sorted = false;
        arrayStore.clear();
        for (let i = 0; i < size; i++) {
            $arrayStore[i] = randomNumber(1, 100);
        }
        console.log($arrayStore);
    }

    function resizeArray() {
        if (size > $arrayStore.length) {
            for (let i = $arrayStore.length - 1; i < size; i++) {
                $arrayStore.push(randomNumber(1, 100));
            }
        }
        if (size < $arrayStore.length) $arrayStore = $arrayStore.slice(0, size);
    }

    async function sort() {
        let generator;
        async function animateSort() {
            for (let result = generator.next(); !result.done; result = generator.next()) {
                $arrayStore = $arrayStore; //? reactivity trigger
                $arrayAccess = result.value;
                await delay($delayStore);
            }
        }

        const selectedFunction = sortingFunctions.find((fn) => fn.name === $dsaStore);

        if(!selectedFunction) {
            alert('Please select an algorithm to sort the array'); 
            return;
        }

        if(selectedFunction.hasParams) {
            generator = selectedFunction.fn($arrayStore);
        } else {
            generator = selectedFunction.fn();
        }

        visualizerFlags.sorting = true;
        await animateSort();
        console.log(selectedFunction.displayName + ' sorted array: ', $arrayStore);

        visualizerFlags.sorting = false;
        visualizerFlags.sorted = true;
    }

    function stop() {
        console.log('Stop requested: ', $visualizerFlags.stopRequested);
        visualizerFlags.stopRequested = true;
    }

    let className: string = '';
    export { className as class };
</script>

<footer class={className}>
    <!-- controls -->
    <div class="flex flex-1 text-white">
        <button
            on:click={generateArray}
            class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-gray-800 hover:bg-gray-800 text-white gap-2"
        >
            Generate Array
        </button>
        {#if $visualizerFlags.sorting}
            <button
                class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-gray-800 hover:bg-gray-800 text-white gap-2"
                on:click={stop}
            >
                <StopCircle /> Stop
            </button>
        {:else}
            <button
                class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-2 border-gray-800 hover:bg-gray-800 text-white gap-2"
                on:click={sort}
            >
                <Play /> Sort
            </button>
        {/if}
        <label class="flex flex-col items-center justify-center p-3 bg-primary text-white border-l-2 border-gray-800 gap-2">
            Size: {size}
            <input
                type="range"
                min="100"
                max="1000"
                step="50"
                bind:value={size}
                on:input={resizeArray}
                disabled={$visualizerFlags.sorting}
            />
        </label>
        <label class="flex flex-col items-center justify-center p-3 bg-primary text-white border-l-2 border-gray-800 gap-2">
            <div class="flex gap-1 items-center">
                <p class="text-sm flex items-center">
                    Delay: {$delayStore}ms
                </p>
            </div>
            <input type="range" max="20" step="0.1" min={0.1} bind:value={$delayStore} />
        </label>
    </div>
</footer>
