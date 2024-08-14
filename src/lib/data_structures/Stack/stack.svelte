<script lang="ts">
    import { stack } from './stack';
    import { onMount } from 'svelte';
    import { fly, type TransitionConfig } from 'svelte/transition';


    onMount(() => {
        stack.randomize();
    })

    const transitionConfig: TransitionConfig = {
        css: (t, u) => {
            return `transform: translateY(${u * 100}%)`;
        },
        duration: 500,

    }

</script>

<div class="size-full flex flex-col items-center justify-center gap-2 sticky rotate-180">
    {#each $stack.bars as item, i (i)}
        <div class="h-fit bg-white hover:bg-green-500  w-1/2 text-center p-2 sticky rotate-180" id="bar-{i}"
             out:fly={{x: 100,y: -50,duration: 500}}
             in:fly={{x: -200, y: -50,duration: 500}}>
            {item}
        </div>
    {/each}
    {#if $stack.isEmpty()}
    <div class="h-fit bg-white hover:bg-green-500  w-1/4 text-center p-2 sticky rotate-180">
        <i>...stack is empty...</i>
    </div>
    {/if}
</div>