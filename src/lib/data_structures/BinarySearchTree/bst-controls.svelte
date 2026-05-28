<script>
    import { bst } from './bst.svelte.ts';
    import { onDestroy, onMount } from 'svelte';
    import { CircleMinus, CirclePlus, Search, Shuffle } from 'lucide-svelte';

    onMount(() => {
        bst.randomize()
    })

    onDestroy(() => {
        bst.clear();
    });

    async function handleFind() {
        const input = prompt('Value: ');
        if (input === null) return;

        const value = Number(input);
        if (Number.isNaN(value)) return;

        const node = await bst.find(value);
        if (node) {
            alert(`Found node: ${node}`);
        } else {
            alert(`Node not found`);
        }
    }

</script>


<div class="flex flex-1 text-white">
    <button
        class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
        onclick={() => bst.randomize()}
    >
        <Shuffle size={20} />
        <span class="font-mono">bst.randomize()</span>
    </button>
    <button class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
            onclick={() => bst.insert()}
    >
        <CirclePlus />
        <span class="font-mono">bst.insert()</span>
    </button>

    <button
        class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
        onclick={handleFind}>
        <Search />
        <span class="font-mono">bst.find()</span>
    </button>

    <button
        class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
        onclick={()=>  bst.remove(Number(prompt("Enter a number to remove")))}
    >
        <CircleMinus />
        <span class="font-mono">bst.remove()</span>
    </button>

</div>