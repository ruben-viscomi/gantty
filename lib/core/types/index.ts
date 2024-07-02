export interface Task<T> {
    key: number | string | symbol;
    data: T;
    startDate: Date;
    endDate: Date;
}