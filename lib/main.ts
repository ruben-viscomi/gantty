import { mountGanttChart } from './components/index.ts';
import { generateDataset } from './dataset.ts';

// mountGanttChart(document.querySelector<HTMLDivElement>('#app')!, {
//     boardColumns: {
//         unit: "week"
//     },
//     dataset: generateDataset(100, new Date("2020"), new Date("2024")),
// });

mountGanttChart(document.querySelector<HTMLDivElement>('#app')!, {
    boardColumns: {
        unit: "week"
    },
    dataset: [
        {
            key: 0,
            startDate: new Date("2024-07-01T00:00:00Z"),
            endDate: new Date("2024-07-28T23:59:59Z"),
            data: {},
        },
        {
            key: 1,
            startDate: new Date("2024-07-08T00:00:00Z"),
            endDate: new Date("2024-07-14T23:59:59Z"),
            data: {},
        },
        {
            key: 2,
            startDate: new Date("2024-07-15T00:00:00Z"),
            endDate: new Date("2024-07-28T23:59:59Z"),
            data: {},
        },
        {
            key: 3,
            startDate: new Date("2024-07-01T00:00:00Z"),
            endDate: new Date("2024-07-14T23:59:59Z"),
            data: {},
        },
        {
            key: 4,
            startDate: new Date("2024-06-24T00:00:00Z"),
            endDate: new Date("2024-06-30T23:59:59Z"),
            data: {},
        },
    ],
});
