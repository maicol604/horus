import React from 'react';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from "styled-components";
import Stack from '@mui/material/Stack';

import Loader from '../../Components/Loader';
import CustomDatePicker from '../../Components/CustomDatePicker';

const borderColor = '#fff';

const TableWrapper = styled.div`
    max-height: 50vh;
    table{
        border: 1px solid ${borderColor};
        td{
            padding: 0; 
            margin: 0;
            border: 1px solid ${borderColor};
            //padding: 0 2em 0 2em;
            .numbers{
                padding: 0 2em 0 2em;
                box-sizing:border-box;
                width: 100% !important;
                display:flex;
                justify-content:center;
            }
        }
        tr{
            border: 1px solid ${borderColor};
            th{
                background-color: ${borderColor};
                border: 1px solid ${borderColor};
                border-collapse: collapse;
            }
            .titles{
                background-color: #fff;
                border: 1px solid #000;
            }
        }
    }
    .c1{
        background-color: #a6a6a6;
        color: #fff;
    }
    .c2{
        background-color: #8ea9db;
        color: #fff;
    }
    .c3{
        background-color: #305496;
        color: #fff;
    }
    .c4{
        background-color: #000;
        color: #fff;
    }
    .sub-t{
        background-color: #8497b0;
        color:#fff;
    }
    .e{
        background-color: #0070c0;
        color:#fff;
    }
`;

