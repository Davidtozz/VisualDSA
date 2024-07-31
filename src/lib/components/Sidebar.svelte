<script lang="ts">
    import sorts from '$lib/algorithms/sort';
    import { capitalizeFirstLetter } from '$lib/utils';
    import * as Collapsible from '@shadcn/collapsible';
    import ChevronsDownUp from '$lib/components/ChevronsDownUp.svelte';
    import { algorithm } from '$lib/stores';
    import Github from '@/components/GitHub.svelte';
    import GitHub from '@/components/GitHub.svelte';

    let selectedAlgorithm: string = '';
    let isOpen = false;

    let className = '';
    export {className as class};
</script>

<nav class="flex-[2] flex flex-col {className} justify-between">

    <Collapsible.Root onOpenChange={() => (isOpen = !isOpen)}>
        <Collapsible.Trigger class="w-fit self-stretch" asChild let:builder>
            <div
                class="flex-1 cursor-pointer bg-primary items-center flex justify-between text-white p-2"
                {...builder}
                use:builder.action
            >
                <p class="text-2xl p-1">Algorithms</p>
                <ChevronsDownUp rotate={isOpen} />
            </div>
        </Collapsible.Trigger>
        <Collapsible.Content>
            {#each Object.keys(sorts) as sorting_algorithm}
                <div class="text-white indent-10 hover:bg-gray-800 pt-2 pb-2">
                    <input
                        type="radio"
                        bind:group={$algorithm}
                        class="peer"
                        name="sort"
                        value={sorting_algorithm}
                        id={sorting_algorithm}
                        hidden
                    />
                    <label
                        for={sorting_algorithm}
                        class="flex-1 flex peer-checked:bg-blue-500 text-white cursor-pointer h-full items-center"
                    >
                        {capitalizeFirstLetter(sorting_algorithm)}
                    </label>
                </div>
            {/each}
        </Collapsible.Content>
    </Collapsible.Root>
    <div class="text-secondary p-2 text-center flex items-center self-center gap-2">
        <div class="bg-white rounded-full flex">
            <a href="https://github.com/Davidtozz/VisualDSA" target="_blank">
                <GitHub class="w-7 "/>
            </a>
        </div>

       Version: {import.meta.env.VITE_GIT_COMMIT_REF}
    </div>
</nav>