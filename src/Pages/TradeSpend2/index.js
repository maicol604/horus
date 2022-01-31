import React from 'react';
import styled from "styled-components";

import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import SpeedDial from '../../Components/SpeedDial';

import wlogo from '../../Assets/Img/test-logo.png';

const TableWrapper = styled.div`
    position: relative;
    //height: 10em;
    //overflow: scroll;
    table{
        th{
            text-transform: uppercase;
            padding: 0 1em;
            background-color: #a6a6a6;
            color: #fff;
            white-space: nowrap;
        }
        td{
            //padding: 0 1em;
            input{
                text-align: center;
                width: 100%;
            }
            white-space: nowrap
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
            border: 1px solid #a6a6a6;
        }
        .sku-name{
            padding: 0 1em;
            position: sticky;
            left: 0;
            background-color: #fff;
            z-index: 1;
        }
        .sub{
            background-color: #fff;
            color: #000;
        }
        .header{
            position: sticky;
            top: 0;
            height: 1.5em;
            //background-color: #fff;
        }
    }
`;

const TradeSpend = () => {

    const [auth, setAuth] = React.useState({
        access_token:null
    });

    const [retract, setRetract] = React.useState(true);

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
        })
        .catch(error => {
          console.log('error', error);
        });
    }

    return (
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
            {retract?
            <div>
                <table cellSpacing="0" cellPadding="0">
                    <tr>
                        <th style={{backgroundColor:'transparent'}}></th>
                        <th style={{backgroundColor:'transparent'}}></th>
                        <th colSpan={"2"} style={{backgroundColor:'#0070c0'}}>BASE</th>
                        <th colSpan={"2"} style={{backgroundColor:'red'}}>PROMOCIÓN</th>
                        <th colSpan={"1"} className='spacer'>--</th>
                        <th colSpan={"2"}>GROSS SALES</th>
                        <th colSpan={"2"}>COND. COM.</th>
                        <th colSpan={"2"}>TRADE SPEND</th>
                        <th colSpan={"2"}>NET SALES</th>
                        <th colSpan={"2"}>OP</th>
                        <th rowSpan={'2'}>ROI %</th>
                        <th rowSpan={'2'}>UPLIFT %</th>
                    </tr>
                    <tr>
                        <th style={{backgroundColor:'transparent'}}></th>
                        <th style={{backgroundColor:'transparent'}}></th>
                        <th className='sub'>Precio</th>
                        <th className='sub'>Volumen</th>
                        <th className='sub'>Precio</th>
                        <th className='sub'>Volumen</th>
                        <th className='sub' style={{backgroundColor:'transparent'}}></th>
                        <th className='sub'>Base</th>
                        <th className='sub'>Promo</th>
                        <th className='sub'>Base</th>
                        <th className='sub'>Promo</th>
                        <th className='sub'>Base</th>
                        <th className='sub'>Promo</th>
                        <th className='sub'>Base</th>
                        <th className='sub'>Promo</th>
                        <th className='sub'>Base</th>
                        <th className='sub'>Promo</th>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{padding:'0 1em'}}>TOTAL AUTOSERVICIOS</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td></td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>  
                    </tr>
                    <tr>
                        <th style={{backgroundColor:'transparent'}}>--</th>
                    </tr>

                    {
                        [1,2,3,4].map((i, index)=>(
                            <>
                            <tr>
                                <td rowSpan={'3'} style={{borderBottom:'1px solid #a6a6a6'}}>
                                    <div style={{width:'100%', padding: '1em', boxSizing:'border-box'}}>
                                        <img src={wlogo} alt='' style={{width:'100%'}}/>
                                    </div>
                                </td>
                                <td className='sku-name'>SKU 1</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td></td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>  
                            </tr>
                            <tr>
                                <td className='sku-name'>SKU 2</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td></td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>  
                            </tr>
                            <tr>
                                <td style={{borderBottom:'1px solid #a6a6a6'}} className='sku-name'>SKU 3</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}></td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>  
                            </tr>
                            </>
                        ))
                    }
                </table>
            </div>
            :
            <div style={{position:'relative'}}>
                <table cellSpacing="0" cellPadding="0">
                    <tr>
                        <th colSpan={2} className='sku-name'></th>  
                        <th colSpan={"4"} className='header'>Enero</th>
                        <th colSpan={"4"} className='header'>Febrero</th>
                        <th colSpan={"1"} className='spacer'>--</th>
                        <th colSpan={"4"} className='header' style={{backgroundColor:'#ffe699', color:'#000'}}>GROSS SALES</th>
                        <th colSpan={"1"} className='spacer'>--</th>
                        <th colSpan={"4"} className='header' style={{backgroundColor:'#ffe699', color:'#000'}}>COND. COM.</th>
                        <th colSpan={"1"} className='spacer'>--</th>
                        <th colSpan={"4"} className='header' style={{backgroundColor:'#ffe699', color:'#000'}}>TRADE SPEND</th>
                    </tr>
                    <tr>
                        <th colSpan={2} className='sku-name'></th>
                        <th colSpan={"2"} className='header' style={{backgroundColor:'#9bc2e6', color:'#000', top:'1.5em'}}>BASE</th>
                        <th colSpan={"2"} className='header' style={{backgroundColor:'red', top:'1.5em'}}>PROMOCIÓN</th>
                        <th colSpan={"2"} className='header' style={{backgroundColor:'#9bc2e6', color:'#000', top:'1.5em'}}>BASE</th>
                        <th colSpan={"2"} className='header' style={{backgroundColor:'red', top:'1.5em'}}>PROMOCIÓN</th>
                        <th style={{backgroundColor:'transparent'}}></th>
                        <th colSpan={"2"} className='header' style={{backgroundColor:'#fff', color:'#000', top:'1.5em'}}>Enero</th>
                        <th colSpan={"2"} className='header' style={{backgroundColor:'#fff', color:'#000', top:'1.5em'}}>Febrero</th>
                        <th style={{backgroundColor:'transparent'}}></th>
                        <th colSpan={"2"} className='header' style={{backgroundColor:'#fff', color:'#000', top:'1.5em'}}>Enero</th>
                        <th colSpan={"2"} className='header' style={{backgroundColor:'#fff', color:'#000', top:'1.5em'}}>Febrero</th>
                        <th style={{backgroundColor:'transparent'}}></th>
                        <th colSpan={"2"} className='header' style={{backgroundColor:'#fff', color:'#000', top:'1.5em'}}>Enero</th>
                        <th colSpan={"2"} className='header' style={{backgroundColor:'#fff', color:'#000', top:'1.5em'}}>Febrero</th>
                    </tr>
                    <tr>
                        <th colSpan={2} className='sku-name'></th>
                        <th className='sub' className='header' style={{top:'3em'}}>Precio</th>
                        <th className='sub' className='header' style={{top:'3em'}}>Volumen</th>
                        <th className='sub' className='header' style={{top:'3em'}}>Precio</th>
                        <th className='sub' className='header' style={{top:'3em'}}>Volumen</th>
                        <th className='sub' className='header' style={{top:'3em'}}>Precio</th>
                        <th className='sub' className='header' style={{top:'3em'}}>Volumen</th>
                        <th className='sub' className='header' style={{top:'3em'}}>Precio</th>
                        <th className='sub' className='header' style={{top:'3em'}}>Volumen</th>
                        <th className='sub' style={{backgroundColor:'transparent'}}></th>
                        <th className='sub' className='header' style={{backgroundColor:'#9bc2e6', top:'3em'}}>Base</th>
                        <th className='sub' className='header' style={{backgroundColor:'red', color:'#fff', top:'3em'}}>Promo</th>
                        <th className='sub' className='header' style={{backgroundColor:'#9bc2e6', top:'3em'}}>Base</th>
                        <th className='sub' className='header' style={{backgroundColor:'red', color:'#fff', top:'3em'}}>Promo</th>
                        <th className='sub' className='header' style={{backgroundColor:'transparent'}}></th>
                        <th className='sub' className='header' style={{backgroundColor:'#9bc2e6', top:'3em'}}>Base</th>
                        <th className='sub' className='header' style={{backgroundColor:'red', color:'#fff', top:'3em'}}>Promo</th>
                        <th className='sub' className='header' style={{backgroundColor:'#9bc2e6', top:'3em'}}>Base</th>
                        <th className='sub' className='header' style={{backgroundColor:'red', color:'#fff', top:'3em'}}>Promo</th>
                        <th className='sub' className='header' style={{backgroundColor:'transparent'}}></th>
                        <th className='sub' className='header' style={{backgroundColor:'#9bc2e6', top:'3em'}}>Base</th>
                        <th className='sub' className='header' style={{backgroundColor:'red', color:'#fff', top:'3em'}}>Promo</th>
                        <th className='sub' className='header' style={{backgroundColor:'#9bc2e6', top:'3em'}}>Base</th>
                        <th className='sub' className='header' style={{backgroundColor:'red', color:'#fff', top:'3em'}}>Promo</th>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{padding:'0 1em'}} className='sku-name'></td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td></td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td></td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>  
                        <td></td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>  
                    </tr>
                    <tr>
                        <td className='sku-name' colSpan={2}>SKU 1</td>
                        <th style={{backgroundColor:'transparent'}}>--</th>
                    </tr>

                    {
                        [1,2,3,4,5,6,7,8].map((i, index)=>(
                            <>
                            <tr>
                                <td className='sku-name' colSpan={2}>SKU 1</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td></td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td></td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>  
                                <td></td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>  
                            </tr>
                            <tr>
                                <td className='sku-name' colSpan={2}>SKU 2</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td></td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td></td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>  
                                <td></td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>
                                <td>00.00</td>  
                            </tr>
                            <tr>
                                <td style={{borderBottom:'1px solid #a6a6a6'}} className='sku-name' colSpan={2}>SKU 3</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}></td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}></td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td> 
                                <td style={{borderBottom:'1px solid #a6a6a6'}}></td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>
                                <td style={{borderBottom:'1px solid #a6a6a6'}}>00.00</td>  
                            </tr>
                            </>
                        ))
                    }
                </table>
            </div>
            }
            <div style={{position:'fixed', right:'1em', bottom:'1em'}}>
                <SpeedDial/>
            </div>
        </TableWrapper>
    )
}

export default TradeSpend;