const OptimalPrices = ({token}) => {
    const [chartData, setChartData] = React.useState({
        subcategory:null,
        month:(new Date()).getMonth()+1,
        enviroment:[{value:null},{value:null}],
        data:null,
        loading: false,
        category:null,
    });

    const [values, setValues] = React.useState()

    const [categories, setCategories] = React.useState([]);
    const [subcategories, setSubcategories] = React.useState([]);

    React.useEffect(()=>{
        getCategories();
    },[])

    const getCategories = () => {
        
        let url = "https://pricing.demo4to.com/api/pricing.sku.category?access-token="+token;
        //console.log('getting categories')
        fetch(url, {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            method: "GET"
        })   
        .then(response => response.json())
        .then(result => {
            // console.log('categories',result.data);
            // if(!result.data){
            //     getCategories();
            //     return;
            // }
            setCategories(result.data);
        })
        .catch(error => {
            console.log('categories', error);
        });
    
    }

    const getSubategories = (category) => {
        
        let url = "https://pricing.demo4to.com/api/pricing.sku.category/"+category+"/subcategory_ids?access-token="+token;
        console.log('getting subcategories')
        fetch(url, {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            method: "GET"
        })   
        .then(response => response.json())
        .then(result => {
            console.log('subcategories',result.data);
            setSubcategories(result.data);
        })
        .catch(error => {
            console.log('categories', error);
        });
    
    }

    const formatNumber = (number) => {
        let str = number.toString().split('.');
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return str.join(".");
    }

    const truncateNumber = (number) => {
        try{
            return (number+'').toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        }
        catch{
            return (number)
        }
    }

    const getTable = (subcategory, month, enviroment) => {
        //console.log( subcategory, month, enviroment.map(i=>(`&${i.key}=${i.value}`)).join(''))
        let env='';
        if(enviroment[0].value){
            env = enviroment.map(i=>(`&${i.key}=${i.value}`)).join('');
        }
        let url;
        //console.log(subcategory!=='Todas')
        if(subcategory!=='Todas'){
            console.log('here')
            url = "https://pricing.demo4to.com/api/pricing.sku.subcategory/"+subcategory+"/get_month_table?access-token="+token+"&month="+month;
        }
        else{
            url = "https://pricing.demo4to.com/api/pricing.sku.category/"+chartData.category+"/get_month_table?access-token="+token+"&month="+month;
        }
        //console.log(url);
        setChartData({...chartData, loading:true, data:null, enviroment:[{value:null},{value:null}]});
        fetch(url, {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            method: "GET"
          })   
          .then(response => response.json())
          .then(result => {
            //console.log('mensual',result.data);
            if(result.data)
                setTimeout(() => {
                    setChartData({...chartData, data: result.data, enviroment:result.data.env, loading: false});

                    let values = result.data.subcategory_ids.map(i =>
                        (i.sku_ids.map(j=>
                                ({id:j.id, distribution:j.distribution, price:j.user_point.price})
                            )
                        )
                    )

                    //console.log('values',values);

                    setValues(values);
                }, 2000);
            else
                setChartData({...chartData, loading:false});
          })
          .catch(error => {
            console.log('error sub', error);
            setChartData({...chartData, loading:false});
          });
    }

    const getTableSimulation = (v, enviroment) => {
        
        let distribution=v.map(i=>( i.map(j=>({[`d${j.id}`]:`${j.distribution}`+''})) )), daux=[];
        let price=v.map(i=>( i.map(j=>({[`a${j.id}`]:`${j.price}`+''})) )), paux=[];

        for(let i=0;i<distribution.length;i++){
            daux=[...daux, ...distribution[i]]
            paux=[...paux, ...price[i]]
        }

        distribution = {};
        price={};

        for(let i=0;i<daux.length;i++){
            distribution = {...distribution, ...daux[i]};
            price = {...price, ...paux[i]};
        }

        let vaux = {...distribution, ...price};

        let env={};
        if(enviroment[0].value){
            let eaux = enviroment.map(i=>({[`${i.key}`]:i.value+''}));
            for(let i=0;i<eaux.length;i++){
                env={...env, ...eaux[i]};
            }
        }

        console.log({...vaux, ...env})


        let url;
        //console.log(chartData.subcategory!=='Todas')
        if(chartData.subcategory!=='Todas'){
            console.log('here')
            url = "https://pricing.demo4to.com/api/pricing.sku.subcategory/"+chartData.subcategory+"/get_month_table?access-token="+token+"&month="+chartData.month+"&values="+JSON.stringify({...vaux, ...env});
        }
        else{
            url = "https://pricing.demo4to.com/api/pricing.sku.category/"+chartData.category+"/get_month_table?access-token="+token+"&month="+chartData.month+"&values="+JSON.stringify({...vaux, ...env});
        }
        
        setChartData({...chartData, loading:true, data:null, enviroment:[{value:null},{value:null}]});
        fetch(url, {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            method: "GET"
          })   
          .then(response => response.json())
          .then(result => {
            console.log('mensual sim',result);
            if(result.data)
                setTimeout(() => {
                    setChartData({...chartData, data: result.data, enviroment:result.data.env, loading: false});
                }, 2000);
            else
                setChartData({...chartData, loading:false});
          })
          .catch(error => {
            console.log('error sub', error);
            setChartData({...chartData, loading:false});
          });
    }

    const handlePriceValues = (value, i, j) => {
        let cpy = values.slice();
        cpy[i][j] = {...cpy[i][j], price:value};
        setValues(cpy);

    }

    const handleDistributionValues = (value, i, j) => {
        let cpy = values.slice();
        cpy[i][j] = {...cpy[i][j], distribution:value};
        setValues(cpy);
    }

    return (
        <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={12}>
                <Paper
                    variant="outlined"
                    style={{padding:'1em'}}
                >
                    <Grid container alignItems='flex-start' spacing={3}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Seleccionar categoria</InputLabel>
                                <Select
                                    label="Seleccionar categoria"
                                    value={chartData.category}
                                    onChange={(e)=>{
                                        setChartData({...chartData, category:e.target.value});
                                        getSubategories(e.target.value);
                                        //console.log(e.target.value)
                                    }}
                                >
                                    {
                                    categories.map((item, index)=>{
                                        return (
                                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Seleccionar subcategoria</InputLabel>
                                <Select
                                    label="Seleccionar subcategoria"
                                    value={chartData.subcategory}
                                    onChange={(e)=>{
                                        setChartData({...chartData, subcategory:e.target.value})
                                        //console.log(e.target.value)
                                    }}
                                    disabled={!chartData.category}
                                >
                                    {
                                    subcategories.map((item, index)=>{
                                        return (
                                            <MenuItem value={item[0]} key={index}>{item[1]}</MenuItem>
                                        )
                                    })
                                }
                                <MenuItem value={'Todas'}>Todas</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <CustomDatePicker
                                periodicity={'monthly'}
                                label='Mes a estudiar'
                                onChange={(e)=>{
                                    setChartData({...chartData, month:e.getMonth()+1});
                                    //console.log({...chartData, month:e.getMonth()+1})
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} style={{display: 'flex'}}>
                            <Button color="primary"  variant='contained' size="large" style={{height:'3.5em'}} onClick={()=>{/*console.log(chartData.subcategory, chartData.month);*/getTable(chartData.subcategory, chartData.month, chartData.enviroment);}} disabled={!chartData.subcategory}>
                                Ejecutar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            {
                chartData.loading?
                <div style={{width:'100%', height:'40vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Loader/>
                </div>
                :
                <></>
            }
            {chartData.data?
            <Grid item xs={12}>
                <Paper
                    variant="outlined"
                    style={{padding:'1em'}}
                >
                    <Grid container alignItems='flex-start' spacing={3}>
                        <Grid item xs={4}>
                            <TextField 
                                label="Inflación" 
                                variant="outlined" 
                                fullWidth
                                defaultValue={0}
                                onChange={(e)=>{
                                    let cpy = chartData.enviroment.slice();
                                    cpy[1] = {...cpy[1], value:e.target.value};
                                    setChartData({...chartData, enviroment:cpy});
                                }}
                                value={chartData.enviroment[1].value}
                                disabled={!chartData.data}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                label="Pandemia" 
                                variant="outlined" 
                                fullWidth
                                defaultValue={0}
                                onChange={(e)=>{
                                    let cpy = chartData.enviroment.slice();
                                    cpy[0] = {...cpy[0], value:e.target.value};
                                    setChartData({...chartData, enviroment:cpy});
                                }}
                                value={chartData.enviroment[0].value}
                                disabled={!chartData.data}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            :
            <></>
            }
            {chartData.data?
            <>
            <Grid item xs={12}>
                <Paper
                    variant="outlined"
                    style={{padding:'1em', overflowX:'scroll'}}
                >
                    <TableWrapper>
                        <table>
                            <tr>
                                <th colspan="4"></th>
                                <th colspan="4" className='titles'>MAXIMUM VALUE SALES</th>
                                <th></th>
                                <th colspan="4" className='titles'>OPTIMAL PRICE POINT</th>
                                <th></th>
                                <th colspan="4" className='titles'>MAXIMUM PROFIT</th>
                                <th></th>
                                <th colspan="5" className='titles'>LABORATORIO</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th><span style={{opacity:'0'}}>--</span></th>
                                <th style={{ backgroundColor:'#002060' }}><span style={{fontSize:'2.5em', color:'#fff'}}>e</span></th>
                                <th><span style={{opacity:'0'}}>--</span></th>
                                <th className='c1'><div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}><span>Price</span><span>Max sales</span></div></th>
                                <th className='c1'>QTY</th>
                                <th className='c1'>Sales</th>
                                <th className='c1'>Profit</th>
                                <th><span style={{opacity:'0'}}>--</span></th>
                                <th className='c2'>Optimal price</th>
                                <th className='c2'>QTY</th>
                                <th className='c2'>Sales</th>
                                <th className='c2'>Profit</th>
                                <th><span style={{opacity:'0'}}>--</span></th>
                                <th className='c3'><div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}><span>Price</span><span>Max profit</span></div></th>
                                <th className='c3'>QTY</th>
                                <th className='c3'>Sales</th>
                                <th className='c3'>Profit</th>
                                <th><span style={{opacity:'0'}}>--</span></th>
                                <th className='c4'>Price</th>
                                <th className='c4'>Distribution</th>
                                <th className='c4'>QTY</th>
                                <th className='c4'>Sales</th>
                                <th className='c4'>Profit</th>
                            </tr>
                            {
                                chartData.data.subcategory_ids.map((j, inde)=>(
                                    <>
                                        <td colspan="1"><span style={{display:'flex', padding:'.25em 1em'}} className='sub-t'>{j.name}</span></td>
                                        <td></td>
                                        <td className='e'>{formatNumber(truncateNumber(j.elasticity))}</td>
                                        <td></td>
                                        <td className='sub-t' colspan="14"></td>
                                        <td></td>
                                        <td className='sub-t' colspan="5"></td>
                                        {
                                        j.sku_ids.map((i, index)=>(
                                            <tr key={index}>
                                                <td><span style={{display:'flex',width:'max-content'}}>{i.name}</span></td>
                                                <td></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.elasticity))}</span></td>
                                                <td></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.optimals.price[0]))}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.optimals.quantity_kg[0]))}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.optimals.value[0]))}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.optimals.profit[0]))}</span></td>
                                                <td></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.optimals.price[1]))}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.optimals.quantity_kg[1]))}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.optimals.value[1]))}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.optimals.profit[1]))}</span></td>
                                                <td></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.optimals.price[2]))}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.optimals.quantity_kg[2]))}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.optimals.value[2]))}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.optimals.profit[2]))}</span></td>
                                                <td></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>
                                                    <input onChange={(e)=>{handlePriceValues(e.target.value, inde, index)}} defaultValue={truncateNumber(i.user_point.price)} style={{width:'5em', textAlign:'center'}}/>
                                                </span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>
                                                    <input onChange={(e)=>{handleDistributionValues(e.target.value, inde, index)}} defaultValue={truncateNumber(i.distribution)} style={{width:'7em', textAlign:'center'}}/>    
                                                </span></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.user_point.quantity_kg))}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.user_point.value))}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}} className='numbers'>{formatNumber(truncateNumber(i.user_point.profit))}</span></td>
                                            </tr>
                                        ))
                                        }
                                    </>
                                ))
                            }
                        </table> 
                    </TableWrapper>
                </Paper>
            </Grid>
            
            <Grid item xs={12}>
                <Paper
                    variant="outlined"
                    style={{padding:'1em', marginBottom: '2em'}}
                >
                    <div style={{display:'flex'}}>
                        <Button color="primary"  variant='contained' style={{height:'3.5em', marginRight:'1em'}} onClick={()=>{getTableSimulation(values, chartData.enviroment)}} disabled={false}>
                            Simular 
                        </Button>
                        <Button color="primary"  variant='contained' style={{height:'3.5em'}} onClick={()=>{}} disabled={true}>
                            Guardar simulación
                        </Button>
                    </div>
                    
                </Paper>
            </Grid>
            </>
            :
            <></>
            }
        </Grid>
    )
}
export default OptimalPrices;