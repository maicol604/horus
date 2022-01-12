import React from 'react';
import Tabs from '../../Components/Tabs';
import Spreadsheet from "react-spreadsheet";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const periodos = new Array(52).fill(null);

const DataInput = ({categories}) => {
    //console.log(categories, categories.map(i=>(i.skus.map(j=>({value:j.name})))))

    const [state, setState] = React.useState({
        option:0,
        
    })

    const getContent = (option, subcategory, category) => {
        let skus = category.skus.filter(i=>i.subcategory.id===subcategory.id);
         console.log(category)
        // console.log(category.skus.filter(i=>i.subcategory.id===subcategory.id))
        // console.log(skus.map(i=>({value:i.name})))
        //console.log(periodos.fill([{value:'test'}]))
        return (
            
            <Tabs
                tabs={category.subcategories.map(i=>({name:i.name}))}
                onChange={(e)=>{
                    //setState({...state, option:e})
                }}
            >
                <div style={{display:'flex'}}>
                    <div style={{marginRight:'1em'}}>
                        <Typography
                            variant='subtitle1'
                            align='left'
                            display='block'
                        >
                            Total subcategoria
                        </Typography>
                        <Spreadsheet
                            data={[[{value:'Semana'},{value:'SCQ'}, {value:'PSC'}], ...periodos.map((i, index)=>([{value:index+1}]))]} 
                            onChange={()=>{

                            }}
                        />
                    </div>
                    <div style={{marginRight:'1em'}}>
                        <Typography
                            variant='subtitle1'
                            align='left'
                            display='block'
                        >   
                            Venta en unidades
                        </Typography>
                        <Spreadsheet
                            data={[[...skus.map(i=>({value:i.name}))], ...periodos.map((i, index)=>([{value:''}]))]} 
                            onChange={()=>{

                            }}
                        />
                    </div>
                    <div style={{marginRight:'1em'}}>
                        <Typography
                            variant='subtitle1'
                            align='left'
                            display='block'
                        >   
                            Precio
                        </Typography>
                        <Spreadsheet
                            data={[[...skus.map(i=>({value:i.name}))], ...periodos.map((i, index)=>([{value:''}]))]} 
                            onChange={()=>{

                            }}
                        />
                    </div>
                    <div style={{marginRight:'1em'}}>
                        <Typography
                            variant='subtitle1'
                            align='left'
                            display='block'
                        >   
                            Distribución
                        </Typography>
                        <Spreadsheet
                            data={[[...skus.map(i=>({value:i.name}))], ...periodos.map((i, index)=>([{value:''}]))]} 
                            onChange={()=>{

                            }}
                        />
                    </div>
                </div>
            </Tabs>
        )
    }

    return (
        <>
            <div style={{display:'flex', justifyContent:'flex-end', padding:'2em 2em 0 0 '}}>
                <Button color="primary"  variant='contained' size="large" style={{height:'3.5em'}} onClick={()=>{window.location.reload()}}>
                    Finalizar
                </Button>
            </div>
            <Tabs
                tabs={categories.map(i=>({name:i.category.name}))}
                onChange={(e)=>{
                    setState({...state, option:e})
                }}
            >
                {
                    getContent(state.option, categories[state.option].subcategories[0], categories[state.option])
                }
            </Tabs>
        </>
    )
}

export default DataInput;