import { SelectionTracker } from '@/selection-tracker.svelte.ts';

export interface VisualizerFlags {
    sorted: boolean;
    sorting: boolean;
    stopRequested: boolean;
}

export let visualizerFlags = $state<VisualizerFlags>({
    sorted: false,
    sorting: false,
    stopRequested: false,
});

export let delayStore = $state({ value: 0 });
export const selectionTracker = $state(new SelectionTracker());
export let showImplementation = $state({ value: false });

