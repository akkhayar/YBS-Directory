export class FixedSizeArray<T> {
    private maxSize: number;
    private data: T[];

    constructor(maxSize: number) {
        this.maxSize = maxSize;
        this.data = [];
    }

    add(element: T) {
        if (this.data.length === this.maxSize) {
            // Remove the first element (FIFO) when the array is full
            this.data.shift();
        }
        this.data.push(element);
    }

    getArray() {
        return this.data;
    }

    includes(element: T) {
        return this.data.includes(element);
    }
}