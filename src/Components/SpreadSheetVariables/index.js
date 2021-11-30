import React from 'react';
import Spreadsheet from "react-spreadsheet";

export default () => {
    const [data, setData] = React.useState([])
    const getDates = () => {
        let v = [...Array(new Date().getYear()).keys()].reverse().map(item=>([{value:(item+1901), disabled: true}, {value:''}]));
        //console.log(v)
        return v;
    }

    React.useEffect(()=>{
        setData(getDates())
    },[])

    return <Spreadsheet data={data} onChange={setData}/>;
};