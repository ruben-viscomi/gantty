import { GanttChartConfiguration } from "../types/configurations";
import { GanttChart } from "./chart";

export function mountGanttChart(element: HTMLElement, config?: GanttChartConfiguration) {
    const ganttChart = new GanttChart(config);
    element.appendChild(ganttChart.element);
}