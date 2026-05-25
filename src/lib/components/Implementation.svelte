<script lang="ts">
    import 'highlight.js/styles/github-dark-dimmed.min.css';
    import { dsaStore } from '@/stores';
    import { sorts } from '@/algorithms/sort/index';
    import { isDataStructure, isSortingAlgorithm } from '@/visualizer/utils';
    import { dataStructures } from '@/data_structures';
    import CodeSnippet from '@/components/CodeSnippet.svelte';

    let func = $derived(sorts.find((fn) => fn.name === $dsaStore));
    const className: string = '';
    export { className as class };
</script>

<div class="h-full overflow-y-auto p-3">
    {#if isSortingAlgorithm($dsaStore) && func}
        <details class="rounded border border-gray-700 bg-[#111827]" open>
            <summary class="cursor-pointer px-4 py-2 text-white">{func.name}() {typeof func.fn}</summary>
            <div class="px-2 pb-2">
                <CodeSnippet />
            </div>
        </details>
    {:else if isDataStructure($dsaStore)}
        {@const ds = dataStructures[$dsaStore]}
        <details class="rounded border border-gray-700 bg-[#111827]" open>
            <summary class="cursor-pointer px-4 py-2 text-white">
                <pre>class {ds.class.name}()</pre>
            </summary>
            <div class="px-2 pb-2">
                <CodeSnippet />
            </div>
        </details>
    {/if}
</div>

