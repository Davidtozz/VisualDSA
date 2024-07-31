<script lang="ts">
    import { dev } from "$app/environment";
    import { goto } from "$app/navigation";
    import ArrayVisualizer from "@/components/ArrayVisualizer.svelte";

    if(!dev) goto('/')

</script>

{#if dev} 
    <ArrayVisualizer />
{/if}
