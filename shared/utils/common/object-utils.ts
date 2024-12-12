export class ObjectUtils {
    static pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
        const result = {} as Pick<T, K>;
        keys.forEach(key => {
            if (key in obj) {
                result[key] = obj[key];
            }
        });
        return result;
    }

    static omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
        const result = { ...obj };
        keys.forEach(key => delete result[key]);
        return result;
    }

    static deepClone<T>(obj: T): T {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map(item => this.deepClone(item)) as unknown as T;
        }

        const cloned = {} as T;
        Object.keys(obj).forEach(key => {
            cloned[key as keyof T] = this.deepClone(obj[key as keyof T]);
        });

        return cloned;
    }

    static isEqual(obj1: any, obj2: any): boolean {
        if (obj1 === obj2) return true;
        if (typeof obj1 !== typeof obj2) return false;
        if (typeof obj1 !== 'object') return false;
        if (obj1 === null || obj2 === null) return false;

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) return false;

        return keys1.every(key => this.isEqual(obj1[key], obj2[key]));
    }
}