import { SelectionTracker } from '@/selection-tracker.svelte.ts';

export const selectionTracker = $state(new SelectionTracker());