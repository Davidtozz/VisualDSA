import { get, writable, type Writable } from "svelte/store";
import { randomNumber } from "./utils";

function createArrayStore() {

    interface ArrayStore {
        subscribe: Writable<number[]>['subscribe'];
        set: Writable<number[]>['set'];
        update: Writable<number[]>['update'];
        push: (value: number) => void;
        clear: () => void;
        length: number;
    }

    const { subscribe, set, update } = writable<number[]>([]);

    const arrayStore: ArrayStore = {
        subscribe,
        set,
        update,
        push: (value: number) => {
            update(array => {
                array.push(value);
                return array;
            });
        },
        clear: () => {
            set([]);
        },
        get length() {
            return get(arrayStore).length;
        } 
    };

    //? Allows the use of bracket notation 
    const handler = {
        get(target, prop) {
            if (prop in target) {
                return target[prop];
            }
            const array = get(target);
            if (typeof prop === 'string' && !isNaN(Number(prop))) {
                //@ts-ignore
                return array[Number(prop)];
            }
            return undefined;
        },
        set(target: { [x: string]: any; }, prop: string, value: number) {
            if (prop in target) {
                target[prop] = value;
                return true;
            }
            if (typeof prop === 'string' && !isNaN(Number(prop))) {
                update(array => {
                    array[Number(prop)] = value;
                    return array;
                });
                return true;
            }
            return false;
        }
    }

    return new Proxy<ArrayStore>(arrayStore, handler);
}


export interface VisualizerFlags {
    sorted: boolean;
    sorting: boolean;
    stopRequested: boolean;
}

function createVisualizerFlagStore() {
    const store = writable<VisualizerFlags>({
        sorted: false,
        sorting: false,
        stopRequested: false,
    });

    const { subscribe, set, update } = store


    return {
        subscribe,
        set,
        update,
        set sorted(value: boolean) {{
            update(flags => {
                return {...flags, sorted: value};
            });
        }},
        get sorted() {
            return get(store).sorted;
        },
        set sorting(value: boolean) {{
            update(flags => {
                return {...flags, sorting: value};
            });
        }},
        get sorting() {
            return get(store).sorting;
        },
        set stopRequested(value: boolean) {{
            update(flags => {
                return {...flags, stopRequested: value};
            });
        }},
        get stopRequested() {
            return get(store).stopRequested;
        }

    } 
}

function createDelayStore() {
    const { subscribe, set, update } = writable<number>(1);

    return {
        subscribe,
        update,
        set
    }
}

const visualizerFlags = createVisualizerFlagStore();
const arrayStore = createArrayStore();
const delayStore = createDelayStore();

export {
    arrayStore, 
    delayStore,
    visualizerFlags
};