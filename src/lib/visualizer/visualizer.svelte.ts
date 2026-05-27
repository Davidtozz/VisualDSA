class Visualizer {
    private _sorted: boolean;
    public sorting: boolean;
    private _stopRequested: boolean;

    constructor() {
        this._sorted = false;
        this.sorting = false;
        this._stopRequested = false;
    }

    public delay(durationMs: number) {
        return new Promise(resolve => setTimeout(resolve, durationMs));
    }

    public resetFlags() {
        this._sorted = true;
        this.sorting = false;
    }

    public stopSorting() {
        this._stopRequested = true;
        this.sorting = false;
    }

    get sorted(): boolean {
        return this._sorted;
    }

    get stopRequested(): boolean {
        return this._stopRequested;
    }
}

export const visualizer = $state(new Visualizer());