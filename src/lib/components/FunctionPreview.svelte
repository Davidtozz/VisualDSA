<script lang="ts">
    import { writable } from 'svelte/store';
    import 'highlight.js/styles/github-dark.min.css';
    import Highlight, { LineNumbers } from 'svelte-highlight';
    import javascript from 'svelte-highlight/languages/javascript';
    import * as Resizable from '@shadcn/resizable';
    import { dsaStore } from '@/stores';
    import { sortingFunctions } from '$lib/algorithms/sort';
    import type { PaneProps } from 'paneforge';

    export let fontSize = writable<number>(12);
    $: func =
        sortingFunctions.find((fn) => fn.name === $dsaStore)?.fn.toString() ??
        '// Click on a function to view its code!';

    //! Not implemented yet
    let currentStep = writable<number>();

    const className: string = '';
    export { className as class };
    const paneConfig: PaneProps = {
        maxSize: 50,
        defaultSize: 25,
        minSize: 23,
        collapsible: false
    };
</script>

<!-- TODO show a vertical tab rotated by -90deg when the pane is collapsed -->
<Resizable.Pane {...paneConfig}>
    <Highlight language={javascript} code={func} let:highlighted>
        <LineNumbers
            {highlighted}
            wrapLines={true}
            highlightedLines={[$currentStep]}
            --highlighted-background-color="#2d2d2d"
            style="font-size: {$fontSize}px; flex-grow:1;"
        />
    </Highlight>
</Resizable.Pane>
