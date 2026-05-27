<script lang="ts">
    import { selectionTracker } from '@/stores.svelte.ts';

    interface Props {
        class?: string;
    }

    let { class: className = '' }: Props = $props();
    const SelectedControls = $derived(selectionTracker.controlsComponent);

</script>

<footer class={className}>
    {#if SelectedControls}
        <SelectedControls />
    {/if}
</footer>