<script lang="ts">
    import Visualizer from '@/components/Visualizer.svelte';
    import Controls from '@/components/Controls.svelte';
    import Header from '@/components/Header.svelte';
    import Sidebar from '@/components/Sidebar.svelte';
    import FunctionPreview from '@/components/Implementation.svelte';
    import * as Resizable from '@shadcn/resizable'
    import { showImplementation } from '$lib/stores';
</script>

<div class="h-dvh flex bg-primary ">
    <Sidebar class="flex-col hidden lg:flex border-gray-800 border-r-[1px]"/>      
    <main class="h-full flex flex-col  bg-primary flex-[10]">
        <Header />                        
        <Resizable.PaneGroup direction="horizontal">
            <Resizable.Pane defaultSize={70}>
                <Visualizer class="flex-1 size-full flex shadow-md" />
            </Resizable.Pane>
            {#if $showImplementation}
                <Resizable.Handle withHandle/>             
                <Resizable.Pane defaultSize={30}>        
                    <FunctionPreview />
                </Resizable.Pane>
            {/if}
        </Resizable.PaneGroup>
        <Controls class="bg-gray-800 flex flex-row" />
    </main>
</div>