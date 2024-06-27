export interface BoardConfiguration {
    cssClass?: string[];
}

export interface GanttChartConfiguration {
    board?: BoardConfiguration; 
    boardColumns?: BoardColumnsConfiguration;
}

export type BoardColumnUnit = "hour" | "day" | "week" | "month" | "quarter" | "semester" | "year";

export interface BoardColumnsConfiguration {
    unit: BoardColumnUnit;
}