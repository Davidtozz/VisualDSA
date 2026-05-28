<script lang="ts">
    import ChevronsDownUp from '$lib/components/ChevronsDownUp.svelte';
    import type { Snippet } from 'svelte';

    interface Props {
        title: string;
        class?: string;
        buttonClass?: string;
        contentClass?: string;
        children?: Snippet;
    }

    let {
        children,
        title,
        class: className = '',
        buttonClass = 'flex w-full cursor-pointer items-center justify-between bg-primary p-2 text-white hover:bg-gray-800',
        contentClass = ''
    }: Props = $props();

    let open = $state(false);
</script>

<div class={className}>
    <button type="button" class={buttonClass} onclick={() => {open = !open}}>
        <p class="text-xl p-1">{title}</p>
        <ChevronsDownUp rotate={open} />
    </button>

    {#if open}
        <div class={contentClass}>
            {@render children?.()}
        </div>
    {/if}
</div>