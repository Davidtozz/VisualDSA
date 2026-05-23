import { dataStructures } from '@/data_structures';
import { visualizerFlags } from '../stores';
import { sorts } from '@/algorithms/sort';

export function randomNumber(from: number, to: number) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function resetFlags() {
	visualizerFlags.sorted = true;
	visualizerFlags.sorting = false
}

export function stopSorting() {
	visualizerFlags.stopRequested = true;
	visualizerFlags.sorting = false;
}

export function isSortingAlgorithm(name: string): boolean {
	for (const fn of sorts) {
		if (fn.name === name) return true;
	}

	return false;
}

export function isDataStructure(name: string): boolean {
	console.log("(IsDataStructure) name: ", name);
	return Object.keys(dataStructures)
		.map(key => key.toLowerCase())
		.includes(name.toLowerCase());
}