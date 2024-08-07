<script lang="ts">
    import type { Writable } from 'svelte/store';
    import { linkedlist } from './linkedlist';

    let listSize;
    $: linkedlist.randomize(listSize);


    function handleAppend() {
        $linkedlist.append(Math.floor(Math.random() * 100));
        $linkedlist = $linkedlist;
    }

</script>

<div class="flex flex-1 text-white">
    <button 
    class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-2 border-gray-800 hover:bg-gray-800 text-white gap-2"
    on:click={() => linkedlist.randomize(listSize)}
    >
    Generate
    </button>
    <button class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
        on:click={handleAppend}
    >
        Append Random Value
    </button>
    <div class="flex flex-col items-center justify-center p-3 bg-primary text-white border-l-2 border-t-2 border-gray-800 gap-2">
        <label for="size">Size</label>
        <input type="range" name="size" id="size" min="1" max="13" bind:value={listSize}>
    </div>
</div>