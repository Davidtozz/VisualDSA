<script lang="ts">
    import 'highlight.js/styles/github-dark-dimmed.min.css';
    import { HighlightSvelte } from 'svelte-highlight';
    import JS from '@/components/icons/JS.svelte';
    import Java from '@/components/icons/Java.svelte';
    import TS from '@/components/icons/TS.svelte';
    import C from '@/components/icons/C.svelte';
    import Cpp from '@/components/icons/Cpp.svelte';
    import { isSortingAlgorithm } from '@/visualizer/utils';
    import CodeSnippets from '@/code-snippets.json';
    import { selectionTracker } from '@/stores.svelte.ts';


    const language = {
        'TypeScript': {
            'icon': TS,
            'lang': 'typescript'
        },
        'JavaScript': {
            'icon': JS,
            'lang': 'javascript'
        },
        'Java': {
            'icon': Java,
            'lang': 'java'
        },
        'C': {
            'icon': C,
            'lang': 'c'
        },
        'C++': {
            'icon': Cpp,
            'lang': 'cpp'
        }
    } as const;

    type LanguageName = keyof typeof language;
    let selectedLanguage = $state<LanguageName>('TypeScript');

    let codeSnippet = $derived({
        lang: language[selectedLanguage].lang,
        icon: language[selectedLanguage].icon,
        code: (isSortingAlgorithm(selectionTracker.selection)
                ? CodeSnippets['algorithms']['sorts']
                : CodeSnippets['datastructures']
        )[selectionTracker.selection]['code'][selectedLanguage] ?? ''
    });
    const LanguageIcon = $derived(codeSnippet.icon);
</script>

<div class="inline-flex items-center gap-2 rounded-t-md bg-[#2E353FFF] px-3 py-2 text-white">
    <LanguageIcon size={20} />
    <select
        bind:value={selectedLanguage}
        class="rounded border-none bg-transparent text-sm outline-none"
        aria-label="Select snippet language"
    >
        {#each Object.keys(language) as lang}
            <option value={lang} class="bg-[#2E353FFF]">{lang}</option>
        {/each}
    </select>
</div>

<HighlightSvelte lang={codeSnippet.lang} code={codeSnippet.code}
                 class="rounded-lg rounded-tl-none overflow-clip select" />
