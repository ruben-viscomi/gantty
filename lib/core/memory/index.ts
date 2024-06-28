export function asImmutable<T>(value: T): Readonly<T> {
    return Object.freeze(value);
}