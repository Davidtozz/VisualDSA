<script>
    import { afterUpdate, onDestroy, onMount } from 'svelte';
    import { bst } from '@/data_structures/BinarySearchTree/bst.ts';
    export let root = $bst.root;

</script>



<div class="size-fit p-4 flex flex-col items-center flex-1">

        <div class="flex justify-center  p-4">
            <div class="border-white border-2 rounded-full p-1 pointer-events-none">
                <h1
                    class="text-black flex items-center justify-center
                    text-xl bg-white rounded-full select-none  border-white h-10 w-10 ">
                    {root?.value}
                </h1>
            </div>
        </div>

        <div class="flex justify-between">
            {#if root?.right}
                {@const rightNode = root.right}
                <!--@ts-ignore-->
                <svelte:self root={rightNode} />
            {/if}
            {#if root?.left}
                {@const leftNode = root.left}
                <svelte:self root={leftNode} />
            {/if}
        </div>
</div>