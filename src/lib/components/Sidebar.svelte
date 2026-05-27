<script lang="ts">
    import { sorts } from '$lib/algorithms/sort';

    import ChevronsDownUp from '$lib/components/ChevronsDownUp.svelte';
    import GitHub from '@/components/icons/GitHub.svelte';
    import { dataStructures } from '@/data_structures';
    import { selectionTracker } from '@/stores.svelte.ts';

    let algCollapsible: boolean = $state(false);
    let dsCollapsible: boolean = $state(false);

    interface Props {
        class?: string;
    }

    let { class: className = '' }: Props = $props();
    
</script>

<nav class="{className} justify-between">
    <div>
        <!-- ? Algorithms -->
        <button
            type="button"
            class="flex w-full cursor-pointer items-center justify-between bg-primary p-2 text-white hover:bg-gray-800"
            onclick={() => {
                algCollapsible = !algCollapsible;
                if (algCollapsible) dsCollapsible = false;
            }}
        >
            <p class="text-xl p-1">Algorithms</p>
            <ChevronsDownUp rotate={algCollapsible} />
        </button>

        {#if algCollapsible}
                {#each sorts as sorting_algorithm}
                    <div class="text-white indent-10 hover:bg-gray-800" >
                        <input
                            type="radio"
                            bind:group={selectionTracker.selection}
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
        {/if}

        <!-- ? Data Structures -->
        <button
            type="button"
            class="flex w-full cursor-pointer items-center justify-between bg-primary p-2 text-white hover:bg-gray-800"
            onclick={() => {
                dsCollapsible = !dsCollapsible;
                if (dsCollapsible) algCollapsible = false;
            }}
        >
            <p class="text-xl p-1">Data Structures</p>
            <ChevronsDownUp rotate={dsCollapsible} />
        </button>

        {#if dsCollapsible}
                {#each Object.keys(dataStructures) as _}
                    {@const ds = dataStructures[_].class.name}
                    <div class="text-white indent-10 hover:bg-gray-800">
                        <input
                            type="radio"
                            bind:group={selectionTracker.selection}
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
        {/if}
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
