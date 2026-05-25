<script lang="ts">
    import { derived, writable } from 'svelte/store';
    import 'highlight.js/styles/github-dark-dimmed.min.css';
    import { HighlightSvelte } from 'svelte-highlight';
    import JS from '@/components/icons/JS.svelte';
    import Java from '@/components/icons/Java.svelte';
    import TS from '@/components/icons/TS.svelte';
    import C from '@/components/icons/C.svelte';
    import Cpp from '@/components/icons/Cpp.svelte';
    import { isSortingAlgorithm } from '@/visualizer/utils';
    import { dsaStore } from '@/stores.ts';
    import CodeSnippets from '@/code-snippets.json';


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
    const selectedLanguage = writable<LanguageName>('TypeScript');

    const codeSnippet = derived([selectedLanguage, dsaStore], ([$language, $dsaStore]) => {
        if (isSortingAlgorithm($dsaStore)) {
            const code = CodeSnippets['Algorithms']['sorts'][$dsaStore]['code'][$language] ?? '';
            return {
                lang: language[$language].lang,
                code,
                icon: language[$language].icon
            };
        } else {
            const code = CodeSnippets['DataStructures'][$dsaStore]['code'][$language] ?? '';

            return {
                lang: language[$language].lang,
                code,
                icon: language[$language].icon
            };
        }
    });
</script>

<div class="inline-flex items-center gap-2 rounded-t-md bg-[#2E353FFF] px-3 py-2 text-white">
    <svelte:component this={$codeSnippet.icon} size={20} />
    <select
        bind:value={$selectedLanguage}
        class="rounded border-none bg-transparent text-sm outline-none"
        aria-label="Select snippet language"
    >
        {#each Object.keys(language) as lang}
            <option value={lang} class="bg-[#2E353FFF]">{lang}</option>
        {/each}
    </select>
</div>

<HighlightSvelte lang={$codeSnippet.lang} code={$codeSnippet.code}
                 class="rounded-lg rounded-tl-none overflow-clip select" />
