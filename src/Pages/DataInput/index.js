import React from 'react';
import Tabs from '../../Components/Tabs';
import Spreadsheet from "react-spreadsheet"

const DataInput = ({categories}) => {
    //console.log(categories, categories.map(i=>(i.skus.map(j=>({value:j.name})))))

    const [state, setState] = React.useState({
        option:0,
        data:[
            [{ value: "" }, { value: "Venta en unidades" }, {value:'Precio'}, {value:'Distribucion'}], 
        ]
    })

    const getContent = (option) => {
        return (
            <Spreadsheet
                data={[...state.data, ...categories[option].skus.map(i=>([{value:i.name}]))]} 
                onChange={()=>{

                }}
            />
        )
    }

    return (
        <>
            <Tabs
                tabs={categories.map(i=>({name:i.category.name}))}
                onChange={(e)=>{
                    setState({...state, option:e})
                }}
            >
                {
                    getContent(state.option)
                }
            </Tabs>
        </>
    )
}

export default DataInput;