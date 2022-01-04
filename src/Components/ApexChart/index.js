import React from "react";
import Chart from "react-apexcharts";

const generateData = (baseval, count, yrange) => {
    var i = 0;
    var series = [];
    while (i < count) {
        //var x =Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
        var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

        series.push([baseval, y, z]);
        baseval += 86400000;
        i++;
    }
    return series;
  }


export default ({datasets}) => {

    const [state, setState] = React.useState({
        options: {
            chart: {
              height: 350,
              type: "bubble"
            },
            dataLabels: {
              enabled: false,
              /*formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                return w.config.series[seriesIndex].name + ":  " + value
              }*/
            },
            fill: {
              type: "gradient"
            },
            title: {
              text: ""
            },
            xaxis: {
              title: {
                text: "Elasticidad",
              }
            },
            yaxis: {
              title: {
                text: "Precio promedio por pieza",
              }
            },
            theme: {
            },
            legend: {
              show: false,
              /*formatter: function(seriesName, opts) {
                  return [seriesName, " - ", opts.w.globals.series[opts.seriesIndex]]
              }*/
            },
            tooltip: {
              x: {
                formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                  return w.config.series[seriesIndex].name// + ":  " + value
                }
              },
              marker: {
                  show: true,
              }
            },
            grid: { 
              padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              }, 
            },
            zoom: {
              //enabled: true,
              type: 'x',  
              autoScaleYaxis: false, 
            }
        },
    })

    return (
      <div className="">
          <Chart
              options={state.options}
              series={datasets.series}
              type="bubble"
              width="800"
          />
      </div>
  );
}