import React from 'react';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CheckboxGroup from '../CheckboxGroup';

import HorusChart from '../HorusChart';

import Fab from '@mui/material/Fab';  
import OpenWithIcon from '@mui/icons-material/OpenWith';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import Modal from '../Modal';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

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
    position: props=>props.position,
    bottom: props=>props.position==='fixed'?'1em':'auto',
    right: props=>props.position==='fixed'?'1em':'auto',
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

export default function FullScreenDialog({skus, categories, subcategories, position='fixed', children, brands=[]}) {
  const classes = useStyles({position});
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [filter, setFilter] = React.useState(
    {
      skus:skus,
      subcategories:subcategories,
      groupers:null,
      apply: false,
      conf: {
        skus:skus,
        subcategories:subcategories,
        groupers:null,
      }
    }
  );

  React.useEffect(()=>{
    if(subcategories.length>0){
      setFilter({...filter, subcategories, conf:{...filter.conf, subcategories:subcategories}})
    }
  },[subcategories])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getSkus = () => {
    //console.log(filter)
    if(!filter.apply){
      return skus;
    }
    let newSkus = [];
    for(let j=0;j<filter.subcategories.length;j++){
      for(let i=0;i<skus.length;i++){
        //console.log(skus[i])
        if(skus[i].subcategory.id===filter.subcategories[j].id && filter.subcategories[j].checked){
          newSkus.push(skus[i])
        }
      }
    }
    return (newSkus);
  }

  const getSubcategories = () => {
    if(!filter.apply){
      return subcategories;
    }
    return filter.subcategories.filter(item=> item.checked);
  }

  return (
    <div>
        <div className={classes.button}>
          {children?
            <div style={{width:'max-content'}} onClick={handleClickOpen}>
              {children}
            </div>
            :
            <Fab size="small" color="primary" aria-label="clean" onClick={handleClickOpen}>
              <OpenWithIcon />
            </Fab>
          }
        </div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} className={classes.root}>
            <div style={{backgroundColor: '#1F1C36', width: '200%', height: '100vh', position: 'fixed'}}/>
            <div style={{backgroundColor: '#1F1C36', height: '100vh'}}>
              <div className={classes.close} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <HighlightOffIcon />
              </div>
              <div>

                {
                  // <Drawer>
                  //   <div style={{padding: '1em'}}>
                  //     <span>
                  //       <InputBase
                  //         className={classes.input}
                  //         placeholder="Buscar"
                  //         variant="outlined"
                  //       />
                  //       <IconButton type="submit" className={classes.iconButton} aria-label="search">
                  //         <SearchIcon />
                  //       </IconButton>
                  //       <Divider />
                  //     </span>
                  //     {
                  //       datalist.map((data, index)=>
                  //         <span key={index}>
                  //           <Typography variant='subtitle1'>
                  //             {data.title}
                  //           </Typography>
                  //           <List style={{width:'15em'}}>
                  //             {data.items.map((item, i) => (
                  //               <ListItem button key={i}>
                  //                 {
                  //                   //<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  //                 }
                  //                 <ListItemIcon style={{minWidth:'2.5em'}}>
                  //                   <div style={{width:'1.5em', height:'1.5em', borderRadius:'50%', backgroundColor:item.color}}/>
                  //                 </ListItemIcon>
                  //                 <ListItemText primary={item.name} />
                  //               </ListItem>
                  //             ))}
                  //           </List>
                  //           <Divider />
                  //         </span>
                  //       )
                  //     }
                  //   </div>
                  // </Drawer>
                }
                {
                  <Button onClick={()=>{setVisible(true)}}>
                    <FilterAltIcon/>
                  </Button>
                }
                {
                  <Modal
                    visible={visible}
                    onClose={()=>{setVisible(false)}}
                  >
                    <div>

                      <Typography variant='h5'>
                        Filtros
                      </Typography>

                      <Divider style={{marginBottom:'.75em'}}/>
                      <Typography>
                        Subcategorias
                      </Typography>
                      {
                        //console.log(subcategories)
                      }
                      <CheckboxGroup
                        items={filter.conf.subcategories}
                        title='some'
                        name='subcategories'
                        onChange={(e)=>{
                          setFilter({...filter, conf:{...filter.conf, subcategories: e.target.value}})
                        }}
                      />
                      
                      {/*<Divider style={{marginBottom:'.75em'}}/>
                      <Typography>
                        Skus
                      </Typography>
                      <CheckboxGroup
                        items={skus}
                        title='some'
                        name='skus'
                        onChange={(e)=>{
                          setFilter({...filter, skus: e.target.value})
                        }}
                      />*/}

                      <Divider style={{marginBottom:'.75em'}}/>
                      <Stack spacing={2} direction="row">
                        <Button 
                          primary 
                          variant='contained' 
                          onClick={()=>{
                            setFilter({...filter, apply:true, subcategories: filter.conf.subcategories});
                            setVisible(false);
                          }}
                        >
                          Filtrar
                        </Button>
                        <Button 
                          primary 
                          variant='outlined'
                          onClick={()=>{
                            setFilter({...filter, apply:false})
                          }}
                        >
                          Limpiar filtros
                        </Button>
                      </Stack>
                    </div>
                  </Modal>
                }
                <HorusChart
                  categories={[...categories]}
                  subcategories={getSubcategories()}
                  skus={getSkus()}
                  brands={brands}
                />
              </div>
            </div>
        </Dialog>
        {/*<Divider />*/}
    </div>
  );
}
