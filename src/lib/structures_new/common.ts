/**
 * Common operations for collections.
 */
export interface Collection {
    size(): number;
    isEmpty(): boolean;
    clear(): void;
}

export interface ToArray<T> {
    toArray(): T[];
}

export interface Contains<T> {
    contains(element: T): boolean;
}
