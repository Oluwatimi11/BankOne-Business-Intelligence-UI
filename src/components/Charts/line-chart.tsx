import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
import gradient from 'chartjs-plugin-gradient';
ChartJS.register(...registerables);
ChartJS.register(gradient);

interface ChartProps {
    data: Array<number>,
    initialColor: string,
    finalColor: string,
    borderColor: string,
    label?: Array<any>
}

export const LineChart: React.FC<ChartProps> = ({data, label, initialColor, finalColor, borderColor}) => {
    return (
        <Line 
            data={{
                labels: label || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Account growth',
                        data,
                        gradient: {
                            backgroundColor: {
                              axis: 'y',
                              colors: {
                                0: initialColor,
                                100: finalColor,
                              }
                            }
                        },
                        borderColor,
                        borderWidth: 2,
                        pointRadius: 0,
                        fill: true
                    }
                ]
            }}
            height="100%"
            width="100%"
            options={{
                responsive: true,
                maintainAspectRatio: false, 
                plugins: {
                    legend: {
                        align: 'end',
                        labels: {
                            boxWidth: 10,
                            boxHeight: 10,
                            color: '#667085'
                        },
                        display: false
                    }
                },
                elements: {
                    line: {
                        tension: 0.5
                    }
                },
                scales: {
                    y: {  
                        display: false,
                        ticks: {
                            color: "#667085",
                        }
                    },
                    x: {  
                        display: false,
                        ticks: {
                            color: "#667085", 
                        }
                    }
                }
            }}
        />
    )
}
