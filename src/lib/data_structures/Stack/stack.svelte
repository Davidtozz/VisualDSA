<script lang="ts">
    import { stack } from './stack';
    import { onMount } from 'svelte';

    onMount(() => {
        stack.randomize();
    })

</script>

<div class="size-full flex flex-col items-center justify-center gap-2 sticky">
    {#each $stack.bars as item, i (i)}
        <div class="h-fit bg-white hover:bg-green-500  w-1/4 text-center p-2 sticky" id="bar-{i}">
            {item}
        </div>

    {/each}
    {#if $stack.isEmpty()}
    <div class="h-fit bg-white hover:bg-green-500  w-1/4 text-center p-2 sticky">
        <i>...stack is empty...</i>
    </div>
    {/if}
</div>