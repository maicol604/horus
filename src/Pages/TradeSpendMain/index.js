import React from 'react';

import TradeSpend1 from '../TradeSpend';
import TradeSpend2 from '../TradeSpend2';
import Tabs from '../../Components/Tabs';
import Loader from '../../Components/Loader';

const TradeSpendMain = () => {

    const [option, setOption] = React.useState(0);
    
    const [data, setData] = React.useState(null);
    const [data2, setData2] = React.useState(null);
    const [simulationData, setSimulationData] = React.useState(null);

    const [auth, setAuth] = React.useState({
        access_token:null
    });

    const [loading, setLoading] = React.useState(false);

    const [promo, setPromo] = React.useState({});

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
            let periods = result.data.table[0].skus[0].values.map(i=>({date: getMonthName(new Date(i.date).getMonth())}));
            console.log('trade',{...result.data, periods})

            //setSimulationData({...result.data, periods});
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
            console.log(result.data);
            setLoading(false);
            //console.log('trade simulacion',{...result.data, periods, oldValues:data})
            setSimulationData({...result.data, periods, oldValues:data});
            getValues2(t, result.data);
            //setData({...result.data, periods, oldValues:data});
            setOption(1);
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
        //console.log({[`${client}`]:aux})
        setPromo({...promo, [`${client}`]:aux})

        let dataAux = data;

        dataAux = {
            ...dataAux, 
            table:dataAux.table.map((j)=>(
                {
                    ...j,
                    skus: j.skus.map((i)=>( 
                        {...i, values:i.values.map((k, index)=>({ ...k, promo_price:(`${index}`===`${period}` && `${i.id}`===`${sku}` && `${j.id}`===`${client}`)?value:k.promo_price }))} 
                    ))
                }
            ))
        }

        setData({...data, ...dataAux})


    }

    const getValues2 = (t, values) => {
        let url = `https://pricing.demo4to.com/api/trade.spend.values/get_collapsed_p_l?access-token=${t}&start_period=1&end_period=23`;

        //&values=${JSON.stringify(values)}

        //console.log(JSON.stringify(values))

        let requestOptions = {
            method: 'GET',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        };
    
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log('getValues2',result)
            if(result.type!=="Exception")
                setData2(result.data);
        })
        .catch(error => {
            console.log('getValues2', error);
        });

    }

    const getContent = (op) => {
        //console.log('sw data',data)
        switch(op){
            case 0:
                return (
                    <>
                        <TradeSpend1
                            editable={true}
                            data={data}
                            onSimulate={()=>getSimulation(auth.access_token)}
                            onPromoChange={onPromoChange}
                            loading={loading}
                            promo={Object.keys(promo).length>0}
                        />
                    </>
                )
            case 1:
                return (
                    <>
                        <TradeSpend1
                            editable={false}
                            data={simulationData}
                            onSimulate={()=>getSimulation(auth.access_token)}
                            onPromoChange={onPromoChange}
                            loading={loading}
                        />
                    </>
                )
            case 2:
                return (
                    <div style={{width:'100%', overflow:'auto', height:'70vh'}}>
                        <TradeSpend2
                            data={data2}
                        />
                    </div>
                )
            default:
                return (<></>)
        }
    }

    return (
        data?
        <>
            <Tabs
                tabs={[{value:0, name:'Promociones'},{value:1, name:'Volumenes'},{value:2, name:'Generar P&L'}]}
                onChange={(op)=>setOption(op)}
                option={option}
            >
                {
                    getContent(option)
                }
            </Tabs>
        </>
        :
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '80vh', width:'100%'}}>
            <Loader/>    
        </div>
    )
}

export default TradeSpendMain;