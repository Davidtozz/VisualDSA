//? shadcn utils
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { sorts } from './algorithms/sort/index';
import { dataStructures } from './data_structures';
import { fly, scale } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function flyAndScale(
	node: Element,
	params: { y?: number; x?: number; start?: number; duration?: number } = {}
) {
	const { y = 0, x = 0, start = 0.95, duration = 150 } = params;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;
		const percentage = (valueA - minA) / (maxA - minA);
		return percentage * (maxB - minB) + minB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration,
		delay: 0,
		css: (t: number) => {
			const y2 = scaleConversion(t, [0, 1], [start, 1]);
			const x2 = scaleConversion(t, [0, 1], [start, 1]);

			return styleToString({
				transform: `translate3d(${x * (1 - x2)}px, ${y * (1 - y2)}px, 0) scale(${y2})`,
				opacity: t
			});
		},
		easing: (t: number) => t
	};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
	? Omit<T, "children">
	: T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
	ref?: U | null;
};