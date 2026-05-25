<script lang="ts">
    import Visualizer from '@/components/Visualizer.svelte';
    import Controls from '@/components/Controls.svelte';
    import Header from '@/components/Header.svelte';
    import Sidebar from '@/components/Sidebar.svelte';
    import Implementation from '@/components/Implementation.svelte';
    import { showImplementation } from '$lib/stores';
</script>

<div class="h-dvh flex bg-primary ">
    <Sidebar class="flex-col hidden lg:flex border-gray-800 border-r-[1px]"/>      
    <main class="h-full flex flex-col  bg-primary flex-[10]">
        <Header />
        <div class="flex flex-1 min-h-0">
            <div class="flex-1 min-w-0">
                <Visualizer class="flex-1 size-full flex shadow-md" />
            </div>
            {#if $showImplementation}
                <aside class="w-1/3 min-w-[320px] border-l border-gray-800 bg-[#0f1724]">
                    <Implementation />
                </aside>
            {/if}
        </div>
        <Controls class="bg-gray-800 flex flex-row" />
    </main>
</div>