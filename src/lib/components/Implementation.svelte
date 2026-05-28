<script lang="ts">
    import 'highlight.js/styles/github-dark-dimmed.min.css';
    import CodeSnippet from '@/components/CodeSnippet.svelte';
    import { selectionTracker } from '@/stores.svelte.ts';
</script>

<div class="h-full overflow-y-auto p-3">
    {#if selectionTracker.sortFunction}
        {@const sortFn = selectionTracker.sortFunction as Function}
        <details class="rounded border border-gray-700 bg-[#111827]" open>
            <summary class="cursor-pointer px-4 py-2 text-white">{selectionTracker.sortFunction.name}
                () {typeof sortFn}</summary>
            <div class="px-2 pb-2">
                <CodeSnippet />
            </div>
        </details>
    {:else if selectionTracker.dataStructure}
        {@const dataStructure = selectionTracker.dataStructure}
        <details class="rounded border border-gray-700 bg-[#111827]" open>
            <summary class="cursor-pointer px-4 py-2 text-white">
                <pre>class {dataStructure.name}()</pre>
            </summary>
            <div class="px-2 pb-2">
                <CodeSnippet />
            </div>
        </details>
    {/if}
</div>

