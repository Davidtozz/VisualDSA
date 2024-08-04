<script lang="ts">
    import { sortingFunctions } from '$lib/algorithms/sort';
    import { capitalizeFirstLetter } from '$lib/utils';
    import * as Collapsible from '@shadcn/collapsible';
    import ChevronsDownUp from '$lib/components/ChevronsDownUp.svelte';
    import { dsaStore } from '$lib/stores';
    import GitHub from '@/components/GitHub.svelte';
    import * as DataStructures from '$lib/data_structures/index';
    import { createEventDispatcher } from 'svelte';

    let algCollapsible: boolean;
    let dsCollapsible: boolean;

    let className = '';
    export { className as class };
</script>

<nav class="{className} justify-between">
    <div>
        <!-- ? Algorithms -->
        <Collapsible.Root bind:open={algCollapsible} onOpenChange={() => (dsCollapsible = false)}>
            <Collapsible.Trigger class="w-fit self-stretch" asChild let:builder>
                <div
                    class="flex-1 cursor-pointer bg-primary items-center flex justify-between text-white p-2 hover:bg-gray-800"
                    {...builder}
                    use:builder.action
                >
                    <p class="text-xl p-1">Algorithms</p>
                    <ChevronsDownUp rotate={algCollapsible} />
                </div>
            </Collapsible.Trigger>
            <Collapsible.Content>
                {#each sortingFunctions as sorting_algorithm}
                    <div class="text-white indent-10 hover:bg-gray-800">
                        <input
                            type="radio"
                            bind:group={$dsaStore}
                            class="peer"
                            name="sort"
                            value={sorting_algorithm.name}
                            id={sorting_algorithm.name}
                            hidden
                        />
                        <label
                            for={sorting_algorithm.name}
                            class="flex-1 flex peer-checked:bg-blue-500 text-white cursor-pointer h-full items-center pt-2 pb-2"
                        >
                            {sorting_algorithm.displayName}
                        </label>
                    </div>
                {/each}
            </Collapsible.Content>
        </Collapsible.Root>

        <!-- ? Data Structures -->
        <Collapsible.Root bind:open={dsCollapsible} onOpenChange={() => (algCollapsible = false)}>
            <Collapsible.Trigger class="w-fit self-stretch" asChild let:builder>
                <div
                    class="flex-1 cursor-pointer bg-primary items-center flex justify-between text-white p-2 hover:bg-gray-800"
                    {...builder}
                    use:builder.action
                >
                    <p class="text-xl p-1">Data Structures</p>
                    <ChevronsDownUp rotate={dsCollapsible} />
                </div>
            </Collapsible.Trigger>
            <Collapsible.Content>
                {#each Object.keys(DataStructures) as ds}
                    <div class="text-white indent-10 hover:bg-gray-800">
                        <input
                            type="radio"
                            bind:group={$dsaStore}
                            class="peer"
                            name="sort"
                            value={ds.toLowerCase()}
                            id={ds.toLowerCase()}
                            hidden
                        />
                        <label
                            for={ds.toLowerCase()}
                            class="flex-1 flex peer-checked:bg-blue-500 text-white cursor-pointer h-full items-center pt-2 pb-2"
                        >
                            {ds}
                        </label>
                    </div>
                {/each}
            </Collapsible.Content>
        </Collapsible.Root>
    </div>
    <!-- ? Algorithms -->

    <div class="text-secondary p-4 flex justify-center gap-2">
        <div class="rounded-full flex">
            <a href="https://github.com/Davidtozz/VisualDSA" target="_blank">
                <GitHub class="max-w-6" />
            </a>
        </div>
        <p>Version: dev-{import.meta.env.VITE_GIT_COMMIT_REF}</p>
    </div>
</nav>
