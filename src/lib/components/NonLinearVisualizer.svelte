<script lang="ts">
	import { getVisualizationComponent } from '@/visualizer/visualization-types';
	import { SvelteComponent } from 'svelte';
	import type { IVisualizable } from '@/structures_new/nonlinear-datastructure.svelte';

	interface Props {
		/** The non-linear data structure instance to visualize */
		dataStructure: IVisualizable;
		/** Optional CSS class to apply to the container */
		class?: string;
	}

	let { dataStructure, class: className = '' }: Props = $props();

	let Component: typeof SvelteComponent | null = $state(null);
	let error: string | null = $state(null);

	$effect(async () => {
		try {
			const type = dataStructure.getVisualizationType();
			const module = await getVisualizationComponent(type);
			Component = module.default;
			error = null;
		} catch (err) {
			error = err instanceof Error ? err.message : String(err);
			Component = null;
		}
	});
</script>

<div class={className}>
	{#if error}
		<div class="flex items-center justify-center w-full h-full bg-red-900 bg-opacity-20 border border-red-500 rounded p-4">
			<div class="text-red-300 text-center">
				<p class="font-semibold">Visualization Error</p>
				<p class="text-sm">{error}</p>
			</div>
		</div>
	{:else if Component}
		<Component />
	{:else}
		<div class="flex items-center justify-center w-full h-full">
			<p class="text-gray-400">Loading visualizer...</p>
		</div>
	{/if}
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
