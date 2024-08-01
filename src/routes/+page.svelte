<script lang="ts">
  import Visualizer from './Visualizer.svelte';

    import Footer from '@/components/Controls.svelte';
    import Header from '@/components/Header.svelte';
    import Sidebar from '@/components/Sidebar.svelte';

    let running: boolean, pause: boolean;

</script>

<div class="h-dvh flex flex-row bg-primary">
    <Sidebar class="hidden lg:flex border-gray-800 border-r-[1px]"/>
    <main class="h-dvh flex flex-col overflow-auto bg-primary flex-[10]">
        <Header />
        <Visualizer class="flex-[5] flex items-end self-stretch overflow-hidden shadow-md" />
        <Footer class="bg-gray-800 flex flex-row" />
    </main>
</div>