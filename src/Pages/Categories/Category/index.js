import React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import FullScreenDialog from '../../../Components/FullScreenDialog';

const Category = ({data}) => {

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        //console.log('test')
        setOpen(!open);
    }
 
    const sortSkus = (base, sorted, brands) => {
        let aux = [];
        let skus = [];

        //console.log(brands, sorted)
        for(let j=0;j<brands.length;j++){
            for(let i=0;i<sorted.length;i++){
                if(`${brands[j].id}`===`${sorted[i].grouper.id}`){
                    skus.push(sorted[i])
                }
            }
        }

        //console.log(skus)
        for(let j=0;j<base.length;j++){
            for(let i=0;i<skus.length;i++){
                ////console.log(`${base[j].id}`+`${sorted[i].subcategory}`)
                if(`${base[j].id}`===`${skus[i].subcategory.id}`){
                    aux.push(skus[i])
                }
            }
        }
        ////console.log('aux', sorted, base)
        return aux;
    }

    const sortSubcategories = (base, sorted) => {
        let aux = [];

        ////console.log('sortSubcategories',base,sorted)
        for(let j=0;j<base.length;j++){
            for(let i=0;i<sorted.length;i++){
                ////console.log(`${base[j].id}`+`${sorted[i].category}`)
                if(`${base[j].id}`===`${sorted[i].category.id}`){
                    aux.push(sorted[i])
                }
            }
        }
        
        return aux;
    }

    return (
        <>
            <Grid container alignItems='center' spacing={3}>
                <Grid item xs={12}>
                    <Paper 
                        variant="outlined"
                        style={{padding:'1em'}}
                    >
                        <div>
                            <Grid container alignItems='center' spacing={1} alignItems="stretch">
                                <Grid item xs={12}>
                                    <Typography 
                                        variant='subtitle1'
                                        align='left'
                                        style={{textTransform:'capitalize'}}
                                    >
                                        {data.category.name}
                                    </Typography>
                                    <Typography variant='body2' align='left' display='flex' alignItems='center'>
                                        {data.category.description}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} align='left'>
                                    <FullScreenDialog
                                        skus={sortSkus( data.subcategories, data.skus, data.groupers)}
                                        categories={[data.category]}
                                        subcategories={sortSubcategories( [data.category], data.subcategories)}
                                        brands={data.groupers}
                                        position='relative'
                                    >
                                        <Button variant="outlined">
                                            Ver grafico
                                        </Button>
                                    </FullScreenDialog>
                                </Grid>
                                <Grid item xs={12} align='left' style={{marginBottom: open ? '1.5em': '0'}}>
                                    {open ? <div style={{display:'flex', alignItems:'center', width:'max-content', cursor:'pointer'}} onClick={handleClick}>Ver menos <ExpandLess/></div> : <div style={{display:'flex', alignItems:'center', width:'max-content', cursor:'pointer'}} onClick={handleClick}>Ver mas <ExpandMore/></div>}
                                </Grid>
                            </Grid>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Grid container alignItems='center' spacing={3} alignItems="stretch">
                                    <Grid item xs={12} style={{display: 'flex'}}>
                                        <Paper 
                                            variant="outlined"
                                            style={{padding:'1em', width: '100%'}}
                                        >
                                            <Typography 
                                                variant='subtitle2'
                                                align='left'
                                                style={{textTransform:'capitalize'}}
                                            >
                                                Subcategorias
                                            </Typography>
                                            <Divider light style={{marginBottom: '.5em'}}/>
                                            <div>
                                                {
                                                    data.subcategories.map((data, index)=>{
                                                        return (
                                                            <div key={index} style={{display:'flex', flexDirection:'column'}}>
                                                                <Typography variant='body2' align='left' display='flex' alignItems='center'>
                                                                    <div style={{width:'1em', height:'1em', backgroundColor:data.color, marginRight:'.5em', borderRadius: '50%'}}/>
                                                                    {data.name}
                                                                </Typography>
                                                                <Typography variant='caption' align='left' display='flex' alignItems='center'>
                                                                    {data.description}
                                                                </Typography>
                                                                <Divider light style={{marginBottom: '.5em'}}/>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Paper>
                                    </Grid>
                                    
                                    <Grid item xs={12} style={{display: 'flex'}}>
                                        <Paper 
                                            variant="outlined"
                                            style={{padding:'1em', width: '100%'}}
                                        >
                                            <Typography 
                                                variant='subtitle2'
                                                align='left'
                                                style={{textTransform:'capitalize'}}
                                            >
                                                Marcas
                                            </Typography>
                                            <Divider light style={{marginBottom: '.5em'}}/>
                                            <div>
                                                {
                                                    data.groupers.map((data, index)=>{
                                                        return (
                                                            <div key={index} style={{display:'flex', flexDirection:'column'}}>
                                                                <Typography variant='body2' align='left' display='flex' alignItems='center'>
                                                                    <div style={{width:'1em', height:'1em', backgroundColor:data.color, marginRight:'.5em', borderRadius: '50%'}}/>
                                                                    {data.name}
                                                                </Typography>
                                                                <Typography variant='caption' align='left' display='flex' alignItems='center'>
                                                                    {data.maker}
                                                                </Typography>
                                                                <Divider light style={{marginBottom: '.5em'}}/>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} style={{display: 'flex'}}>
                                        <Paper 
                                            variant="outlined"
                                            style={{padding:'1em', width: '100%'}}
                                        >
                                            <Typography 
                                                variant='subtitle2'
                                                align='left'
                                                style={{textTransform:'capitalize'}}
                                            >
                                                SKUs
                                            </Typography>
                                            <Divider light style={{marginBottom: '.5em'}}/>
                                            <div>
                                                {
                                                    data.skus.map((data, index)=>{
                                                        return (
                                                            <div key={index} style={{display:'flex', flexDirection:'column'}}>
                                                                <Typography key={index} variant='body2' align='left'>
                                                                    {data.name}
                                                                </Typography>
                                                                <Typography key={index} variant='caption' align='left'>
                                                                    {data.grouper.name} / {data.grouper.maker}
                                                                </Typography>
                                                                <Typography key={index} variant='caption' align='left'>
                                                                    {data.content} {data.unit} / {data.presentation}
                                                                </Typography>
                                                                <Divider light style={{marginBottom: '.5em'}}/>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Collapse>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Category;