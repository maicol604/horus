import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { makeStyles } from '@mui/styles';
import ColorPicker from '../../../Components/ColorPicker';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import ConfirmDialog from '../../../Components/ConfirmDialog';

const initialValue = {
    name:'',
    maker:'',
    color:'#ffffff',
    //presentation :''
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
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        padding:'1em',
        p: 4,
    }
}));

const randomColor = () => {
    let color = Math.floor(Math.random()*16777215).toString(16);
    return `#${color}`;
}

const Step2 = ({ groupers=[], pushGrouper, updateGroupers, removeGrouper }) => {
    const classes = useStyles();
    const [grouper, setGrouper] = React.useState({
        ...initialValue,
        color: randomColor(),
    })

    const [editGrouper, setEditGrouper] = React.useState({});
    const [openEditGrouper, setOpenEditGrouper] = React.useState(false);

    const getGroupers = () => {
        return (
            groupers.map((data, index) => 
                <React.Fragment>
                    <Grid item xs={4}>
                        <Typography align="left">
                            {data.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align="left">
                            {data.maker}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.colorContainer}>
                            <div className={classes.colorSquare} style={{backgroundColor:data.color}}/>
                            {/*<Typography variant="subtitle1" align="left">{data.color.split('#')[1]}</Typography>*/}
                        </div>
                    </Grid>
                    {/*<Grid item xs={2}>
                        <Typography align="left">
                            {data.presentation }
                        </Typography>
                    </Grid>*/}
                    <Grid item xs={1}>
                        <div
                            style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}
                        >
                            <ConfirmDialog
                                //message='Esta seguro de eliminar esta categoria?'
                                title='Esta seguro de eliminar esta marca?'
                                onOk={()=>{handleRemoveGrouper(index)}}
                            >
                                <DeleteIcon/>
                            </ConfirmDialog>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <div
                            style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center', cursor: 'pointer'}}
                            onClick={()=>{
                                setOpenEditGrouper(!openEditGrouper);
                                setEditGrouper({...data, index})
                            }}
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
        setGrouper({...initialValue, color: randomColor()})
    }

    const handleRemoveGrouper = (index) => {
        if(removeGrouper)
            removeGrouper(index);
    }

    return (
        <React.Fragment>
            <Grid container alignItems='center' spacing={3}>
                <Grid item xs={12}/>
                <Grid item xs={12}>
                    <Typography
                        variant='h6'
                        align="left"
                    >
                        Añade o elimina tus marcas
                    </Typography>
                    {/* {<Typography
                        variant='caption'
                        align="left"
                        display="block"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>} */}
                </Grid>
                <Grid item xs={12}/>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Typography variant="subtitle1" align="left">Marca</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1" align="left">Fabricante</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" align="left">Color</Typography>
                </Grid>
                {/*<Grid item xs={3}>
                    <Typography variant="subtitle1" align="left">Presentación</Typography>
                </Grid>*/}
                <Grid item xs={1}>
                    
                </Grid>
                { getGroupers() }
                <Grid item xs={4}>
                    <TextField 
                        id="" 
                        label="Marca" 
                        variant="outlined" 
                        fullWidth
                        name='name'
                        onChange={handleInputGrouper}
                        value={grouper.name}
                        required
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        id="" 
                        label="Fabricante" 
                        variant="outlined" 
                        fullWidth
                        multiline
                        name='maker'
                        //rows={2}
                        onChange={handleInputGrouper}
                        value={grouper.maker}
                        required
                    />
                </Grid>
                <Grid item xs={2}>
                    <ColorPicker 
                        onChangeComplete={handleInputGrouper}
                        name='color'
                        value={grouper.color}
                    />
                </Grid>
                {/*<Grid item xs={2}>
                    <TextField 
                        id="" 
                        label="Presentación" 
                        variant="outlined" 
                        fullWidth
                        multiline
                        name='presentation'
                        //rows={2}
                        onChange={handleInputGrouper}
                        value={grouper.presentation}
                        required
                    />
                </Grid>*/}
                <Grid item xs={2}>
                    <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                        {/*<DeleteIcon/>*/}
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleSaveGrouper}
                            disabled={grouper.name==='' || grouper.maker===''}
                        >
                            Guardar
                        </Button>
                    </div>
                </Grid>
            </Grid>

            <Modal
                open={openEditGrouper}
                onClose={()=>{setOpenEditGrouper(!openEditGrouper)}}
            >
                <Paper 
                    className={classes.modal}
                    variant="outlined"
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography
                                variant='h6'
                                align="left"
                            >
                                Editar marca
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={5}>
                            <TextField 
                                id="" 
                                label="Marca" 
                                variant="outlined" 
                                fullWidth
                                name='name'
                                onChange={(e)=>{
                                    setEditGrouper({...editGrouper, name:e.target.value})
                                }}
                                value={editGrouper.name}
                                required
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField 
                                id="" 
                                label="Fabricante" 
                                variant="outlined" 
                                fullWidth
                                multiline
                                name='maker'
                                //rows={2}
                                onChange={(e)=>{
                                    setEditGrouper({...editGrouper, maker:e.target.value})
                                }}
                                value={editGrouper.maker}
                                required
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <ColorPicker 
                                onChangeComplete={(e)=>{
                                    //console.log(e)
                                    setEditGrouper({...editGrouper, color:e.target.value})
                                }}
                                name='color'
                                value={editGrouper.color}
                            />
                        </Grid>
                        {
                            // <Grid item xs={4}>
                            //     <TextField 
                            //         id="" 
                            //         label="Presentación" 
                            //         variant="outlined" 
                            //         fullWidth
                            //         multiline
                            //         name='presentation'
                            //         //rows={2}
                            //         onChange={(e)=>{
                            //             setEditGrouper({...editGrouper, presentation:e.target.value})
                            //         }}
                            //         value={editGrouper.presentation}
                            //         required
                            //     />
                            // </Grid>
                        }

                        <Grid item xs={12}>
                            <Stack spacing={2} direction="row">
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    onClick={()=>{setOpenEditGrouper(!openEditGrouper)}}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={()=>{
                                        let aux = groupers.slice();
                                        aux[editGrouper.index] = editGrouper;
                                        if(updateGroupers){
                                            //console.log(editGrouper)
                                            updateGroupers(aux, editGrouper.index);
                                        }
                                        setOpenEditGrouper(!openEditGrouper)
                                    }}
                                    disabled={editGrouper.name==='' || editGrouper.maker===''}
                                >
                                    Actualizar
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
        </React.Fragment>
    )
}

export default Step2;