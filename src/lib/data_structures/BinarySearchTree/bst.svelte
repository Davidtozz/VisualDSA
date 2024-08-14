<script lang="ts">
    import { bst } from '@/data_structures/BinarySearchTree/bst.ts';
    export let root = $bst.root;
    $: if(!root) root = $bst.root;

</script>


{#key $bst.nodes}
    <div class="size-fit p-4 flex flex-col items-center flex-1" >
        <div class="flex flex-col items-center  p-4">
            <div class="border-white border-2 rounded-full p-1" id='node-{root?.value}'>
                {#if root}
                    <h1 class="text-black flex items-center justify-center text-xl bg-white hover:bg-red-500 rounded-full select-none  border-white h-10 w-10 ">
                        {root.value}
                    </h1>
                {:else}
                    <h1 class="text-white text-2xl">BSTree is empty</h1>
                {/if}
            </div>
            {#if root && !(root.right || root.left)}
                <small class="text-white italic">leaf</small>
            {/if}
        </div>

        <div class="flex justify-between">
            {#if root?.right}
                <svelte:self root={root.right} />
            {/if}
            {#if root?.left}
                <svelte:self root={root?.left} />
            {/if}
        </div>
    </div>
{/key}