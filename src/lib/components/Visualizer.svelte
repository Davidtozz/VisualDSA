<script lang="ts">
    import { dsaStore, arrayAccess, arrayStore } from '$lib/stores';
    import { Canvas, Layer, type Render } from 'svelte-canvas';
    import { isSortingAlgorithm, isDataStructure } from '@/utils';
    import LinkedListLayer from '@/data_structures/LinkedList/linkedlist.svelte';
    import ArrayLayer from '@/data_structures/Array/array.svelte';
    import Controls from './Controls.svelte';
    import * as ContextMenu from '@shadcn/context-menu';
    import { linkedlist } from '@/data_structures/LinkedList/linkedlist';
    import { onMount } from 'svelte';

   
    let className = '';
    export { className as class };
</script>

<section class="{className}">
    <!-- ... logic to determine which data structure it is ... -->
    <div class="bg-grid size-full" >
        {#if isSortingAlgorithm($dsaStore)}
            <ArrayLayer />
        {:else if isDataStructure($dsaStore)}
            <LinkedListLayer />
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