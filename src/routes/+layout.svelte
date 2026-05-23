<script>
    import '../app.css';
    import { Toaster } from '@shadcn/sonner/index';
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

{@render children?.()}
<Toaster position="top-center" richColors />