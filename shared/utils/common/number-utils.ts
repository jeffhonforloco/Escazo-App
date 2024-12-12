export class NumberUtils {
    static formatNumber(num: number, decimals: number = 2): string {
        return num.toFixed(decimals);
    }

    static clamp(num: number, min: number, max: number): number {
        return Math.min(Math.max(num, min), max);
    }

    static randomBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static formatFileSize(bytes: number): string {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }
}