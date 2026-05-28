<script lang="ts">
    import { sortingAlgorithms } from '$lib/algorithms/sort';

    import Collapsible from '$lib/components/Collapsible.svelte';
    import GitHub from '@/components/icons/GitHub.svelte';
    import { dataStructures } from '@/data_structures';
    import { selectionTracker } from '@/stores.svelte.ts';

    interface Props {
        class?: string;
    }

    let { class: className = '' }: Props = $props();
</script>

<nav class="{className} justify-between">
    <div>
        <Collapsible
            title="Algorithms"
        >
            {#each Object.keys(sortingAlgorithms) as key}
                <div class="text-white indent-10 hover:bg-gray-800">
                    <input
                        type="radio"
                        bind:group={selectionTracker.selection}
                        class="peer"
                        name="sort"
                        value={key}
                        id={key}
                        hidden
                    />
                    <label
                        for={key}
                        class="flex-1 flex peer-checked:bg-blue-500 text-white cursor-pointer h-full items-center pt-2 pb-2"
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                </div>
            {/each}
        </Collapsible>

        <Collapsible
            title="Data Structures"
        >
            {#each Object.keys(dataStructures) as key}
                <div class="text-white indent-10 hover:bg-gray-800">
                    <input
                        type="radio"
                        bind:group={selectionTracker.selection}
                        class="peer"
                        name="sort"
                        value={key}
                        id={key}
                        hidden
                    />
                    <label
                        for={key}
                        class="flex-1 flex peer-checked:bg-blue-500 text-white cursor-pointer h-full items-center pt-2 pb-2"
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                </div>
            {/each}
        </Collapsible>
    </div>

    <div class="text-secondary p-4 flex justify-center gap-2">
        <div class="rounded-full flex">
            <a href="https://github.com/Davidtozz/VisualDSA" target="_blank">
                <GitHub class="max-w-6" />
            </a>
        </div>
        <p>Version: dev-{import.meta.env.VITE_GIT_COMMIT_REF}</p>
    </div>
</nav>
