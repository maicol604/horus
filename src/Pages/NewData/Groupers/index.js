import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ColorPicker from '../../../Components/ColorPicker';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';

import ConfirmDialog from '../../../Components/ConfirmDialog';

const initialValue = {
    name:'',
    description:'',
    color:'#ffffff',
    type:''
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        //margin: theme.spacing(1),
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

const Step2 = ({ groupers=[], pushGrouper }) => {
    const classes = useStyles();
    const [grouper, setGrouper] = React.useState({
        ...initialValue
    })

    const getGroupers = () => {
        return (
            groupers.map((data, index) => 
                <React.Fragment>
                    <Grid item xs={3}>
                        <Typography>
                            {data.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>
                            {data.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.colorContainer}>
                            <div className={classes.colorSquare} style={{backgroundColor:data.color}}/>
                            <Typography variant="subtitle1">{data.color.split('#')[1]}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>
                            {data.type}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <div
                            style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}
                        >
                            <ConfirmDialog
                                message='Esta seguro de eliminar esta categoria?'
                                title='Esta seguro de eliminar esta categoria?'
                                onOk={()=>{handleRemoveGrouper(index)}}
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

    const handleInputGrouper = (e) => {
        const {name, value} = e.target;
        setGrouper({...grouper, [name]:value});
    }

    const handleSaveGrouper = () => {
        if(pushGrouper){
            pushGrouper(grouper);
        }   
        setGrouper(initialValue)
    }

    const handleRemoveGrouper = (index) => {

    }

    return (
        <React.Fragment>
            <Grid container alignItems='center' spacing={3}>
                <Grid item xs={12}>
                    <Typography
                        variant='h6'
                    >
                        Añade o elimina tus agrupadores
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
                    <Typography variant="subtitle1">Nombre</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="subtitle1">Descripcion</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">Color</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="subtitle1">Tipo</Typography>
                </Grid>
                <Grid item xs={1}>
                    
                </Grid>
                { getGroupers() }
                <Grid item xs={3}>
                    <TextField 
                        id="" 
                        label="Nombre" 
                        variant="outlined" 
                        fullWidth
                        name='name'
                        onChange={handleInputGrouper}
                        value={grouper.name}
                        required
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField 
                        id="" 
                        label="Descripcion" 
                        variant="outlined" 
                        fullWidth
                        multiline
                        name='description'
                        //rows={2}
                        onChange={handleInputGrouper}
                        value={grouper.description}
                    />
                </Grid>
                <Grid item xs={2}>
                    <ColorPicker 
                        onChangeComplete={handleInputGrouper}
                        name='color'
                        value={grouper.value}
                    />
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Tipo</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={grouper.type}
                            onChange={handleInputGrouper}
                            label="Tipo"
                            name={'type'}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                        {/*<DeleteIcon/>*/}
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleSaveGrouper}
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