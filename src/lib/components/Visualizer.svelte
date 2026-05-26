<script lang="ts">
    import { isDataStructure, isSortingAlgorithm } from '@/visualizer/utils';
    import ArrayLayer from '@/data_structures/Array/array.svelte';
    import { dataStructures } from '@/data_structures';
    import { selectionTracker } from '@/stores.svelte.ts';

    interface Props {
        class?: string;
    }

    let { class: className = '' }: Props = $props();
    
</script>

<section class="{className}">
    <div class="bg-grid size-full flex">
        {#if isSortingAlgorithm(selectionTracker.selection)}
            <ArrayLayer />
        {:else if isDataStructure(selectionTracker.selection)}
            {@const SvelteComponent = dataStructures[selectionTracker.selection].layer}
            <SvelteComponent />
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