//? shadcn utils
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { visualizerFlags } from './stores';
import { sorts } from './algorithms/sort/index';
import { dataStructures } from './data_structures';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};


/* VisualDSA utils */
export function randomNumber(from: number, to: number) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function delay(ms)  {
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
	for(const fn of sorts) {
		if(fn.name === name) return true;
	}

	return false;
}

export function isDataStructure(name: string): boolean {
	console.log("(IsDataStructure) name: ", name);
	return Object.keys(dataStructures)
		.map(key => key.toLowerCase())
		.includes(name.toLowerCase());
}

export function generateUID(): string {
	// I generate the UID from two parts here
	// to ensure the random number provide enough bits.
	let firstPart: string | number = (Math.random() * 46656) | 0;
	let secondPart: string | number = (Math.random() * 46656) | 0;
	firstPart = ('000' + firstPart.toString(36)).slice(-3);
	secondPart = ('000' + secondPart.toString(36)).slice(-3);
	return firstPart + secondPart;
}