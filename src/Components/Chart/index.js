import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


export default ({datasets=[], legend=true, labels, type}) => {
    React.useEffect(()=>{
        console.log(datasets)        
    },[])
    return (
        <>
            {
                //console.log('as',sample.map(i=>i[0]))
            }
            <Chart
                type={type}
                data={{
                    labels: labels,
                    datasets: [
                        ...datasets
                    ],
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                    plugins: {
                        legend: {
                            display: legend,
                            position: 'bottom',
                        },
                    },
                }}
            />
        </>
    )
}