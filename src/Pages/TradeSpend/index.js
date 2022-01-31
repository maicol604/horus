import React from 'react';
import styled from "styled-components";

import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import SpeedDial from '../../Components/SpeedDial';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';

import PsychologyIcon from '@mui/icons-material/Psychology';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TableWrapper = styled.div`
    padding: 2em;
    table{
        th{
            text-transform: uppercase;
            white-space: nowrap;
        }
        td{
            //padding: 0 1em;
            white-space: nowrap;
            input{
                text-align: center;
                width: 4em;
            }
        }
        .curent-year{
            background-color: #ffc000;
        }
        .year{
            background-color: #9bc2e6;
        }
        .spacer{
            opacity: 0;
            padding: 0;
        }
        .changed{
            background-color: #a9d08e;
            border: 1px solid #000;
        }
    }
`;

const TradeSpend = () => {

    const [auth, setAuth] = React.useState({
        access_token:null
    });

    const [data, setData] = React.useState(null);

    const [promo, setPromo] = React.useState({});

    const [loading, setLoading] = React.useState(false);

    React.useEffect(()=>{
        var requestOptions = {
            method: 'GET',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };
    
        fetch("https://pricing.demo4to.com/api/auth/token?login=admin&password=admin&db=pricing", requestOptions)
        .then(response => response.json())
        .then(result => {
            setAuth(result);
        
            getValues(result.access_token);
    
        })
        .catch(error => console.log('error', error));
    },[])

    const truncateNumber = (number) => {
        try{
          return (number+'').toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        }
        catch{
          return (number)
        }
    }

    const getMonthName = (month) => {
        switch(month){
            case 0:
                return 'ENE'
            case 1:
                return 'FEB'
            case 2:
                return 'MAR'
            case 3:
                return 'ABR'
            case 4:
                return 'MAY'
            case 5:
                return 'JUN'
            case 6:
                return 'JUL'
            case 7:
                return 'AGO'
            case 8:
                return 'SEP'
            case 9:
                return 'ACT'
            case 10:
                return 'NOV'
            case 11:
                return 'DIC'
    }
    }

    const getValues = (t) => {
        let url = `https://pricing.demo4to.com/api/pricing.sku.subcategory/get_promo_sales_units?access-token=${t}`;

        let requestOptions = {
          method: 'GET',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        };
    
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log('trade',result)
            let periods = result.data.table[0].skus[0].values.map(i=>({date: getMonthName(new Date(i.date).getMonth())}));

            setData({...result.data, periods});
        })
        .catch(error => {
            console.log('error', error);
        });
    }

    const getSimulation = (t) => {
        let url = `https://pricing.demo4to.com/api/pricing.sku.subcategory/get_promo_sales_units?access-token=${t}&prices=${JSON.stringify(promo)}`;

        let requestOptions = {
          method: 'GET',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        };
        setLoading(true);
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            let periods = result.data.table[0].skus[0].values.map(i=>({date: getMonthName(new Date(i.date).getMonth())}));

            setLoading(false);
            console.log('trade simulacion',{...result.data, periods, oldValues:data})
            setData({...result.data, periods, oldValues:data});
        })
        .catch(error => {
            setLoading(false);
            console.log('error', error);
        });
    }

    const onPromoChange = (value, sku, client, period) => {
        //console.log(value, sku, client, period)
        let aux = {};
        if(promo[`${client}`]) {
            aux = promo[`${client}`];
        } 
        else {
            aux = {[`${period}`]:{}};
        }
        //console.log(aux)
        aux = {...aux, [`${period}`]:{...aux[`${period}`], [`${sku}`]:value}}
        console.log({[`${client}`]:aux})
        setPromo({...promo, [`${client}`]:aux})
    }

    const OnEnvChange = () => {

    }

    return (
        data?
        <TableWrapper>
            {/* {<div>
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
                                    //value={chartData.category}
                                    onChange={(e)=>{
                                        
                                    }}
                                >
                                    <MenuItem>test</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Seleccionar cliente</InputLabel>
                                <Select
                                    label="Seleccionar subcategoria"
                                    //value={chartData.category}
                                    onChange={(e)=>{
                                        
                                    }}
                                >
                                    <MenuItem>test</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>
            </div>} */}
            <div style={{maxWidth:'100%', overflowX:'auto', padding: '1em 0 1em 0', marginBottom: '1.5em'}}>
                <table cellSpacing="0" cellPadding="0">
                    <tr>
                        <th></th>
                        <th></th>
                        <th colspan="12" className='curent-year'>Año actual</th>
                        <th></th>
                        <th colspan="12" className='year'>Año Siguente</th>
                    </tr>
                    
                    <tr>
                        <td></td>
                        <td colspan="1" className='spacer'>--</td>
                        {
                            data.periods.map((i,index)=>(
                                index!==11?<td style={{padding:'0 .5em'}}>{i.date}</td>:<><td style={{padding:'0 .5em'}}>{i.date}</td><td colspan="1" className='spacer'>--</td></>
                            ))
                        }
                    </tr>
                    
                    {
                        data.vars.map((i, index)=>(
                            <tr key={index}>
                                <td style={{position:'sticky', left: 0, backgroundColor:'#fff', width:'10em'}}>{i.name}</td>
                                <td></td>
                                {
                                    i.values.map((j, k)=>(
                                        <>
                                            {k===12?<td colspan="1"></td>:<></>}
                                            <td>{j.value}</td>
                                        </>
                                    ))
                                }
                            </tr>
                        ))
                    
                    }

                </table>
            </div>
            <div style={{textAlign:'left', marginBottom: '2em'}}>
                <Button 
                    color="primary" 
                    variant='contained'
                    onClick={()=>{
                        getSimulation(auth.access_token)
                    }}
                    disabled={loading}
                >
                    simular
                </Button>
            </div>
            {
                data.table.map((j,index0)=>(
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <div style={{display:'flex', alignItems:'center'}}>
                                <span>imagen</span><span style={{marginLeft:'1em'}}>{j.name}</span>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{maxWidth:'100%', height: '40vh', overflow:'scroll', padding: '0em 0 1em 0', marginBottom: '1em'}}>
                                <div style={{backgroundColor:'#fff', width:'min-content', position: 'absolute', top: '4.5em', height:'3em', left: 0, zIndex: 10}}>
                                    <span style={{opacity:0}}>{new Array(Math.max(...j.skus.map(h=>h.name.length)) + 6).join( 'a' )}</span>
                                    {/* {console.log(Math.max(...j.skus.map(h=>h.name.length)))} */}
                                </div>
                                <table cellSpacing="0" cellPadding="0">
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th colspan="12" className='curent-year' style={{position:'sticky', top: '0', height:'1.5em'}}>Año actual</th>
                                        <th></th>
                                        <th colspan="12" className='year' style={{position:'sticky', top: '0', height:'1.5em'}}>Año Siguente</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        {
                                            data.periods.map((i,index)=>(
                                                index!==11?<td style={{position:'sticky', top: '1.5em', backgroundColor:'#fff'}}>{i.date}</td>:<><td style={{position:'sticky', top: '1.5em', backgroundColor:'#fff'}}>{i.date}</td><td colspan="1" className='spacer' style={{position:'sticky', top: '1.5em'}}>--</td></>
                                            ))
                                        }
                                    </tr>
                                    {
                                        j.skus.map((i, index)=>(
                                            <>
                                            <tr>
                                                <td rowspan='3' style={{position:'sticky', left:'0', backgroundColor:'#fff'}}>{i.name}</td>
                                            </tr>
                                            <tr>
                                                {i.values.map((k, count)=>{
                                                    return (
                                                        <>
                                                            {count===0?<td style={{position:'sticky', left:`${Math.max(...j.skus.map(h=>h.name.length))/2-1.5}em`, backgroundColor:'#fff'}}>BASE</td>:<></>}
                                                            <td>{truncateNumber(k.base_price)}</td>
                                                            {count===11?<td colspan="1"></td>:<></>}
                                                            
                                                        </>
                                                    )
                                                })}
                                            </tr>
                                            <tr>
                                                {i.values.map((k, count)=>{
                                                    //console.log(data.oldValues.table[index0][index], k)
                                                    return (
                                                        <>
                                                            {count===0?<td style={{position:'sticky', left:`${Math.max(...j.skus.map(h=>h.name.length))/2-1.5}em`, backgroundColor:'#fff'}}>PROMO</td>:<></>}
                                                            <td key={k.promo_price}><input style={{backgroundColor:data.oldValues?(data.oldValues.table[index0].skus[index].promo_price!==k.promo_price?'#a9d08e':'#fff'):'#fff'}} defaultValue={truncateNumber(k.promo_price)} onChange={(e)=>{onPromoChange(e.target.value, i.id, j.id, count)}} /></td>
                                                            {count===11?<td colspan="1"></td>:<></>}
                                                            
                                                        </>
                                                    )
                                                })}
                                            </tr>
                                            </>
                                        ))
                                    }
                                </table>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
            

            {/* {<div style={{marginTop: '5em'}}>
                <table>
                    <tr>
                        <th></th>
                        <th></th>
                        <th colspan="6" className='curent-year'>Año actual</th>
                        <th></th>
                        <th colspan="6" className='year'>Año Siguente</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <td>ENE</td>
                        <td>FEB</td>
                        <td>MAR</td>
                        <td>ABR</td>
                        <td>MAY</td>
                        <td>JUN</td>
                        <td colspan="1" className='spacer'>--</td>
                        <td>ENE</td>
                        <td>FEB</td>
                        <td>MAR</td>
                        <td>ABR</td>
                        <td>MAY</td>
                        <td>JUN</td>
                    </tr>
                    {
                        [1,2,3,4,5,6].map((i, index)=>(
                            <>
                                <tr>
                                    <td rowspan='2' style={{position:'sticky', left:'0', backgroundColor:'#fff'}}>{'SKU '+i}</td>
                                    <td>BASE</td>
                                    <td>00.00</td>
                                    <td>00.00</td>
                                    <td>00.00</td>
                                    <td>00.00</td>
                                    <td>00.00</td>
                                    <td>00.00</td>
                                    <td colspan="1" className='spacer'>--</td>
                                    <td>00.00</td>
                                    <td>00.00</td>
                                    <td>00.00</td>
                                    <td>00.00</td>
                                    <td>00.00</td>
                                    <td>00.00</td>
                                </tr>
                                <tr>
                                    <td>PROMO</td>
                                    <td><input defaultValue={'10.50'} /></td>
                                    <td><input defaultValue={'10.50'} /></td>
                                    <td><input defaultValue={'10.50'} /></td>
                                    <td><input defaultValue={'10.50'} /></td>
                                    <td><input defaultValue={'10.50'} /></td>
                                    <td><input defaultValue={'10.50'} /></td>
                                    <td colspan="1"></td>
                                    <td><input defaultValue={'10.50'} className='changed'/></td>
                                    <td><input defaultValue={'10.50'} className='changed'/></td>
                                    <td><input defaultValue={'10.50'} className='changed'/></td>
                                    <td><input defaultValue={'10.50'} /></td>
                                    <td><input defaultValue={'10.50'} /></td>
                                    <td><input defaultValue={'10.50'} /></td>
                                </tr>
                            </>
                        ))
                    }
                </table>
            </div>} */}
            <div style={{position:'fixed', right:'1em', bottom:'1em'}}>
                <SpeedDial/>
            </div>
        </TableWrapper>
        :
        <></>
    )
}

export default TradeSpend;