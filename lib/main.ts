import { mountGanttChart } from './components/index.ts';
import { generateDataset } from './dataset.ts';

mountGanttChart(document.querySelector<HTMLDivElement>('#app')!, {
    boardColumns: {
        unit: "quarter"
    },
    dataset: generateDataset(1000000, new Date("100"), new Date("10000")),
});
