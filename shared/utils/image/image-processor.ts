import { ImageSource } from '@nativescript/core';

export class ImageProcessor {
    static async resize(image: ImageSource, width: number, height: number): Promise<ImageSource> {
        return await image.resize(width, height);
    }

    static async crop(image: ImageSource, left: number, top: number, width: number, height: number): Promise<ImageSource> {
        return await image.crop(left, top, width, height);
    }

    static async rotate(image: ImageSource, degrees: number): Promise<ImageSource> {
        return await image.rotate(degrees);
    }

    static async applyFilter(image: ImageSource, filter: 'grayscale' | 'sepia' | 'blur'): Promise<ImageSource> {
        // Implementation of filters would go here
        // This is a placeholder for demonstration
        return image;
    }
}