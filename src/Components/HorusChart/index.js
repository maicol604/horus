import React from 'react';
import ReactBezier from "react-bezier";

import { makeStyles } from '@mui/styles';
import styled from 'styled-components';

import Item from './Item';

const WrapperDiv = styled.div`
    ${props => props.classes}
`;

const useStyles = makeStyles((theme)=>({
    box: {
        width: '5em',
        height: '5em',
        backgroundColor: 'red'
    },
    chartRow: {
        width: '25vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginRight: '5em'
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

const HorusChart = ({categories=[], subcategories=[], skus=[], brands=[]}) => {

    const classes = useStyles();
    const [settings, setSettings] = React.useState([]);

    const getClasses = (data, b) => {
        let lineClasses = {};

        for(let i=0;i<data.length;i++){
            lineClasses = {
                ...lineClasses, 
                [".subcategory-color-"+(`${data[i].id}`.split('.').join(""))]:{
                    stroke:`${data[i].color}`,
                    strokeWidth: '3px',
                }
            };
        }
        for(let i=0;i<b.length;i++){
            lineClasses = {
                ...lineClasses, 
                [".brand-color-"+(`${b[i].id}`.split('.').join(""))]:{
                    stroke:`${b[i].color}`,
                    strokeWidth: '3px',
                }
            };
        }
        //console.log(lineClasses)
        return lineClasses;
    }

    const getBrands = () => {
        let brands = [];
        let flag;
        for(let i=0;i<subcategories.length;i++){
            brands[i] = [];
            for(let j=0;j<skus.length;j++){
                flag = true;
                for(let k=0;k<brands[i].length;k++){
                    if(brands[i][k].brand.id===(skus[j].grouper.id+'new'+i+subcategories[i]))
                        flag=false;
                }
                if(skus[j].subcategory.id===subcategories[i].id && flag)
                    brands[i].push({brand:{...skus[j].grouper, oldId: skus[j].grouper.id, id:skus[j].grouper.id+'new'+i+subcategories[i]}, subcategory: subcategories[i]})
            }
        }
        //console.log(brands)
        return brands;
    }

    React.useEffect(()=>{
        ////console.log(categories)
        let newSettings = [];
        for(let i=0;i<categories.length;i++){
            for(let j=0;j<subcategories.length;j++){
                if(`${categories[i].id}`===`${subcategories[j].category.id}`){
                    newSettings.push(
                        {
                            from: "category-"+(`${categories[i].id}`.split('.').join("")),
                            to: "subcategory-"+(`${subcategories[j].id}`.split('.').join("")),
                            positions: {
                                start: {
                                side: "right",
                                indent: 20
                                },
                                end: {
                                    side: "left",
                                },
                            },
                            style: "subcategory-color-"+(`${subcategories[j].id}`.split('.').join("")),
                        }
                    )
                }
            }
        }
        //console.log(newSettings)
        ////console.log('sub',subcategories)
        ////console.log('skus',skus)
        
        // for(let i=0;i<subcategories.length;i++){
        //     for(let j=0;j<skus.length;j++){
        //         if(`${subcategories[i].id}`===`${skus[j].subcategory.id}`){
        //             newSettings.push(
        //                 {
        //                     from: "subcategory-"+(`${subcategories[i].id}`.split('.').join("")),
        //                     to: "sku-"+(`${skus[j].id}`.split('.').join("")),
        //                     positions: {
        //                         start: {
        //                         side: "right",
        //                         indent: 20
        //                         },
        //                         end: {
        //                             side: "left",
        //                         },
        //                     },
        //                     style: "subcategory-color-"+(`${subcategories[i].id}`.split('.').join("")),
        //                 }
        //             )
        //         }
        //     }
        // }

        let b = [];
        b = joinBrands();

        for(let i=0;i<b.length;i++){
            for(let j=0;j<skus.length;j++){
                //console.log(b[i],skus[j])
                if(`${b[i].brand.oldId}`===`${skus[j].grouper.id}` && b[i].subcategory.id===`${skus[j].subcategory.id}`){
                    newSettings.push(
                        {
                            from: "grouper-"+(`${b[i].brand.id}`.split('.').join("")),
                            to: "sku-"+(`${skus[j].id}`.split('.').join("")),
                            positions: {
                                start: {
                                side: "right",
                                indent: 20
                                },
                                end: {
                                    side: "left",
                                },
                            },
                            style: "brand-color-"+(`${b[i].brand.oldId}`.split('.').join("")),
                        }
                    )
                    continue;
                }
            }
        }

        for(let i=0;i<b.length;i++){
            //for(let j=0;j<skus.length;j++){
                // if(b[i].brand.id===skus[j].grouper.id)
                //     console.log(b[i],skus[j])
                //if(b[i].brand.id===skus[j].grouper.id){
                    newSettings.push(
                        {
                            from: "subcategory-"+(`${b[i].subcategory.id}`.split('.').join("")),
                            to: "grouper-"+(`${b[i].brand.id}`.split('.').join("")),
                            positions: {
                                start: {
                                side: "right",
                                indent: 20
                                },
                                end: {
                                    side: "left",
                                },
                            },
                            style: "subcategory-color-"+(`${b[i].subcategory.id}`.split('.').join("")),
                        }
                    )
                //}
            //}
        }




        ////console.log(newSettings)
        setSettings(newSettings);
    },[categories, subcategories, skus])

    const getItem = (data, type) => {
        ////console.log(data.groupers)
        return (
            <Item 
                id={`${type}-${data.id}`}
                //id={'cube-'+data.id}
                className={classes.box}
                title={data.name}
                variant={type}
                vars={data.variables}
                groupers={data.groupers}
                data={data}
            />
        )
    }

    const joinBrands = () => {
        let b = getBrands();
        let newBrands = [];
        for(let i=0;i<b.length;i++){
            newBrands = [...newBrands, ...b[i]];
        }
        //console.log(b)
        return newBrands;
    }

    return (
        <WrapperDiv style={{padding: '5em'}} classes={getClasses(subcategories, brands)}>
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
                            joinBrands().map((data, index)=>
                                <span key={index}>
                                    {getItem(data.brand, 'grouper')}
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
        </WrapperDiv>
    )
}

export default HorusChart;