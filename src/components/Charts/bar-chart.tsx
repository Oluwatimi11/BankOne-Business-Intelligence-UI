'use client';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import gradient from 'chartjs-plugin-gradient';
ChartJS.register(...registerables);
ChartJS.register(gradient);

interface ChartProps {
    data: Array<number>,
    initialColor: string,
    finalColor: string,
    borderColor: string,
    labels: Array<string>
}

export const BarChart: React.FC<ChartProps> = ({ data, initialColor, finalColor, borderColor, labels }) => {

    return (
        <Bar
            data={{
                labels,
                datasets: [
                    {
                        label: '# of age',
                        data,
                        //backgroundColor: '#0D968F',
                        gradient: {
                            backgroundColor: {
                                axis: 'y',
                                colors: {
                                    0: initialColor,
                                    100: finalColor,
                                }
                            }
                        },
                        barThickness: 40,
                        borderColor,
                        borderWidth: 1,
                        borderRadius: 11,

                    }
                ]
            }}
            height="100%"
            width="100%"
            options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        align: 'end',
                        display: false,
                        labels: {
                            boxWidth: 10,
                            boxHeight: 10,
                            color: '#111111',
                        }
                    }
                },
                scales: {
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: "#111111",
                        },
                        //max: 60000
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: "#111111",
                        }
                    }
                }
            }}
        />
    )
}
