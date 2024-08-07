<script lang="ts">
    
    import { dsaStore } from '$lib/stores';
    import { isDataStructure, isSortingAlgorithm } from '$lib/utils';
    import ArrayControls from './ArrayControls.svelte';
    import LinkedListControls from '@/data_structures/LinkedList/linkedlist-controls.svelte';



    let className: string = '';
    export { className as class };


</script>

<footer class={className}>
    
    {#if isSortingAlgorithm($dsaStore)}
    <!-- array sorting controls -->
        <ArrayControls />
    {:else if isDataStructure($dsaStore)}
        <!-- ...logic to determine which data structure controls to show... -->
        <LinkedListControls  />
    {/if}
</footer>