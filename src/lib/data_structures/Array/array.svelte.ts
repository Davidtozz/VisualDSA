export const array = $state<{ value: number[] }>({ value: [] });
export const arrayAccess = $state<{ value: number | number[] }>({ value: -1 });
export const sortedUpTo = $state({ value: -1 });