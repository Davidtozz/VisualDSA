<script lang="ts">
  import Visualizer from '@/components/Visualizer.svelte';

    import Controls from '@/components/Controls.svelte';
    import Header from '@/components/Header.svelte';
    import Sidebar from '@/components/Sidebar.svelte';
    import FunctionPreview from '@/components/FunctionPreview.svelte';
    import * as Resizable from '@shadcn/resizable'

    let running: boolean, pause: boolean;

    const paneConfig = {
        minSize: 20,
        maxSize: 20,
        collapsible: false
    }

</script>

<div class="h-dvh bg-primary">
    <Resizable.PaneGroup direction="horizontal">
        <Resizable.Pane {...paneConfig}>
            <Sidebar class="flex-col hidden lg:flex border-gray-800 border-r-[1px]"/>
        </Resizable.Pane>
        <Resizable.Handle withHandle/>
        <Resizable.Pane>
            <main class="h-dvh flex flex-col overflow-auto bg-primary flex-[10]">
                <Header />
                <Visualizer class="flex-[5] flex items-end self-stretch overflow-hidden shadow-md" />
                <Controls class="bg-gray-800 flex flex-row" />
            </main>
        </Resizable.Pane>
        <Resizable.Handle/>
        <Resizable.Pane>
            <FunctionPreview class="max-w-32 " />
        </Resizable.Pane>
    </Resizable.PaneGroup>

</div>