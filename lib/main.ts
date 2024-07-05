import { mountGanttChart } from './components/index.ts';
import { generateDataset } from './dataset.ts';

mountGanttChart(document.querySelector<HTMLDivElement>('#app')!, {
    boardColumns: {
        unit: "week"
    },
    dataset: generateDataset(100, new Date("2020"), new Date("2024")),
});
