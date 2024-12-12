export class ImageValidator {
    static readonly SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    static readonly MAX_SIZE_MB = 10;

    static isValidFormat(fileName: string): boolean {
        const extension = fileName.split('.').pop()?.toLowerCase();
        return extension ? this.SUPPORTED_FORMATS.includes(extension) : false;
    }

    static isValidSize(sizeInBytes: number): boolean {
        const sizeInMB = sizeInBytes / (1024 * 1024);
        return sizeInMB <= this.MAX_SIZE_MB;
    }

    static isValidDimensions(width: number, height: number): boolean {
        const MAX_DIMENSION = 4096;
        return width <= MAX_DIMENSION && height <= MAX_DIMENSION;
    }

    static getErrorMessage(fileName: string, sizeInBytes: number): string | null {
        if (!this.isValidFormat(fileName)) {
            return `Unsupported format. Supported formats are: ${this.SUPPORTED_FORMATS.join(', ')}`;
        }
        if (!this.isValidSize(sizeInBytes)) {
            return `File size exceeds ${this.MAX_SIZE_MB}MB limit`;
        }
        return null;
    }
}