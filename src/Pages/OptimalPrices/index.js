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

import CustomDatePicker from '../../Components/CustomDatePicker';

const borderColor = 'rgba(0, 0, 0, 0.12)';

const TableWrapper = styled.div`
    max-height: 50vh;
    table{
        border: 1px solid ${borderColor};
        td{
            padding: 0; 
            margin: 0;
        border: 1px solid ${borderColor};
        }
        tr{
            border: 1px solid ${borderColor};
            th{
                background-color: ${borderColor};
                border: 1px solid ${borderColor};
                border-collapse: collapse;
            }
        }
    }
    .c1{
        background-color: #fff;
    }
    .c2{
        background-color: #6FD1B0;
    }
    .c3{
        background-color: #1F1C36;
        color: #fff;
    }
    .c4{
        background-color: #141124;
        color: #fff;
    }
    .sub-t{
        background-color: #407D68;
        color:#fff;
    }
`;

const OptimalPrices = ({subcategories, token}) => {
    const [chartData, setChartData] = React.useState({
        subcategory:null,
        month:(new Date()).getMonth()+1,
        enviroment:[{value:null},{value:null}],
        data:null
    })

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
        let url = "https://pricing.demo4to.com/api/pricing.sku.subcategory/"+subcategory+"/get_month_table?access-token="+token+"&month="+month+env;
        console.log(url)
        fetch(url, {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            method: "GET"
          })   
          .then(response => response.json())
          .then(result => {
            console.log('mensual',result.data);
            setChartData({...chartData, data: result.data, enviroment:result.data.env})
          })
          .catch(error => console.log('error sub', error));
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
                                <InputLabel>Seleccionar subcategoria</InputLabel>
                                <Select
                                    label="Seleccionar subcategoria"
                                    value={chartData.subcategory}
                                    onChange={(e)=>{
                                        setChartData({...chartData, subcategory:e.target.value})
                                        //console.log(e.target.value)
                                    }}
                                >
                                    {
                                    subcategories.data.map((item, index)=>{
                                        return (
                                        <MenuItem value={item[0]} key={index}>{item[1]}</MenuItem>
                                        )
                                    })
                                }
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
                        <Grid item xs={4} style={{display: 'flex'}}>
                            <Button color="primary"  variant='contained' size="large" style={{height:'3.5em'}} onClick={()=>{/*console.log(chartData.subcategory, chartData.month);*/getTable(chartData.subcategory, chartData.month, chartData.enviroment);}} disabled={!chartData.subcategory}>
                                Ejecutar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            {chartData.data?
            <Grid item xs={12}>
                <Paper
                    variant="outlined"
                    style={{padding:'1em', overflowX:'scroll'}}
                >
                    <TableWrapper>
                        <table>
                            <tr>
                                <th>Skus</th>
                                <th><span style={{opacity:'0'}}>--</span></th>
                                <th>E</th>
                                <th><span style={{opacity:'0'}}>--</span></th>
                                <th className='c1'>Price max sales</th>
                                <th className='c1'>QTY</th>
                                <th className='c1'>Sales</th>
                                <th className='c1'>Profit</th>
                                <th><span style={{opacity:'0'}}>--</span></th>
                                <th className='c2'>Price optimals</th>
                                <th className='c2'>QTY</th>
                                <th className='c2'>Sales</th>
                                <th className='c2'>Profit</th>
                                <th><span style={{opacity:'0'}}>--</span></th>
                                <th className='c3'>Price max profit</th>
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
                                chartData.data.subcategory_ids.map(j=>(
                                    <>
                                        <td colspan="24"><span style={{display:'flex', padding:'.25em 1em'}} className='sub-t'>{j.name}</span></td>
                                        {
                                        j.sku_ids.map((i, index)=>(
                                            <tr key={index}>
                                                <td><span style={{display:'flex',width:'max-content'}}>{i.name}</span></td>
                                                <td></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>{truncateNumber(j.elasticity)}</span></td>
                                                <td></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>{truncateNumber(i.optimals.price[0])}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>{truncateNumber(i.optimals.quantity_kg[0])}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>{truncateNumber(i.optimals.value[0])}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>{truncateNumber(i.optimals.profit[0])}</span></td>
                                                <td></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>{truncateNumber(i.optimals.price[1])}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>{truncateNumber(i.optimals.quantity_kg[1])}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>{truncateNumber(i.optimals.value[1])}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>{truncateNumber(i.optimals.profit[1])}</span></td>
                                                <td></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>{truncateNumber(i.optimals.price[2])}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>{truncateNumber(i.optimals.quantity_kg[2])}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>{truncateNumber(i.optimals.value[2])}</span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>{truncateNumber(i.optimals.profit[2])}</span></td>
                                                <td></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>
                                                    <input value={truncateNumber(i.user_point.price)} style={{width:'5em'}}/>
                                                </span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>
                                                    <input value={truncateNumber(i.distribution)} style={{width:'7em'}}/>    
                                                </span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>
                                                    <input value={truncateNumber(i.user_point.quantity_kg)} style={{width:'5em'}}/>
                                                </span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>
                                                    <input value={truncateNumber(i.user_point.value)} style={{width:'5em'}}/>
                                                </span></td>
                                                <td><span style={{display:'flex',width:'max-content'}}>
                                                    <input value={truncateNumber(i.user_point.profit)} style={{width:'5em'}}/>
                                                </span></td>
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
            :
            <></>
            }
        </Grid>
    )
}
export default OptimalPrices;