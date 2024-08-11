<script lang="ts">
    
    import { dsaStore } from '$lib/stores';
    import { isDataStructure, isSortingAlgorithm } from '$lib/utils';
    import ArrayControls from './ArrayControls.svelte';
    import { dataStructures } from '@/data_structures';



    let className: string = '';
    export { className as class };
</script>

<footer class={className}>
    
    {#if isSortingAlgorithm($dsaStore)}
    <!-- array sorting controls -->
        <ArrayControls />
    {:else if isDataStructure($dsaStore)}
        <svelte:component this={dataStructures[$dsaStore].controls} />
    {/if}
</footer>