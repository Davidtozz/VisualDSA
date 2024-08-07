<script lang="ts">
    import { dsaStore, showImplementation } from '$lib/stores';
    import { Switch } from './ui/switch';
    import { Menu } from 'lucide-svelte';

</script>
<header class="h-fit bg-gray-900 p-2 flex justify-center">
    
    <div class="flex-1 text-center flex items-center justify-center">
        <p class="bg-transparent border-none text-white space-x-1 text-2xl ">VisualDSA</p>
    </div>
    {#if $dsaStore} 
        <div class="flex gap-2 items-center">
            <Switch id="show-implementation" bind:checked={$showImplementation}/>
            <label for="show-implementation" class="text-white text-lg">Show Implementation</label>    
        </div>
        
    {/if}

</header>
