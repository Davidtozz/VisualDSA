<script lang="ts">
    
    import { dsaStore } from '$lib/stores';
    import { isDataStructure, isSortingAlgorithm } from '$lib/utils';
    import ArrayControls from './ArrayControls.svelte';
    import LinkedListControls from '@/data_structures/LinkedList/linkedlist-controls.svelte';
    import StackControls from '@/data_structures/Stack/stack-controls.svelte';



    let className: string = '';
    export { className as class };


</script>

<footer class={className}>
    
    {#if isSortingAlgorithm($dsaStore)}
    <!-- array sorting controls -->
        <ArrayControls />
    {:else if isDataStructure($dsaStore)}
        <!-- ...sofisticated logic to determine which data structure controls to show... -->
        {#if $dsaStore === 'linkedlist'}
            <LinkedListControls  />
        {:else if $dsaStore === 'stack'}
            <StackControls />
        {/if}
    {/if}
</footer>