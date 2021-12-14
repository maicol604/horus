import React from 'react';
import functionPlot from "function-plot";

let contentsBounds = document.body.getBoundingClientRect();
let width = 800;
let height = 500;
let ratio = contentsBounds.width / width;
width *= ratio;
height *= ratio;

const getPoints = () => {
    let vec = [];
    for(let i=0;i<50;i=i+0.1){
        vec.push([i, Math.pow(i,2)])
    }
    return vec;
}

export default () => {

    React.useEffect(()=>{
        functionPlot({
            target: '#quadratic',
            data: [
                {
                    fn: '.5x^2'
                },
                {
                    points: [
                      ...getPoints()
                    ],
                    fnType: 'points',
                    graphType: 'scatter',
                    color: 'orange'
                }
            ],
            annotations: [
                /*{
                    x: -1
                }, */
                {
                    x: 2,
                    text: 'precio optimo 10'
                }, 
                {
                    y: 2,
                    text: 'precio optimo 10'
                }
            ]
        })
    },[])

    return (
        <div>
            hello world
            <div id='quadratic'/>
        </div>
    )
}