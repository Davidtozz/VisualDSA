<script lang="ts">
    import { showImplementation } from '$lib/stores';
    import { selectionTracker } from '@/stores.svelte.ts';

</script>
<header class="h-fit bg-gray-900 p-2 flex justify-center">
    
    <div class="flex-1 text-center flex items-center justify-center">
        <p class="bg-transparent border-none text-white space-x-1 text-2xl ">VisualDSA</p>
    </div>
    {#if selectionTracker.selection}
        <div class="flex gap-2 items-center">
            <input
                id="show-implementation"
                type="checkbox"
                bind:checked={$showImplementation}
                class="h-4 w-4 accent-blue-500"
            />
            <label for="show-implementation" class="text-white text-lg">Show Implementation</label>
        </div>
        
    {/if}

</header>
