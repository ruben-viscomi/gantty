import { GanttChartConfiguration } from "../types/configurations";
import { GanttChart } from "./chart";

export function mountGanttChart<T>(element: HTMLElement, config: GanttChartConfiguration<T>) {
    const ganttChart = new GanttChart(config);
    element.appendChild(ganttChart.element);
}