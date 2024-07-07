import { Task } from "./core/types";

function getRangedRand(min: number, max: number): number {
    return Math.trunc(Math.random() * (max - min + 1)) + min;
}

function generateIncrementalRangedRand(count: number, min: number, max: number) {
    if (count <= 0) return [];
    const generated = new Array(count);
    generated[0] = getRangedRand(min, max);
    for (let i = 1; i < count; i++) {
        generated[i] = getRangedRand(min, max);
        while (generated[i] < generated[i - 1]) {
            generated[i] = getRangedRand(min, max);
        }
    }
    return generated;
}

export function generateDataset(count: number, start: Date, end: Date): Task<unknown>[] {
    const min = start.getTime();
    const max = end.getTime();

    const ds = new Array(count);
    for (let i = 0; i < count; i++) {
        const [start, end] = generateIncrementalRangedRand(2, min, max);
        ds[i] = {
            key: i,
            data: {},
            startDate: new Date(start),
            endDate: new Date(end),
        }
    }
    return ds;
}