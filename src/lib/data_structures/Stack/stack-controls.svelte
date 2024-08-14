<script lang="ts">
    import { stack } from '@/data_structures/Stack/stack';
    import { CornerRightDown, CornerUpRight, Shuffle } from 'lucide-svelte';
</script>


<div class="flex flex-1 text-white">
    <button
        class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-2 border-gray-800 hover:bg-gray-800 text-white gap-2"
        on:click={() => stack.randomize()}
    >
       <Shuffle /> <pre>randomize()</pre>
    </button>
    <button class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
            on:click={() => stack.push()}
    >
        <CornerRightDown /> <pre>stack.push()</pre>
    </button>
    <button class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
            on:click={() => stack.pop()}
    >
       <CornerUpRight /> <pre>stack.pop()</pre>
    </button>
    <div class="flex flex-col items-center justify-center p-3 bg-primary text-white border-l-2 border-t-2 border-gray-800 gap-2">
        <label for="size">Size</label>
        <input type="range" name="size" id="size" min="1" max="13" bind:value={$stack.size}>
    </div>
</div>