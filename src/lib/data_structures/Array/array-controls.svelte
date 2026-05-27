<script lang="ts">
    import { Play, StopCircle } from 'lucide-svelte';
    import { arrayAccess } from './array.svelte.ts';
    import { sortedUpTo } from './array.svelte.ts';
    import { randomNumber } from '$lib/visualizer/utils';
    import { visualizer } from '$lib/visualizer/visualizer.svelte.js';
    import { SortingAnimator } from '$lib/visualizer/sorting-animator';
    import { onMount } from 'svelte';
    import { DEFAULT_ARRAY_SIZE } from '$lib/constants';
    import { array } from './array.svelte.ts';
    import { selectionTracker } from '$lib/stores.svelte.js';


    let size: number = $state(0);
    const animator = new SortingAnimator();
    onMount(() => {
        size = DEFAULT_ARRAY_SIZE;
        generateArray();
    });

    function generateArray() {
        visualizer.sorted = false;
        sortedUpTo.value = -1;
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
        if (visualizer.sorting) return;

        if (!selectionTracker.sortFunction) {
            alert('Please select an algorithm to sort the array');
            return;
        }

        // Clear any previous stop request so new run can proceed
        visualizer.stopRequested = false;
        sortedUpTo.value = -1;

        // Resume audio context on user gesture (Sort button)
        await animator.resumeAudio();

        let generator;
        if (selectionTracker.sortFunction?.length > 0) {
            generator = selectionTracker.sortFunction(array.value);
        } else {
            generator = selectionTracker.sortFunction();
        }

        visualizer.sorting = true;

        // Drive generator with pause/resume support
        async function animateSort() {
            while (true) {
                const result = generator.next();
                if (result.done) break;

                arrayAccess.value = result.value;

                // Play audio feedback for each step
                try {
                    let numeric = 0;
                    if (typeof result.value === 'number') numeric = result.value;
                    else if (Array.isArray(result.value) && typeof result.value[0] === 'number') numeric = result.value[0];
                    animator.playStepBeep(numeric, array.value.length);
                } catch (e) {
                    // ignore audio errors
                }

                // If user paused (sorting === false), wait here until resumed
                while (!visualizer.sorting) {
                    // short sleep to avoid blocking the main thread
                    await visualizer.delay(50);
                    // if a stop was requested while paused, exit
                    if (visualizer.stopRequested) break;
                }

                if (visualizer.stopRequested) break;

                // Adjust delay based on array size: bigger arrays animate faster
                const baseDelay = visualizer.delayMs;
                const sizeMultiplier = Math.max(0.3, 1 - (array.value.length / 2000));
                await visualizer.delay(baseDelay * sizeMultiplier);
            }
        }

        await animateSort();

        // finalize flags
        visualizer.sorting = false;
        if (!visualizer.stopRequested) {
            visualizer.sorted = true;

            // Play completion animations
            await animator.playChimeSequence(
                array.value,
                (index) => {
                    arrayAccess.value = index;
                },
                () => visualizer.stopRequested
            );

            // Animate green fill with rising frequency
            await animator.animateGreenFill(
                array.value.length,
                (filledCount) => {
                    sortedUpTo.value = filledCount;
                },
                () => visualizer.stopRequested,
                1500
            );
        }
    }

    function stop() {
        console.log('Stop requested: ', visualizer.stopRequested);
        visualizer.stopRequested = true;
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
    {#if visualizer.sorting}
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
            disabled={visualizer.sorting}
        />
    </label>
    <label
        class="flex flex-col items-center border-none justify-center p-3 bg-primary text-white  gap-2"
    >
        <div class="flex gap-1 items-center">
            <p class="text-sm flex items-center">
                Delay: {visualizer.delayMs}ms
            </p>
        </div>
        <input type="range" max="20" step="0.1" min={0.1} bind:value={visualizer.delayMs} />
    </label>
</div>
