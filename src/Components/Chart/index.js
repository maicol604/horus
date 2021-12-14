import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const data2 = [{
    type: "Sample 1",
    data: [600, 400, 200, 800]
  }, {
    type: "Sampel 2",
    data: [700, 300, 600, 600]
  }, {
    type: "Total",
    data: [1300, 700, 800, 1400]
  }];

export default () => {
    return (
        <Chart
            data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                    {
                        type: 'line',
                        //fill: false,
                        //backgroundColor:'red',
                        //borderColor:'blue',
                        data: [20, 50, 100, 75, 25, 0],
                        label: 'Left dataset',
                        color:'red',
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        // This binds the dataset to the left y axis
                        yAxisID: 'left-y-axis'
                    }, 
                    {
                        type: 'bar',
                        data: [0.1, 0.5, 1.0, 2.0, 1.5, 0],
                        label: 'Right dataset',
                        backgroundColor: [
                            'rgba(50, 200, 100, .5)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        // This binds the dataset to the right y axis
                        yAxisID: 'right-y-axis'
                    }
                ],
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                }
            }
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
                legend: {
                    labels: {
                        fontSize: 25,
                    },
                },
            }}
        />
    )
}