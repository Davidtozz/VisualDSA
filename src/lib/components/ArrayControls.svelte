<script lang="ts">
    import { Play, StopCircle } from 'lucide-svelte';
    import { delayStore, visualizerFlags } from '$lib/stores';
    import { arrayAccess } from '../data_structures/Array/array.svelte.ts';
    import { delay, randomNumber } from '$lib/visualizer/utils';
    import { onMount } from 'svelte';
    import { DEFAULT_ARRAY_SIZE } from '$lib/constants';
    import { array } from '../data_structures/Array/array.svelte.ts';
    import { selectionTracker } from '$lib/stores.svelte.js';


    let size: number = $state(0);
    onMount(() => {
        size = DEFAULT_ARRAY_SIZE;
        generateArray();
    });

    function generateArray() {
        $visualizerFlags.sorted = false;
        array.value = [];
        for (let i = 0; i < size; i++) {
            array.value[i] = randomNumber(1, 100);
        }
        console.log(array.value);
    }

    function resizeArray() {
        if (size > array.value.length) {
            for (let i = array.value.length - 1; i < size; i++) {
                array.value.push(randomNumber(1, 100));
            }
        }
        if (size < array.value.length)
            array.value = array.value.slice(0, size);
    }

    async function sort() {
        // Prevent starting a new sort while one is running
        if ($visualizerFlags.sorting) return;

        if (!selectionTracker.sortFunction) {
            alert('Please select an algorithm to sort the array');
            return;
        }

        // Clear any previous stop request so new run can proceed
        visualizerFlags.stopRequested = false;

        let generator;
        if (selectionTracker.sortFunction?.length > 0) {
            generator = selectionTracker.sortFunction(array.value);
        } else {
            generator = selectionTracker.sortFunction();
        }

        visualizerFlags.sorting = true;

        // Drive generator with pause/resume support: if sorting is set to false elsewhere,
        // we wait (paused) until sorting is resumed. Algorithms themselves watch
        // visualizerFlags.stopRequested to abort.
        async function animateSort() {
            while (true) {
                const result = generator.next();
                if (result.done) break;

                arrayAccess.value = result.value;

                // If user paused (sorting === false), wait here until resumed
                while (!$visualizerFlags.sorting) {
                    // short sleep to avoid blocking the main thread
                    await delay(50);
                    // if a stop was requested while paused, exit
                    if ($visualizerFlags.stopRequested) break;
                }

                if ($visualizerFlags.stopRequested) break;

                await delay($delayStore);
            }
        }

        await animateSort();

        // finalize flags
        visualizerFlags.sorting = false;
        if (!$visualizerFlags.stopRequested) visualizerFlags.sorted = true;
    }

    function stop() {
        console.log('Stop requested: ', $visualizerFlags.stopRequested);
        visualizerFlags.stopRequested = true;
    }

    interface Props {
        class?: string;
    }

    let { class: className = '' }: Props = $props();
    
</script>

<div class="flex flex-1 text-white {className}">
    <button
        onclick={generateArray}
        class="flex flex-row grow border-none items-center justify-center p-3 bg-primary  hover:bg-gray-800 text-white gap-2"
    >
        Generate Array
    </button>
    {#if $visualizerFlags.sorting}
        <button
            class="flex flex-row grow border-none items-center justify-center p-3 bg-primary  hover:bg-gray-800 text-white gap-2"
            onclick={stop}
        >
            <StopCircle /> Stop
        </button>
    {:else}
        <button
            class="flex flex-row grow border-none items-center justify-center p-3 bg-primary  hover:bg-gray-800 text-white gap-2"
            onclick={sort}
        >
            <Play /> Sort
        </button>
    {/if}
    <label
        class="flex flex-col items-center border-none justify-center p-3 bg-primary text-white  gap-2"
    >
        Size: {size}
        <input
            type="range"
            min="100"
            max="1000"
            step="50"
            bind:value={size}
            oninput={resizeArray}
            disabled={$visualizerFlags.sorting}
        />
    </label>
    <label
        class="flex flex-col items-center border-none justify-center p-3 bg-primary text-white  gap-2"
    >
        <div class="flex gap-1 items-center">
            <p class="text-sm flex items-center">
                Delay: {$delayStore}ms
            </p>
        </div>
        <input type="range" max="20" step="0.1" min={0.1} bind:value={$delayStore} />
    </label>
</div>
