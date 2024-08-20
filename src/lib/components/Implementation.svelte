<script lang="ts">
    import 'highlight.js/styles/github-dark-dimmed.min.css';
    import * as Resizable from '@shadcn/resizable';
    import * as Accordion from '@shadcn/accordion';
    import { dsaStore } from '@/stores';
    import { sorts } from '@/algorithms/sort/index';
    import ScrollArea from './ui/scroll-area/scroll-area.svelte';
    import { ClassBuilder, isDataStructure, isSortingAlgorithm } from '@/utils';
    import { dataStructures } from '@/data_structures';
    import CodeSnippet from '@/components/CodeSnippet.svelte';


    $: func = sorts.find((fn) => fn.name === $dsaStore)!;

    console.log($dsaStore);
    const className: string = '';
    export { className as class };
</script>

<!-- TODO show a vertical tab rotated by -90deg when the pane is collapsed -->
<ScrollArea orientation="vertical" class="h-full p-3">
    <Accordion.Root>

        <!--  TODO merge sections -->
    {#if isSortingAlgorithm($dsaStore)}
        <Accordion.Item value={func.displayName}>
            <Accordion.Trigger class="text-white indent-5">{func.name}() {typeof func.fn}</Accordion.Trigger>
            <Accordion.Content>
                <CodeSnippet />
            </Accordion.Content>
        </Accordion.Item>
    {:else if isDataStructure($dsaStore)}
        {@const ds = dataStructures[$dsaStore]}

        <Accordion.Item value={ds.class.name}>
            <Accordion.Trigger class="text-white indent-5">
                <pre>class {ds.class.name}()</pre>
            </Accordion.Trigger>
                <Accordion.Content>
                    <CodeSnippet />
                </Accordion.Content>
            </Accordion.Item>
    {/if}
    </Accordion.Root>
</ScrollArea>

