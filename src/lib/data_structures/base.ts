export abstract class DataStructure  {
    className: string;

    constructor(className: string) {
        this.className = className;
    }
    abstract get methods(): Function[];
    abstract get fields(): { name: string, type: string }[];
}