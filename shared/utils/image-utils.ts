import { ImageSource } from '@nativescript/core';

export class ImageUtils {
    static async loadImage(url: string): Promise<ImageSource | null> {
        try {
            return await ImageSource.fromUrl(url);
        } catch (error) {
            console.error('Error loading image:', error);
            return null;
        }
    }

    static getPlaceholderImage(): string {
        return '~/assets/images/placeholder.jpg';
    }

    static formatImagePath(path: string): string {
        if (path.startsWith('http')) {
            return path;
        }
        return path.startsWith('~/') ? path : `~/${path}`;
    }

    static async resizeImage(image: ImageSource, maxWidth: number, maxHeight: number): Promise<ImageSource> {
        const ratio = Math.min(maxWidth / image.width, maxHeight / image.height);
        const width = Math.round(image.width * ratio);
        const height = Math.round(image.height * ratio);
        return await image.resize(width, height);
    }
}