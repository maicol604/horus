import React from "react";
import Chart from "react-apexcharts";
import styled from 'styled-components';

const WrapperDiv = styled.div`
  .apexcharts-pan-icon, .apexcharts-zoomin-icon, .apexcharts-zoomout-icon, .apexcharts-zoom-icon{
    display: none;
  }
  &>div{
    display: flex;
    justify-content: center;
  }
`; 
// .apexcharts-toolbar{
//     display: none;
//   }

export default ({datasets}) => {

    const [state, setState] = React.useState({
        options: { 
            // toolbar: {
            //   show: false,
            // },
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
              tickAmount: 12,
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
                show: false,
                formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                  return w.config.series[seriesIndex].name// + ":  " + value
                }
              },
              y: {
                formatter: ()=>'',
                title: '',
              },
              z: {
                formatter: ()=>'',
                title: '',
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
            // zoom: {
            //   enabled: false,
            //   type: 'x',  
            //   autoScaleYaxis: false, 
            // }
        },
    })

    return (
      <WrapperDiv>
          <Chart
              options={state.options}
              series={datasets.series}
              type="bubble"
              width="800"
              zoom={false}
          />
      </WrapperDiv>
  );
}