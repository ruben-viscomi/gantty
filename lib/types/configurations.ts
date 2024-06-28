export interface BoardConfiguration {
    cssClass?: string[];
}

export interface GanttChartConfiguration {
    board?: BoardConfiguration; 
    boardColumns?: BoardColumnsConfiguration;
}

export interface BoardColumnsConfiguration {
    unit: string;
}