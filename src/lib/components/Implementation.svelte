<script lang="ts">
    import { writable } from 'svelte/store';
    import 'highlight.js/styles/github-dark-dimmed.min.css';
    import Highlight, { LineNumbers } from 'svelte-highlight';
    import javascript from 'svelte-highlight/languages/javascript';
    import * as Resizable from '@shadcn/resizable';
    import * as Accordion from '@shadcn/accordion';
    import { dsaStore } from '@/stores';
    import { sorts } from '@/algorithms/sort/index';
    import type { PaneProps } from 'paneforge';
    import ScrollArea from './ui/scroll-area/scroll-area.svelte';
    import { isDataStructure, isSortingAlgorithm } from '@/utils';
    import { dataStructures } from '@/data_structures';
    

    export let fontSize = writable<number>(12);
    $: func = sorts.find((fn) => fn.name === $dsaStore)!;

    const className: string = '';
    export { className as class };
</script>

<!-- TODO show a vertical tab rotated by -90deg when the pane is collapsed -->
<ScrollArea orientation="vertical" class="h-full p-3">
    {#if isSortingAlgorithm($dsaStore)}
    <h1 class="text-white text-center">{func.displayName}</h1>
    <Accordion.Root>
        <Accordion.Item value={func.displayName}>
            <Accordion.Trigger class="text-white indent-5">{func.name}() {typeof func.fn}</Accordion.Trigger>
            <Accordion.Content>
                <Highlight language={javascript} code={func.fn.toString()} let:highlighted>
                    <LineNumbers
                {highlighted}
                wrapLines={true}
                --highlighted-background-color="#2d2d2d"
                style="font-size: {$fontSize}px; flex-grow:1;"
                />
                </Highlight>    
            </Accordion.Content>
        </Accordion.Item>

    {#if func.utils}
        {#each func.utils as u}
            <Accordion.Item value={u.name}>
                <Accordion.Trigger class="text-white indent-5">{u.name}() </Accordion.Trigger>
                <Accordion.Content>
                    <Highlight language={javascript} code={u.toString()} let:highlighted>
                        <LineNumbers
                    {highlighted}
                    wrapLines={true}
                    --highlighted-background-color="#2d2d2d"
                    style="font-size: {$fontSize}px; flex-grow:1;"
                    />
                    </Highlight>    
                </Accordion.Content>
            </Accordion.Item>
        {/each}
    {/if}
    </Accordion.Root>


    {:else if isDataStructure($dsaStore)}
        <h1 class="text-white text-center">{dataStructures[$dsaStore].name}</h1>
        <Accordion.Root>
            <Accordion.Item value={dataStructures[$dsaStore].name}>
                <Accordion.Trigger class="text-white indent-5">
                    
                    <pre>class {dataStructures[$dsaStore].name}()</pre> </Accordion.Trigger>
                <Accordion.Content>
                    <Highlight language={javascript} code={dataStructures[$dsaStore].toString()} let:highlighted>
                        <LineNumbers
                    {highlighted}
                    wrapLines={true}
                    --highlighted-background-color="#2d2d2d"
                    style="font-size: {$fontSize}px; flex-grow:1;"
                    />
                    </Highlight>    
                </Accordion.Content>
            </Accordion.Item>
            <h2 class="text-white p-2">Methods</h2>
            {#each dataStructures[$dsaStore].methods as m}
            <!-- Class methods -->
                <Accordion.Item value={m.name}>
                    <Accordion.Trigger class="text-white indent-5">{m.name}() </Accordion.Trigger>
                    <Accordion.Content>
                        <Highlight language={javascript} code={m.toString()} let:highlighted>
                            <LineNumbers
                        {highlighted}
                        wrapLines={true}
                        --highlighted-background-color="#2d2d2d"
                        style="font-size: {$fontSize}px; flex-grow:1;"
                        />
                        </Highlight>    
                    </Accordion.Content>
                </Accordion.Item>
            {/each}
            <h2 class="text-white p-2">Properties</h2>
            {#each dataStructures[$dsaStore].fields as f}
            <!-- Class methods -->
                <Accordion.Item value={f.name}>
                    <Accordion.Trigger class="text-white indent-5">{f.name}: {f.type}</Accordion.Trigger>
                    <Accordion.Content>

                    </Accordion.Content>
                </Accordion.Item>
            {/each}
        </Accordion.Root>
    {:else} 

    <h1 class="text-white text-center">Not implemented yet</h1>
{/if}
</ScrollArea>