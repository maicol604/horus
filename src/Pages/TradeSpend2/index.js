import React from 'react';
import styled from "styled-components";

import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import SpeedDial from '../../Components/SpeedDial';

import img1 from '../../Assets/Img/clients/client (1).jpeg';
import img2 from '../../Assets/Img/clients/client (2).jpeg';
import img3 from '../../Assets/Img/clients/client (3).jpeg';
import img4 from '../../Assets/Img/clients/client (4).jpeg';
import img5 from '../../Assets/Img/clients/client (5).jpeg';
import img6 from '../../Assets/Img/clients/client (6).jpeg';
import img7 from '../../Assets/Img/clients/client (7).jpeg';
import img8 from '../../Assets/Img/clients/client (8).jpeg';
import wlogo from '../../Assets/Img/test-logo.png';

const images = [img6, img2, img3, img7, img8, img1, img5, img4];


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

const TradeSpend = ({data, dataExpand}) => {

    const truncateNumber = (number) => {
        try{
          return (number+'').toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        }
        catch{
          return (number)
        }
    }

    const [retract, setRetract] = React.useState(true);

    return (
        <TableWrapper>
            {retract?
            (data?
            <div>
                <table cellSpacing="0" cellPadding="0">
                    <tr>
                        <th style={{backgroundColor:'transparent'}} className='sku-name'></th>
                        <th style={{backgroundColor:'#fff'}} className='sku-name'></th>
                        <th colSpan={"2"} style={{backgroundColor:'#6fd1b0', color:'#000'}}>BASE</th>
                        <th colSpan={"2"} style={{backgroundColor:'#ebce75', color:'#000'}}>PROMOCIÓN</th>
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
                        <th style={{backgroundColor:'#fff'}} className='sku-name'></th>
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
                    {data.filter(i=>(i.id===0)).map((i)=>(
                        <tr>
                            <td></td>
                            <td colSpan={1} style={{padding:'0 1em'}} className='sku-name'>TOTAL AUTOSERVICIOS</td>
                            <td>{truncateNumber(i.values.base_price)}</td>
                            <td>{truncateNumber(i.values.base_qty)}</td>
                            <td>{truncateNumber(i.values.promo_price)}</td>
                            <td>{truncateNumber(i.values.promo_qty)}</td>
                            <td></td>
                            <td>{truncateNumber(i.values.base_gross_sale)}</td>
                            <td>{truncateNumber(i.values.promo_gross_sale)}</td>
                            <td>{truncateNumber(i.values.base_commercial_cond)}</td>
                            <td>{truncateNumber(i.values.promo_commercial_cond)}</td>
                            <td colSpan={2} style={{textAlign:'right'}}>{truncateNumber(i.values.trade_spend)}</td>
                            <td>{truncateNumber(i.values.base_net_sale)}</td>
                            <td>{truncateNumber(i.values.promo_net_sale)}</td>
                            <td>{truncateNumber(i.values.base_op)}</td>
                            <td>{truncateNumber(i.values.promo_op)}</td>
                            <td>{truncateNumber(i.values.roi)}</td>
                            <td>{truncateNumber(i.values.uplift)}</td>  
                        </tr>
                    ))}
                    
                    <tr>
                        <th style={{backgroundColor:'transparent'}}>--</th>
                    </tr>

                    {
                        data.filter(i=>(i.id!==0)).map((i, index)=>(
                            <>
                            <tr>
                                <td rowSpan={`${i.skus.length+1}`} style={{borderBottom:'1px solid #a6a6a6'}}>
                                    <div style={{width:'100%', padding: '1em', boxSizing:'border-box'}}>
                                        <img src={images[index]} alt='' style={{width:'100%'}}/>
                                    </div>
                                    {i.name}
                                </td>
                            </tr>
                            {
                                i.skus.map((j, index0)=>(
                                    index0===(i.skus.length-1)?
                                    <tr>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}} className='sku-name'>{j.name}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.base_price)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.base_qty)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.promo_price)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.promo_qty)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}></td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.base_gross_sale)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.promo_gross_sale)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.base_commercial_cond)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.promo_commercial_cond)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6', textAlign:'right'}} colSpan={2}>{truncateNumber(j.trade_spend)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.base_net_sale)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.promo_net_sale)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.base_op)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.promo_op)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.roi)}</td>
                                        <td style={{borderBottom:'1px solid #a6a6a6'}}>{truncateNumber(j.uplift)}</td>  
                                    </tr>
                                    :
                                    <tr>
                                        <td className='sku-name'>{truncateNumber(j.name)}</td>
                                        <td>{truncateNumber(j.base_price)}</td>
                                        <td>{truncateNumber(j.base_qty)}</td>
                                        <td>{truncateNumber(j.promo_price)}</td>
                                        <td>{truncateNumber(j.promo_qty)}</td>
                                        <td></td>
                                        <td>{truncateNumber(j.base_gross_sale)}</td>
                                        <td>{truncateNumber(j.promo_gross_sale)}</td>
                                        <td>{truncateNumber(j.base_commercial_cond)}</td>
                                        <td>{truncateNumber(j.promo_commercial_cond)}</td>
                                        <td colSpan={2} style={{textAlign:'right'}}>{truncateNumber(j.trade_spend)}</td>
                                        <td>{truncateNumber(j.base_net_sale)}</td>
                                        <td>{truncateNumber(j.promo_net_sale)}</td>
                                        <td>{truncateNumber(j.base_op)}</td>
                                        <td>{truncateNumber(j.promo_op)}</td>
                                        <td>{truncateNumber(j.roi)}</td>
                                        <td>{truncateNumber(j.uplift)}</td>  
                                    </tr>
                                ))
                            }
                            </>
                        ))
                    }
                </table>
            </div>
            :<></>
            )
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