<script lang="ts">
    import type { Render } from "svelte-canvas";
    import { Layer } from "svelte-canvas";
    import {DISTANCE_BETWEEN_NODES} from "@/constants";
    import { linkedlist } from "./linkedlist";
    import { createEventDispatcher } from "svelte";

    export let value: number;
    export let index: number;

    const dispatch = createEventDispatcher();

    let render: Render;
    $: render = ({context, width, height}) => {
        const radius = 20;
         
        const offsetX = 50 + (index * DISTANCE_BETWEEN_NODES); // Calculate offsetX based on index
        const offsetY = (height / 2) + 5;
        
        context.beginPath();
        context.arc(offsetX, offsetY, radius, 0, 2 * Math.PI);
        context.fillStyle = 'white';
        context.fill();
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = '20px system-ui';

        context.fillText(value.toString(), offsetX, offsetY);
        
    }

function removeSelf() {
    $linkedlist.removeAt(index)
    $linkedlist = $linkedlist;
    dispatch('removed', {
        index,
        value
    })
}



</script>

<Layer {render} on:dblclick={removeSelf} /> 