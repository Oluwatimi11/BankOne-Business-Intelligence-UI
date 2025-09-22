import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
    data: Array<number>,
    labels: Array<string>,
    bgColors: Array<string>,
    borderColor: Array<string>,
    position?: "top" | "right" | "left" | "bottom" | "center" | "chartArea",
    alignLabels?: "center" | "start" | "end" | undefined,
    showLegend?: boolean,
    cutout?: number
}

export const DoughnutChart: React.FC<ChartProps> = ({data, labels, bgColors, borderColor, position, alignLabels, showLegend, cutout}) => {

    return (
        <Doughnut 
            data={{
            labels,
            datasets: [
                {
                    label: '# of Votes',
                    data,
                    backgroundColor: bgColors,
                    borderColor,
                    borderWidth: 1,
                },
            ],
            }}
            height="70%"
            width="100%"
            options={{
                maintainAspectRatio: false,
                responsive: true, 
                cutout: cutout || 45,
                plugins: {
                    legend: {
                        align: alignLabels || 'center',
                        position: position || 'right',
                        display: showLegend != null ? showLegend : true,
                        labels: {
                            boxWidth: 20,
                            boxHeight: 10,
                            color: '#111111'
                        }
                    }
                },
            }}
        />
    )
}
