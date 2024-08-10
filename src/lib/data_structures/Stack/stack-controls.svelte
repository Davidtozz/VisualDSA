<script lang="ts">
    import { stack } from '@/data_structures/Stack/stack';
    import { CornerRightDown, CornerUpRight, Shuffle } from 'lucide-svelte';


    $: if($stack.bars.length > $stack.size) {
        $stack.bars = $stack.bars.slice(0, $stack.size);
    } else if($stack.bars.length < $stack.size) {
        for(let i = $stack.bars.length; i < $stack.size; i++) {
            $stack.push(Math.floor(Math.random() * 100));
        }
    }

</script>


<div class="flex flex-1 text-white">
    <button
        class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-2 border-gray-800 hover:bg-gray-800 text-white gap-2"
        on:click={() => stack.randomize()}
    >
       <Shuffle /> Randomize
    </button>
    <button class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
            on:click={() => stack.pop()}
    >
       <CornerUpRight /> Pop
    </button><button class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
            on:click={() => stack.push()}
    >
        <CornerRightDown /> Push
    </button>
    <div class="flex flex-col items-center justify-center p-3 bg-primary text-white border-l-2 border-t-2 border-gray-800 gap-2">
        <label for="size">Size</label>
        <input type="range" name="size" id="size" min="1" max="13" bind:value={$stack.size}>
    </div>
</div>