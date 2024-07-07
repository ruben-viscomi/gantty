import { Task } from "../types";

export function mapTaskByKeyAndPosition<T>(data: Task<T>[]): Record<number, [Task<T>, number]> {
    const map: Record<number, [Task<T>, number]> = {};
    for (let i = 0; i < data.length; i++) {
        const curr = data[i];
        map[curr.key] = [curr, i];
    }
    return map;
}