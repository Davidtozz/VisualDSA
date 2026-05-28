<script lang="ts">
    import { selectionTracker } from '@/stores.svelte.ts';

    interface Props {
        class?: string;
    }

    let { class: className = '' }: Props = $props();
</script>

<section class="{className}">
    <div class="bg-grid size-full flex">
        {#if selectionTracker.selection !== "none"}
            {@const LayerComponent = selectionTracker.layerComponent}
            {#if LayerComponent}
                <LayerComponent />
            {/if}
        {/if}
    </div>
</section>

<style>
    .bg-grid {
        background-size: 15px 15px;
        background-image: 
        linear-gradient(to right, #83838358 1px, transparent 1px), 
        linear-gradient(to bottom, #cccccc47 1px, transparent 1px);
    }
</style>