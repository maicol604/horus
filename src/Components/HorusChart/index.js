import React from 'react';
import ReactBezier from "react-bezier";

import { makeStyles } from '@mui/styles';

import Item from './Item';

const useStyles = makeStyles((theme)=>({
    box: {
        width: '5em',
        height: '5em',
        backgroundColor: 'red'
    },
    chartRow: {
        width: '30vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
}));

/*
    {
        from: "cube-1",
        to: "cube-2",
        positions: {
            start: {
                side: "bottom",
                indent: 20
            },
            end: {
                side: "top",
            },
        },
        style: "red-line",
  }
*/

const HorusChart = ({categories=[], subcategories=[], skus=[]}) => {

    const classes = useStyles();
    const [settings, setSettings] = React.useState([]);

    React.useEffect(()=>{
        //console.log(categories)
        let newSettings = [];
        for(let i=0;i<categories.length;i++){
            for(let j=0;j<subcategories.length;j++){
                if(`${categories[i].id}`===`${subcategories[j].category.id}`){
                    newSettings.push(
                        {
                            from: "category-"+categories[i].id,
                            to: "subcategory-"+subcategories[j].id,
                            positions: {
                                start: {
                                side: "right",
                                indent: 20
                                },
                                end: {
                                    side: "left",
                                },
                            },
                            style: "white-line",
                        }
                    )
                }
            }
        }
        console.log('sub',subcategories)
        //console.log('skus',skus)
        for(let i=0;i<subcategories.length;i++){
            for(let j=0;j<skus.length;j++){
                if(`${subcategories[i].id}`===`${skus[j].subcategory}`){
                    newSettings.push(
                        {
                            from: "subcategory-"+subcategories[i].id,
                            to: "sku-"+skus[j].id,
                            positions: {
                                start: {
                                side: "right",
                                indent: 20
                                },
                                end: {
                                    side: "left",
                                },
                            },
                            style: "white-line",
                        }
                    )
                }
            }
        }
        //console.log(newSettings)
        setSettings(newSettings);
    },[categories, subcategories, skus])

    const getItem = (data, type) => {
        console.log(data.groupers)
        return (
            <Item 
                id={`${type}-${data.id}`}
                //id={'cube-'+data.id}
                className={classes.box}
                title={data.name}
                variant={type}
                vars={data.variables}
                groupers={data.groupers}
            />
        )
    }

    return (
        <div style={{padding: '5em'}}>
            <ReactBezier settings={settings}>
                <div style={{display:'flex'}}>
                    <div className={classes.chartRow}>
                        {
                            categories.map((data, index)=>
                                <span key={index}>
                                    {getItem(data, 'category')}
                                </span>
                            )
                        }
                    </div>
                    <div className={classes.chartRow}>
                        {
                            subcategories.map((data, index)=>
                                <span key={index}>
                                    {getItem(data, 'subcategory')}
                                </span>
                            )
                        }
                    </div>
                    <div className={classes.chartRow}>
                        {
                            skus.map((data, index)=>
                                <span key={index}>
                                    {getItem(data, 'sku')}
                                </span>
                            )
                        }
                    </div>
                </div>
            </ReactBezier>
        </div>
    )
}

export default HorusChart;