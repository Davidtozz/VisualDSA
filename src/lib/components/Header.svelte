<script lang="ts">
    import {sortingFunctions} from '$lib/algorithms/sort';
    import { capitalizeFirstLetter, delay, randomNumber } from '$lib/utils';
    import * as Select from '@shadcn/select';
</script>

<header class="h-fit bg-gray-900 p-2 flex justify-center">
    <div class="relative inline-block text-left">
        <Select.Root>
            <Select.Trigger class="bg-transparent border-none text-white space-x-1">
                <p class="text-2xl">VisualDSA</p>
            </Select.Trigger>
            <Select.Content
                class="bg-gray-800 min-w-fit pb-8 pl-8 pr-8 border-none"
                sameWidth={false}
            >
                <div class="flex flex-row justify-between gap-4">
                    <div>
                        <h1 class="text-white font-bold text-lg cursor-default">Algorithms</h1>
                        <div>
                            {#each sortingFunctions.map(fn => fn.displayName) as algorithm}
                                <div
                                    class="bg-gray-800 hover:bg-blue-500 text-white p-2 cursor-pointer text-left"
                                >
                                    {capitalizeFirstLetter(algorithm)}
                                </div>
                            {/each}
                        </div>
                    </div>
                    <div class="min-w-fit flex flex-col">
                        <h1 class="text-white font-bold text-lg cursor-default">Data Structures</h1>
                        <div
                            class="bg-gray-800 hover:bg-blue-500 cursor-not-allowed text-white p-2 text-left"
                        >
                            Stack
                        </div>
                        <div
                            class="bg-gray-800 hover:bg-blue-500 cursor-not-allowed text-white p-2 text-left"
                        >
                            Queue
                        </div>
                        <div
                            class="bg-gray-800 hover:bg-blue-500 cursor-not-allowed text-white p-2 text-left"
                        >
                            Hashmap
                        </div>
                    </div>
                </div>
            </Select.Content>
        </Select.Root>
    </div>
</header>
