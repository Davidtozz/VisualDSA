<script lang="ts">
    import { derived, writable } from 'svelte/store';
    import 'highlight.js/styles/github-dark-dimmed.min.css';
    import Highlight, { LineNumbers } from 'svelte-highlight';
    import * as Select from '@shadcn/select';
    import JS from '@/components/icons/JS.svelte';
    import Java from '@/components/icons/Java.svelte';
    import TS from '@/components/icons/TS.svelte';
    import C from '@/components/icons/C.svelte';
    import Cpp from '@/components/icons/Cpp.svelte';
    import type { LanguageType } from 'svelte-highlight/languages';
    import { createEventDispatcher } from 'svelte';
    import { ClassBuilder, isSortingAlgorithm } from '@/utils.ts';
    import { dsaStore } from '@/stores.ts';
    import CodeSnippets from '@/code-snippets.json';
    import typescript from 'svelte-highlight/languages/typescript';
    import cpp from 'svelte-highlight/languages/cpp';
    import java from 'svelte-highlight/languages/java';
    import javascript from 'svelte-highlight/languages/javascript';
    import c from 'svelte-highlight/languages/c';


    const language = {
        'TypeScript': {
            'icon': TS,
            'highlighter': typescript
        },
        'JavaScript': {
            'icon': JS,
            'highlighter': javascript
        },
        'Java': {
            'icon': Java,
            'highlighter': java
        },
        'C': {
            'icon': C,
            'highlighter': c
        },
        'C++': {
            'icon': Cpp,
            'highlighter': cpp
        }
    };

    const selected = writable({
        value: 'TypeScript',
        label: ' TypeScript',
        disabled: false
    });


    const codeSnippet = derived(selected, ($new) => {

        if (isSortingAlgorithm($dsaStore)) {
            return {
                linter: language[$new.value].highlighter,
                code: CodeSnippets['Algorithms']['sorts'][$dsaStore]['code'][$new.value],
                icon: language[$new.value].icon
            };
        } else {
            const code = CodeSnippets['DataStructures'][$dsaStore]['code'][$new.value];

            return {
                linter: language[$new.value].highlighter,
                code,
                icon: language[$new.value].icon
            };
        }
    });
</script>

<div class="inline-block">
    <Select.Root bind:selected={$selected}>
        <Select.Trigger class="border-none bg-[#2E353FFF] rounded-b-none">
            <Select.Value asChild let:label let:attrs>
                <div {...attrs} class="w-24 text-right text-base text-white flex justify-start gap-1">
                    <svelte:component this={$codeSnippet.icon} size={24} />
                    {label}
                </div>
            </Select.Value>
        </Select.Trigger>
        <Select.Content class="bg-[#2E353FFF] text-white border-none" sameWidth={false}>
            {#each Object.entries(language) as [lang, { icon }]}
                <Select.Item value={lang}
                             class="gap-2 text-base cursor-pointer data-[highlighted]:bg-[#3E4652FF] data-[highlighted]:text-white">
                    <svelte:component this={icon} size={20} />
                    {lang}
                </Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>
</div>
<Highlight language={$codeSnippet.linter} code={$codeSnippet.code}
           class="rounded-lg rounded-tl-none overflow-clip select" let:highlighted>
    <LineNumbers {highlighted} wrapLines={true} />
</Highlight>