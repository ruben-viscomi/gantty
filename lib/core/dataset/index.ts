import { Task } from "../types";

export function getDatasetDateBoundaries<T>(dataset: Task<T>[]): Date[] {
    if (dataset.length <= 0) {
        return [];
    }

    let start = dataset[0].startDate;
    let end = dataset[0].endDate;
    
    for (let i = 1; i < dataset.length; i++) {
        const curr = dataset[i];
        if (curr.startDate < start) {
            start = curr.startDate;
        }
        if (curr.endDate > end) {
            end = curr.endDate;
        }
    }

    return [new Date(start), new Date(end)];
}