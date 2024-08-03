<script lang="ts">
    import { writable } from 'svelte/store';
    import hljs from 'highlight.js/lib/core';
    import 'highlight.js/styles/github-dark.min.css'
    import {bubbleSort} from '$lib/algorithms/sort';
    import { visualizerFlags } from '@/stores';
    import Highlight, {LineNumbers} from 'svelte-highlight';
    import javascript from "svelte-highlight/languages/javascript"
    import * as Resizable from '@shadcn/resizable'
    import { algorithm } from '@/stores';
    import { sortingFunctions } from '$lib/algorithms/sort';


    export let fontSize = writable<number>(12);
    $: func = sortingFunctions.find(fn => fn.name === $algorithm)?.fn.toString() ?? '// Click on a function to view its code!';
    
    let currentStep = writable();
    const className: string = '';
    export { className as class};
</script>


    
<Highlight language={javascript} code={func} let:highlighted>
    <LineNumbers {highlighted} wrapLines={true}
    highlightedLines={[$currentStep]}
    --highlighted-background-color="#2d2d2d"
    style="font-size: {$fontSize}px; flex-grow:1;"
    />
</Highlight>    
      
