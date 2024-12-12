import { ImageSource } from '@nativescript/core';

export class ImageCache {
    private cache: Map<string, ImageSource>;
    private maxSize: number;

    constructor(maxSize: number = 100) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }

    get(key: string): ImageSource | undefined {
        return this.cache.get(key);
    }

    set(key: string, value: ImageSource): void {
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }

    clear(): void {
        this.cache.clear();
    }

    remove(key: string): void {
        this.cache.delete(key);
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }

    get size(): number {
        return this.cache.size;
    }
}