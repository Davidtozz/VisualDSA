<script lang="ts">
    import { linkedlist, randomize } from './linkedlist.svelte.ts';
    import { randomNumber } from '@/visualizer/utils.ts';
    import { onMount } from 'svelte';

    let rangeValue = $state(5);
    onMount(() => {
        randomize(rangeValue);
    });
    function handleAppend() {
        if (linkedlist.value.length === 13) return;
        linkedlist.value.append(randomNumber(0, 100));
    }

</script>

<div class="flex flex-1 text-white">
    <button 
    class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-2 border-gray-800 hover:bg-gray-800 text-white gap-2"
    onclick={() => randomize(rangeValue)}
    >
    Generate
    </button>
    <button class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
        onclick={handleAppend}
    >
        Append Random Value
    </button>
</div>