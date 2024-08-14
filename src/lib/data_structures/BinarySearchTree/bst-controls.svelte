<script>
    import { bst } from './bst.ts';
    import { onDestroy, onMount } from 'svelte';
    import { delay } from '@/utils.ts';
    import { CircleMinus, CirclePlus, Search } from 'lucide-svelte';

    onMount(() => {
        bst.randomize()
    })

    onDestroy(() => {
        $bst.clear();
    });

    async function handleFind() {
        const node = await bst.find(Number(prompt('Value: ')));
        if (node) {
            const nodeEl = document.getElementById(`node-${node.value}`);
            nodeEl?.classList.add('bg-green-500');
            console.log(nodeEl?.classList);

            await delay(200);
            alert(`Found node: ${node}`);
            nodeEl?.classList.remove('bg-green-500');
        } else {
            alert(`Node not found`);
        }
    }

</script>


<div class="flex flex-1 text-white">
    <button class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
            on:click={() => bst.insert()}
    >
        <CirclePlus />
        <pre>bst.insert()</pre>
    </button>

    <button
        class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
        on:click={handleFind}>
        <Search />
        <pre>bst.find()</pre>
    </button>

    <button
        class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
        on:click={()=>  bst.remove(Number(prompt("Enter a number to remove")))}
    >
        <CircleMinus />
        <pre>bst.remove()</pre>
    </button>

</div>