import React from 'react';
import Plot from 'react-plotly.js';

    // "start": "react-scripts start",
    // "build": "react-scripts build",
    // "test": "react-scripts test",
    // "eject": "react-scripts eject",

export default ({ points, annotations, name, title }) => {

    console.log(...annotations.map(i=>({x:[i.x], y:[i.y], name:i.text, mode: 'markers', marker: { size: [10],}})))

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
                ...annotations.map(i=>({x:[i.x], y:[i.y], name:i.text, mode: 'markers', marker: { size: [10],}})),
                {
                    x: [...points.map(i=>i[0])], 
                    y: [...points.map(i=>i[1])], 
                    type: 'scatter',
                    name:{name}
                },
            ]}
            layout={{title: title}}
        />
    );
  
}