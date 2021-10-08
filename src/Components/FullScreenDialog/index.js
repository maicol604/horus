import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import HorusChart from '../HorusChart';
import Drawer from '../Drawer';

import Fab from '@mui/material/Fab';  
import OpenWithIcon from '@mui/icons-material/OpenWith';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import sampleData from '../../SampleData/chart.json';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  appBar: {
    position: 'relative',
  },
  title: {
    //marginLeft: theme.spacing(2),
    flex: 1,
  },
  input: {
    //marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  button: {
    position: 'fixed',
    bottom: '1em',
    right: '1em',
  },
  close: {
    position: 'absolute',
    right: '0em',
    top: '1em',
    cursor: 'pointer'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const datalist = [
  {
    title:'Marcas',
    items: [
      {color:'#eeefaf', name:'primer agrupador'},{color:'#e74c3c', name:'2 agrupador'},{color:'#af3eee', name:'3'},{color:'#3fddaa', name:'agrupador con texto largo'},{color:'#afffaa', name:'5'}
    ]
  }
]

export default function FullScreenDialog({skus, categories, subcategories, groupers}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //console.log(sampleData)

  return (
    <div>
        <div className={classes.button}>
          <Fab size="small" color="primary" aria-label="clean" onClick={handleClickOpen}>
            <OpenWithIcon />
          </Fab>
        </div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} className={classes.root}>
            <div style={{backgroundColor: '#1F1C36', width: '200%', height: '100vh', position: 'fixed'}}/>
            <div style={{backgroundColor: '#1F1C36', height: '100vh'}}>
              <div className={classes.close} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <HighlightOffIcon />
              </div>
              <div>
                {/*<Drawer>
                  <div style={{padding: '1em'}}>
                    <span>
                      <InputBase
                        className={classes.input}
                        placeholder="Buscar"
                        variant="outlined"
                      />
                      <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                      </IconButton>
                      <Divider />
                    </span>
                    {
                      datalist.map((data, index)=>
                        <span key={index}>
                          <Typography variant='subtitle1'>
                            {data.title}
                          </Typography>
                          <List style={{width:'15em'}}>
                            {data.items.map((item, i) => (
                              <ListItem button key={i}>
                                {
                                  //<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                }
                                <ListItemIcon style={{minWidth:'2.5em'}}><div style={{width:'1.5em', height:'1.5em', borderRadius:'50%', backgroundColor:item.color}}/></ListItemIcon>
                                <ListItemText primary={item.name} />
                              </ListItem>
                            ))}
                          </List>
                          <Divider />
                        </span>
                      )
                    }
                  </div>
                </Drawer>*/}
                {
                  //console.log(groupers,'groupers')
                }
                <HorusChart
                  categories={[...categories]}
                  subcategories={[...subcategories]}
                  skus={[...skus]}
                />
              </div>
            </div>
        </Dialog>
        {/*<Divider />*/}
    </div>
  );
}
