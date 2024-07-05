import { Task } from "../core/types";

export interface BoardConfiguration {
    cssClass?: string[];
}

export interface GanttChartConfiguration<T> {
    board?: BoardConfiguration; 
    boardColumns: BoardColumnsConfiguration;
    dataset?: Task<T>[];
}

export interface BaseBoardConfiguration {
    unit: string;
}

export interface BoardColumnsConfiguration extends BaseBoardConfiguration {}

export interface BoardRowsConfiguration<T> extends BaseBoardConfiguration {
    unitInPx: number;
    dataset?: Task<T>[];
    startDate: Date;
    endDate: Date;
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