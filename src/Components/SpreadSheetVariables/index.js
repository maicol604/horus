import React from 'react';
import Spreadsheet from "react-spreadsheet";

export default ({initDate, periodicity}) => {
    const [data, setData] = React.useState([])
    const getDates = () => {
        let v = [];
        let aux;
        //console.log(initDate)
        try {
            // v = [...Array(new Date().getYear()).keys()].reverse().map(item=>([{value:(item+initDate.getFullYear()), disabled: true}, {value:''}]));  
            switch(periodicity){
                case 'daily':
                    aux = new Date(initDate);
                    while(aux<(new Date())){
                    //console.log(aux.getDate())
                        v.push([{value:`${aux.getDate()}/${aux.getMonth()+1}/${aux.getFullYear()}`}, {value:''}]);
                        aux.setDate(aux.getDate()+1)
                    }
                break;
                case 'weekly':
                    aux = new Date(initDate);
                    while(aux<(new Date())){
                    //console.log(aux.getDate())
                        v.push([{value:`${aux.getDate()}/${aux.getMonth()+1}/${aux.getFullYear()}`}, {value:''}]);
                        aux.setDate(aux.getDate()+7)
                    }
                break;
                case 'monthly':
                    aux = new Date(initDate);
                    while(aux<(new Date())){
                        //console.log(aux.getDate())
                        v.push([{value:`${aux.getDate()}/${aux.getMonth()+1}/${aux.getFullYear()}`}, {value:''}]);
                        aux.setMonth(aux.getMonth()+1)
                    }
                break;
                case 'quarterly':
                    aux = new Date(initDate);
                    while(aux<(new Date())){
                        //console.log(aux.getDate())
                        v.push([{value:`${aux.getDate()}/${aux.getMonth()+1}/${aux.getFullYear()}`}, {value:''}]);
                        aux.setMonth(aux.getMonth()+3)
                    }
                break;
                case 'biannual':
                    aux = new Date(initDate);
                    while(aux<(new Date())){
                        //console.log(aux.getDate())
                        v.push([{value:`${aux.getDate()}/${aux.getMonth()+1}/${aux.getFullYear()}`}, {value:''}]);
                        aux.setMonth(aux.getMonth()+6)
                    }
                break;
                case 'annual':
                    aux = new Date(initDate);
                    while(aux<(new Date())){
                        //console.log(aux.getDate())
                        v.push([{value:`${aux.getDate()}/${aux.getMonth()+1}/${aux.getFullYear()}`}, {value:''}]);
                        aux.setFullYear(aux.getFullYear()+1)
                    }
                break;
            }
        } catch (error) {
        }
        //console.log(v)
        return v;
    }

    React.useEffect(()=>{
        setData(getDates())
    },[])

    return <Spreadsheet data={data} onChange={setData}/>;
};