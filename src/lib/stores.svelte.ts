import { SelectionTracker } from '@/selection-tracker.svelte.ts';

export let delayStore = $state({ value: 0 });
export const selectionTracker = $state(new SelectionTracker());
export let showImplementation = $state({ value: false });

