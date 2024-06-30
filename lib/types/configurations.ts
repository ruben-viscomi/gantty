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

export interface BoardColumnProps {
    unit: string;
    value: Date;
    position: number;
}