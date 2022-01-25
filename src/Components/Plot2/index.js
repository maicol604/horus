import React from 'react';
import Plot from 'react-plotly.js';

    // "start": "react-scripts start",
    // "build": "react-scripts build",
    // "test": "react-scripts test",
    // "eject": "react-scripts eject",

const Plot2 = ({ points, annotations, name, title, xaxisTitle='', yaxisTitle='', extraCurves=[], names }) => {

    //console.log(...annotations.map(i=>({x:[i.x], y:[i.y], name:i.text, mode: 'markers', marker: { size: [10],}})))
    //console.log(extraCurves);
    
    return (
        <Plot
            data={[
                /*{
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                },*/
                ...extraCurves.map((i, index)=>({...i, type: 'scatter', visible:'legendonly', name:names[index]})),
                {
                    x: [...points.map(i=>i[0])], 
                    y: [...points.map(i=>i[1])], 
                    type: 'scatter',
                    name:name
                },
                ...annotations.map(i=>({x:[i.x], y:[i.y], name:i.text, mode: 'markers', marker: { size: [15], color:i.color?i.color:null}})),
            ]}
            layout={{legend:{bgcolor: 'rgba(111, 209, 176, .25)', orientation:'h'}, title: title, width:'100%', xaxis: {title: {text: xaxisTitle}}, yaxis: {title: {text: yaxisTitle}}}}
        />
    );
  
}

export default Plot2;

//nombre de ejes