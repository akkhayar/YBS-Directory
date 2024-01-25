export function title(text: string) {
    const textArr = text.split("");
    textArr[0] = text[0].toUpperCase();
    return textArr.join("");
}

export function translate(text: string) {
    const numMap = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];
    return Array.from(text.toString())
        .map((char) => numMap[parseInt(char)] || "")
        .join("");
}

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

    isFull() {
        return this.data.length === this.maxSize;
    }

    remove(element: T) {
        const idx = this.data.indexOf(element);
        if (idx !== -1) {
            this.data.splice(idx, 1);
        }
    }

    getArray() {
        return this.data;
    }

    includes(element: T) {
        return this.data.includes(element);
    }
}

export function toJsonSerializable(obj) {
    // Check if the value is an object or array, and not null
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.map(item => toJsonSerializable(item));
    }
  
    // Handle objects
    const result = {};
    for (const key of Reflect.ownKeys(obj)) {
      // Skip unwanted keys
      if (key === 'default' || key === '__esModule' || typeof key === 'symbol') {
        continue;
      }
  
      const value = obj[key];
      result[key] = toJsonSerializable(value);
    }
  
    return result;
  }
  
