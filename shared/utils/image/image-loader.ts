import { ImageSource } from '@nativescript/core';
import { ImageCache } from './image-cache';

export class ImageLoader {
    private static cache = new ImageCache();

    static async loadImage(url: string): Promise<ImageSource | null> {
        try {
            // Check cache first
            const cachedImage = this.cache.get(url);
            if (cachedImage) {
                return cachedImage;
            }

            // Load and cache image
            const image = await ImageSource.fromUrl(url);
            if (image) {
                this.cache.set(url, image);
            }
            return image;
        } catch (error) {
            console.error('Error loading image:', error);
            return null;
        }
    }

    static async preloadImages(urls: string[]): Promise<void> {
        const loadPromises = urls.map(url => this.loadImage(url));
        await Promise.all(loadPromises);
    }

    static clearCache(): void {
        this.cache.clear();
    }
}