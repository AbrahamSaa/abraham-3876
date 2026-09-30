export const storage = {
    get<T>(key: string): T | null {
        const data = localStorage.getItem(key);
        if (!data) {
            return null;
        }

        return JSON.parse(data) as T;
    },
    set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key: string): void {
        localStorage.removeItem(key);
    }
}