<script lang="ts">
    export let rotate: boolean = false;
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-chevrons-down-up">
    <path d="m7 20 5-5 5 5" class="upper {rotate ? "rotate" : ""}" />
    <path d="m7 4 5 5 5-5" class="bottom {rotate ? "rotate" : ""}"/>
</svg>

<style>
    /* Flip both paths */
    .rotate {
        transform-box: fill-box;
        transform-origin: center;
/*         transition: all .3s ease-in-out; */
        transform: rotate(180deg);
    }

    
</style>