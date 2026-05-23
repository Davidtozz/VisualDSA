<script lang="ts">
    
    import { dsaStore } from '$lib/stores';
    import { isDataStructure, isSortingAlgorithm } from '@/visualizer/utils';
    import ArrayControls from './ArrayControls.svelte';
    import { dataStructures } from '@/data_structures';

    interface Props {
        class?: string;
    }

    let { class: className = '' }: Props = $props();
    
</script>

<footer class={className}>
    
    {#if isSortingAlgorithm($dsaStore)}
    <!-- array sorting controls -->
        <ArrayControls />
    {:else if isDataStructure($dsaStore)}
        {@const SvelteComponent = dataStructures[$dsaStore].controls}
        <SvelteComponent />
    {/if}
</footer>