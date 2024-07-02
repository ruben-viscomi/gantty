import { Task } from "../core/types";

export interface BoardConfiguration {
    cssClass?: string[];
}

export interface GanttChartConfiguration<T> {
    board?: BoardConfiguration; 
    boardColumns: BoardColumnsConfiguration;
    dataset?: Task<T>[];
}

export interface BoardColumnsConfiguration {
    unit: string;
}

export interface BoardColumnsConfigurationPropagated {
    startDate: Date;
    endDate: Date;
}

export interface BoardColumnProps {
    unit: string;
    value: Date;
    position: number;
}