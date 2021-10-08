import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { makeStyles } from '@mui/styles';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';

import ConfirmDialog from '../../../Components/ConfirmDialog';
import RadioGroup from '../../../Components/RadioGroup';
import RadioGropupGroupers from './RadioGropupGroupers';

const initialValue = {
    name:'',
    description:'',
    grouper:null,
    subcategory:null
}

const useStyles = makeStyles((theme) => ({
    formControl: {
       // margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        //marginTop: theme.spacing(2),
    },
    colorSquare: {
        width: '1em',
        height: '1em',
        borderRadius: '2px',
        marginRight: '.5em',
        border: '2px solid #c4c4c4',
    },
    colorContainer: {
        display: 'flex',
        alignItems: 'center',
        width: 'inherit'
    },
}));

const Step2 = ({ groupers=[], pushSku, subcategories=[], skus=[] }) => {

    const classes = useStyles();
    const [sku, setSku] = React.useState({
        ...initialValue
    })

    React.useEffect(()=>{
        console.log('useffect',groupers,skus)
    },[skus])

    const getSkus = () => {
        return (
            skus.map((data, index) => 
                <React.Fragment>
                    <Grid item xs={3}>
                        <Typography>
                            {data.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>
                            {data.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        {
                            data.grouper?
                                <div className={classes.colorContainer}>
                                    <div className={classes.colorSquare} style={{backgroundColor:data.grouper.color}}/>
                                    <Typography variant="subtitle1" align="left">{data.grouper.name}</Typography>
                                </div>
                            :
                            <></>
                        }
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>
                            {data.subcategory.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <div
                            style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}
                        >
                            <ConfirmDialog
                                message='Esta seguro de eliminar esta categoria?'
                                title='Esta seguro de eliminar esta categoria?'
                                onOk={()=>{handleRemoveSku(index)}}
                            >
                                <DeleteIcon/>
                            </ConfirmDialog>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <div
                            style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}
                            onClick={()=>{}}
                        >
                            <EditIcon/>
                        </div>
                    </Grid>
                </React.Fragment>
            )
        )
    }

    const handleInputSku = (e) => {
        const {name, value} = e.target;
        setSku({...sku, [name]:value});
    }

    const handleSaveSku = () => {
        console.log(sku)
        let cpy = JSON.stringify(sku);
        if(pushSku){
            pushSku(JSON.parse(cpy));
        }   
        setSku({...initialValue})
    }

    const handleRemoveSku = (index) => {

    }

    return (
        <React.Fragment>
            <Grid container alignItems='center' spacing={3}>
                <Grid item xs={12}>
                    <Typography
                        variant='h6'
                    >
                        Añade o elimina tus SKUS
                    </Typography>
                    <Typography
                        variant='caption'
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Typography variant="subtitle1" align="left">Nombre</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" align="left">Contenido</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="subtitle1" align="left">Marcas</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="subtitle1" align="left">Subcategoria</Typography>
                </Grid>
                <Grid item xs={1}>
                    
                </Grid>
                { getSkus() }
                <Grid item xs={3}>
                    <TextField 
                        id="" 
                        label="Nombre" 
                        variant="outlined" 
                        fullWidth
                        multiline
                        name='name'
                        onChange={handleInputSku}
                        value={sku.name}
                        required
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField 
                        id="" 
                        label="Contenido" 
                        variant="outlined" 
                        fullWidth
                        multiline
                        name='description'
                        //rows={2}
                        onChange={handleInputSku}
                        value={sku.description}
                    />
                </Grid>
                <Grid item xs={3}>
                    <RadioGropupGroupers
                        name = 'grouper'
                        items = {[...groupers]}
                        onChange={handleInputSku}
                    />
                </Grid>
                <Grid item xs={2}>
                    <RadioGroup
                        name = 'subcategory'
                        items = {[...subcategories.map((data, index) => ({...data, id:index}))]}
                        onChange={handleInputSku}
                    />
                </Grid>
                <Grid item xs={2}>
                    <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                        {/*<DeleteIcon/>*/}
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleSaveSku}
                        >
                            Guardar
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Step2;