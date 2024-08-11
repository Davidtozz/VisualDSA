<script lang="ts">
    import { dsaStore, arrayAccess, arrayStore } from '$lib/stores';
    import { isSortingAlgorithm, isDataStructure } from '@/utils';
    import ArrayLayer from '@/data_structures/Array/array.svelte';
    import { dataStructures } from '@/data_structures';
    let className = '';
    export { className as class };
</script>

<section class="{className}">
    <div class="bg-grid size-full flex" >
        {#if isSortingAlgorithm($dsaStore)}
            <ArrayLayer />
        {:else if isDataStructure($dsaStore)}
            <svelte:component this={dataStructures[$dsaStore].layer} />
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