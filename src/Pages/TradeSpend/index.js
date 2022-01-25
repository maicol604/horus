import React from 'react';
import styled from "styled-components";

import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import SpeedDial from '../../Components/SpeedDial';

const TableWrapper = styled.div`
    table{
        th{
            text-transform: uppercase;
        }
        td{
            padding: 0 1em;
            input{
                text-align: center;
                width: 100%;
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
    return (
        <TableWrapper>
            <div>
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
            </div>
            <div>
                <table>
                    <tr>
                        <th></th>
                        <th></th>
                        <th colspan="6" className='curent-year'>Año actual</th>
                        <th></th>
                        <th colspan="6" className='year'>Año Siguente</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td colspan="1" className='spacer'>--</td>
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
                    <tr>
                        <td>Enviroment</td>
                        <td colspan="1"></td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td colspan="1"></td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                    </tr>
                    <tr>
                        <td>Enviroment</td>
                        <td colspan="1"></td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td colspan="1"></td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                    </tr>
                    <tr>
                        <td>Enviroment</td>
                        <td colspan="1"></td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td colspan="1"></td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>00.00</td>
                    </tr>
                </table>
            </div>
            <div style={{marginTop: '5em'}}>
                <table>
                    <tr>
                        <th></th>
                        <th></th>
                        <th colspan="6" className='curent-year'>Año actual</th>
                        <th></th>
                        <th colspan="6" className='year'>Año Siguente</th>
                    </tr>
                    {
                        [1,2,3,4,5,6].map((i, index)=>(
                            <>
                                <tr>
                                    <td rowspan='2' style={{position:'sticky', left:'0', backgroundColor:'#fff'}}>{'SKU '+i}</td>
                                    <td>BASE</td>
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
            </div>
            <div style={{marginTop: '5em'}}>
                <table>
                    <tr>
                        <th></th>
                        <th></th>
                        <th colspan="6" className='curent-year'>Año actual</th>
                        <th></th>
                        <th colspan="6" className='year'>Año Siguente</th>
                    </tr>
                    {
                        [1,2,3,4,5,6].map((i, index)=>(
                            <>
                                <tr>
                                    <td rowspan='2' style={{position:'sticky', left:'0', backgroundColor:'#fff'}}>{'SKU '+i}</td>
                                    <td>BASE</td>
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
            </div>
            <div style={{position:'fixed', right:'1em', bottom:'1em'}}>
                <SpeedDial/>
            </div>
        </TableWrapper>
    )
}

export default TradeSpend;