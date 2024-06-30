import { mountGanttChart } from './components/index.ts';

mountGanttChart(document.querySelector<HTMLDivElement>('#app')!, {
    boardColumns: {
        unit: "quarter"
    }
})
