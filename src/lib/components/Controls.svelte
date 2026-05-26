<script lang="ts">
    
    import { isDataStructure, isSortingAlgorithm } from '@/visualizer/utils';
    import ArrayControls from './ArrayControls.svelte';
    import { dataStructures } from '@/data_structures';
    import { selectionTracker } from '@/stores.svelte.ts';

    interface Props {
        class?: string;
    }

    let { class: className = '' }: Props = $props();
    
</script>

<footer class={className}>

    {#if isSortingAlgorithm(selectionTracker.selection)}
    <!-- array sorting controls -->
        <ArrayControls />
    {:else if isDataStructure(selectionTracker.selection)}
        {@const SvelteComponent = dataStructures[selectionTracker.selection].controls}
        <SvelteComponent />
    {/if}
</footer>