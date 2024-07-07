export interface Task<T> {
    key: number;
    data: T;
    startDate: Date;
    endDate: Date;
}