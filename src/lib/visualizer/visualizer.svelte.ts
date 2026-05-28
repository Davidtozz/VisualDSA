class Visualizer {
    public sorted: boolean;
    public sorting: boolean;
    public stopRequested: boolean;
    public delayMs: number;

    constructor() {
        this.sorted = $state(false);
        this.sorting = $state(false);
        this.stopRequested = $state(false);
        this.delayMs = $state<number>(0);
    }

    public delay(durationMs: number) {
        return new Promise(resolve => setTimeout(resolve, durationMs));
    }

    public resetFlags() {
        this.sorted = true;
        this.sorting = false;
    }

    public stopSorting() {
        this.stopRequested = true;
        this.sorting = false;
    }
}

export const visualizer = $state(new Visualizer());