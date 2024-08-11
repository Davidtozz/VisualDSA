<script>
    import { BinarySearchTree, bst } from './bst.ts';
import { afterUpdate, beforeUpdate, onDestroy, onMount, tick } from 'svelte';
import { randomNumber } from '@/utils.ts';



    function handleRandomize() {
        bst.randomize()
    }

</script>


<div class="flex flex-1 text-white">
    <button
        class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-2 border-gray-800 hover:bg-gray-800 text-white gap-2"
        on:click={handleRandomize}
    >
        <pre>bst.randomize()</pre>
    </button>
    <button class="flex flex-row grow items-center justify-center p-3 bg-primary border-l-1 border-t-2 border-r-0 border-gray-800 hover:bg-gray-800 text-white gap-2"
            on:click={()=>  bst.insert()}
    >
        <pre>bst.insert()</pre>
    </button>

</div>