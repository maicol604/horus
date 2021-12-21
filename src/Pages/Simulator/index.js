import React from "react";

import styled from "styled-components";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TableChartIcon from '@mui/icons-material/TableChart';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BarChartIcon from '@mui/icons-material/BarChart';

import ReactLoading from "react-loading";

import Plot2 from '../../Components/Plot2';
import Plot from '../../Components/Plot';
import Chart from '../../Components/Chart';
import TableComp from '../../Components/Table';
import SnackBar from '../../Components/SnackBar';
import CustomDatePicker from '../../Components/CustomDatePicker';

import bg1 from '../../Assets/Img/1.svg';
import bg2 from '../../Assets/Img/3.svg';

const options = [
  {
    title:1//'Tablas históricas'
  },
  {
    title:2//'Tablas comparativas'
  },
  {
    title:3//'Gráficas de pie y barras'
  },
  {
    title:4//'Gráficas 2D'
  },
  {
    title:'Gráficas de burbujas'
  },
  {
    title:6//'Gráficas'//(mensuales, trimestrales, semestrales, RY, YTD)
  },
  {
    title:'Simulador'//'Simulador con tendencia'
  },
  {
    title:9//'Simulador con tendencia'
  },
]

const randomColor = () => {
  var trans = '0.5'; // 50% transparency
  var color = 'rgba(';
  for (var i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 255) + ',';
  }
  color += trans + ')'; // add the transparency
  return color;
}

export default () => {

  const [auth, setAuth] = React.useState({
    access_token:null
  });

  const [data, setData] = React.useState({
    skus: [],
    simulation: null,
    price:'',
    curve:'price_profit', 
    points:[],
    sku:null
  });

  const [bubbleData, setBubbleData] = React.useState({
    data: null,
    loading: false,
  });

  const [subcategories, setSubcategories] = React.useState({
    data:[],
    selected:null
  })

  const [loading, setLoading] = React.useState(false);

  const [update, setUpdate] = React.useState(1)

  const [option, setOption] = React.useState(0);


  const getSkus = (token, cb) => {
    
      fetch("https://pricing.demo4to.com/api/pricing.sku?access-token="+token+"&method=name_search", {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        method: "GET"
      })   
      .then(response => response.json())
      .then(result => {
        cb(result);
      })
      .catch(error => console.log('error2', error));
  } 

  const getSubcategories = (token, cb) => {
    
    fetch("https://pricing.demo4to.com/api/pricing.sku.subcategory/name_search?access-token="+token, {
      'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      method: "GET"
    })   
    .then(response => response.json())
    .then(result => {
      //console.log('error sub',result);
      setSubcategories({...subcategories, data: result.data})
    })
    .catch(error => console.log('error sub', error));
}

  const getCurve = (price) => {
    let url = `https://pricing.demo4to.com/api/pricing.sku/${data.sku}?access-token=${auth.access_token}&method=get_table&price=${price}`;
    let requestOptions = {
      method: 'GET',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    setLoading(true);
    setData({...data, simulation:null});
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      let price_profit = [];
      let price_quantity = [];
      let price_value = [];
      let profit_value = [];
      for(let i=0;i<result.data.table.price.length;i++){
       // price_profit.push([result.data.table.profit[i], result.data.table.value[i]]);
        price_profit.push([truncateNumber(result.data.table.price[i]), truncateNumber(result.data.table.profit[i])]);
        price_quantity.push([truncateNumber(result.data.table.price[i]), truncateNumber(result.data.table.quantity[i])]);
        price_value.push([truncateNumber(result.data.table.price[i]), truncateNumber(result.data.table.value[i])]);
        profit_value.push([truncateNumber(result.data.table.profit[i]), truncateNumber(result.data.table.value[i])]);
      }
      setTimeout(() => {
        setLoading(false);
        setData({...data, ...result.data, price: result.data.user_point.price, simulation: {...result.data, price_profit, price_quantity, price_value, profit_value, points:price_quantity}})
      }, 2000);
    })
    .catch(error => {
      console.log('error', error);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }
  
  const getBubles = (t) => {
    let url = `https://pricing.demo4to.com/api/pricing.sku.subcategory/${subcategories.selected}/get_historic_data?access-token=${t}&x_axis=sale_values&y_axis=distribution&z_axis=price_units`;
    //console.log(url, s)
    let requestOptions = {
      method: 'GET',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    
    setBubbleData({...bubbleData, loading: true, data:null});

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('bubples',result)

      setTimeout(() => {
        setBubbleData({...bubbleData, loading: false, data:result.data.filter((element, index) => index < result.data.length - 1)});
      }, 2000);
    })
    .catch(error => {
      console.log('error', error);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }

  React.useEffect(()=>{

    var requestOptions = {
      method: 'GET',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    fetch("https://pricing.demo4to.com/api/auth/token?login=admin&password=admin&db=pricing", requestOptions)
    .then(response => response.json())
    .then(result => {
      setAuth(result);
      
      getSubcategories(result.access_token)

      getSkus(result.access_token, (r)=>{
        setData({...data, skus: r.data})
        //console.log(r.data)
      })
    })
    .catch(error => console.log('error', error));

  },[]);

  React.useEffect(()=>{
    if(data.simulation)
      setUpdate(update+1);
  },[data.simulation]);

  const truncateNumber = (number) => {
    try{
      return (number+'').toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    }
    catch{
      return (number)
    }
  }

  const getPoints = (option) => {
    switch(option){
      case 'price_profit':
        //setData({...data, simulation:{...data.simulation, points:[...data.simulation.price_profit]}})
        return ([...data.simulation.price_profit]);
      case 'price_quantity':
        //setData({...data, simulation:{...data.simulation, points:[...data.simulation.price_quantity]}})
        return ([...data.simulation.price_quantity]);
      case 'price_value':
        //setData({...data, simulation:{...data.simulation, points:[...data.simulation.price_value]}})
        return ([...data.simulation.price_value]);
      case 'profit_value':
        //setData({...data, simulation:{...data.simulation, points:[...data.simulation.profit_value]}})
        return ([...data.simulation.profit_value]);
    }
    return [];
  }

  const getAnnotations = (option) => {
    switch(option){
      case 'price_profit':
        return ([
          {
            x: truncateNumber(data.optimals.price[0]),
            y: truncateNumber(data.optimals.profit[0]),
            text: 'MV = '+truncateNumber(data.optimals.price[0]),
            color: '#e67e22'
          },
          {
            x: truncateNumber(data.optimals.price[1]),
            y: truncateNumber(data.optimals.profit[1]),
            text: 'Optimo = '+truncateNumber(data.optimals.price[1]),
            color: '#2ecc71'
          },
          {
            x: truncateNumber(data.optimals.price[2]),
            y: truncateNumber(data.optimals.profit[2]),
            text: 'MR = '+truncateNumber(data.optimals.price[2]),
            color: '#e74c3c'
          },
          {
            x: truncateNumber(data.user_point.price),
            y: truncateNumber(data.user_point.profit),
            text: 'Punto usuario = '+truncateNumber(data.optimals.price),
            color: '#3498db'
          },
        ]);
      case 'price_quantity':
        return ([
          {
            x: truncateNumber(data.optimals.price[0]),
            y: truncateNumber(data.optimals.quantity[0]),
            text: 'MV = '+truncateNumber(data.optimals.price[0]),
            color: '#e67e22'
          },
          {
            x: truncateNumber(data.optimals.price[1]),
            y: truncateNumber(data.optimals.quantity[1]),
            text: 'Optimo = '+truncateNumber(data.optimals.price[1]),
            color: '#2ecc71'
          },
          {
            x: truncateNumber(data.optimals.price[2]),
            y: truncateNumber(data.optimals.quantity[2]),
            text: 'MR = '+truncateNumber(data.optimals.price[2]),
            color: '#e74c3c'
          },
          {
            x: truncateNumber(data.user_point.price),
            y: truncateNumber(data.user_point.quantity),
            text: 'Punto usuario = '+truncateNumber(data.optimals.price),
            color: '#3498db'
          },
        ]);
      case 'price_value':
        return ([
          {
            x: truncateNumber(data.optimals.price[0]),
            y: truncateNumber(data.optimals.value[0]),
            text: 'MV = '+truncateNumber(data.optimals.price[0]),
            color: '#e67e22'
          },
          {
            x: truncateNumber(data.optimals.price[1]),
            y: truncateNumber(data.optimals.value[1]),
            text: 'Optimo = '+truncateNumber(data.optimals.price[1]),
            color: '#2ecc71'
          },
          {
            x: truncateNumber(data.optimals.price[2]),
            y: truncateNumber(data.optimals.value[2]),
            text: 'MR = '+truncateNumber(data.optimals.price[2]),
            color: '#e74c3c'
          },
          {
            x: truncateNumber(data.user_point.price),
            y: truncateNumber(data.user_point.value),
            text: 'Punto usuario = '+truncateNumber(data.optimals.price),
            color: '#3498db'
          },
        ]);
      case 'profit_value':
        return ([
          {
            x: truncateNumber(data.optimals.profit[0]),
            y: truncateNumber(data.optimals.value[0]),
            text: 'MV = '+truncateNumber(data.optimals.profit[0]),
            color: '#e67e22'
          },
          {
            x: truncateNumber(data.optimals.profit[1]),
            y: truncateNumber(data.optimals.value[1]),
            text: 'Optimo = '+truncateNumber(data.optimals.profit[1]),
            color: '#2ecc71'
          },
          {
            x: truncateNumber(data.optimals.profit[2]),
            y: truncateNumber(data.optimals.value[2]),
            text: 'MR = '+truncateNumber(data.optimals.profit[2]),
            color: '#e74c3c'
          },
          {
            x: truncateNumber(data.user_point.profit),
            y: truncateNumber(data.user_point.value),
            text: 'Punto usuario = '+truncateNumber(data.optimals.profit),
            color: '#3498db'
          },
        ]);
      default:
        return ([])
    }
  }

  const getContent = () => {
    switch(option){
      case 0:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Agrupacion de tiempo</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Agrupacion de tiempo"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar subcategoria</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar subcategoria"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar SKU</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar SKU"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  {
                    data.skus.map((item, index)=>{
                      return (
                        <MenuItem value={'Rolling Year'} key={index}>{item[1]}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar Variables</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar Variables"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Variables calculadas</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Variables calculadas"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Agrupadores</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Variables calculadas"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8} style={{textAlign:'center'}}>
              <Paper 
                variant="outlined"
                style={{padding:'1em'}}
              >
                Tabla
              </Paper>
            </Grid>
          </Grid>
        )
      case 1:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Agrupacion de tiempo</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Agrupacion de tiempo"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar subcategoria</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar subcategoria"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar SKU</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar SKU"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar Variables</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar Variables"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Variables calculadas</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Variables calculadas"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Button color="primary"  variant='contained'>
                Calcular
              </Button>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Agrupadores</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Variables calculadas"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8} style={{textAlign:'center'}}>
              <Paper 
                variant="outlined"
                style={{padding:'1em'}}
              >
                Tabla
              </Paper>
            </Grid>
          </Grid>
        )
      case 2:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Agrupacion de tiempo</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Agrupacion de tiempo"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar subcategoria</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar subcategoria"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar SKU</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar SKU"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Eje X</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar Variables"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={6}>
              <Paper 
                variant="outlined"
                style={{padding:'1em'}}
              >
                <Chart type='pie'/>
              </Paper>
            </Grid>
            <Grid item xs={6} style={{textAlign:'center'}}>
              <Paper 
                variant="outlined"
                style={{padding:'1em'}}
              >
                <Chart type='bar'/>
              </Paper>
            </Grid>
          </Grid>
        )
      case 3:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Agrupacion de tiempo</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Agrupacion de tiempo"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar subcategoria</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar subcategoria"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar SKU</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar SKU"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Eje X</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar Variables"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Eje Y</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Variables calculadas"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={12} style={{textAlign:'center'}}>
              <Paper 
                variant="outlined"
                style={{padding:'1em'}}
              >
              </Paper>
            </Grid>
          </Grid>
        )
      case 4:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={12}>
              <Paper 
                variant="outlined"
                style={{padding:'1em', display:'flex'}}
              >
                <FormControl fullWidth>
                  <InputLabel>Seleccionar subcategoria</InputLabel>
                  <Select
                    //name={'totalSaleUnit'}
                    label="Seleccionar subcategoria"
                    value={subcategories.selected}
                    onChange={(e)=>{
                      setSubcategories({...subcategories, selected:e.target.value})
                    }}
                  >
                    {
                      subcategories.data.map((item, index)=>
                        <MenuItem value={item[0]} key={index}>{item[1]}</MenuItem>
                      )
                    }
                  </Select>
                </FormControl>
                
                <Button onClick={()=>{ getBubles(auth.access_token) }} color='primary' variant='contained' size="large" disabled={!subcategories.selected} style={{height:'3.5em', marginLeft:'1em'}}>
                  Visualizar
                </Button>
              </Paper>
            </Grid>
            {/* {<Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar SKU</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar SKU"
                  value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>} */}
            {bubbleData.data?
            <Grid item xs={12} style={{textAlign:'center'}}>
              <Paper 
                variant="outlined"
                style={{padding:'1em'}}
              >
                <Chart 
                  type='bubble'
                  legend={false}
                  datasets={[...bubbleData.data.map(i=>(
                    {
                      type: 'bubble',
                      data: [{
                        x:truncateNumber(i.x),
                        y:truncateNumber(i.y), 
                        r:truncateNumber(i.z),
                      }],
                      label: i.name,
                      backgroundColor: [
                        randomColor(),
                      ],
                    }
                  ))]}
                />
              </Paper>
            </Grid>
            :
            <>
              {
                bubbleData.loading?
                  <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '20vh'}}>
                    <ReactLoading type={'bars'} color="#fff" />
                  </Grid>
                  :
                  <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '5vh'}}>
                    <div style={{width:'40vw', filter: 'saturate(1)', opacity:'1'}}>
                      <img src={bg1} alt='' style={{width:'100%'}}/>
                    </div>
                  </Grid>
              }
            </>
            }
          </Grid>
        )
      case 5:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Agrupacion de tiempo</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Agrupacion de tiempo"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar subcategoria</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar subcategoria"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar SKU</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar SKU"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar Variables</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar Variables"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Variables calculadas</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Variables calculadas"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{textAlign:'center'}}>
              <Paper 
                variant="outlined"
                style={{padding:'1em'}}
              >
                <Chart type='bar'/>
              </Paper>
            </Grid>
          </Grid>
        )
      case 6:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <SnackBar/>
            <Grid item xs={12}>
              <Paper 
                variant="outlined"
                style={{padding:'1em'}}
              >
                <Grid container alignItems='flex-start' spacing={3}>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Selecciona SKU</InputLabel>
                    <Select
                      //name={'totalSaleUnit'}
                      label="Agrupacion de tiempo"
                      /*value={subcategory.totalSaleUnit}*/
                      onChange={(e)=>{
                        setData({...data, sku:e.target.value});
                      }}
                    >
                      {
                        //console.log('data.skus',data.skus)
                      }
                      {
                        data.skus.map((item, index)=>{
                          return (
                            <MenuItem value={item[0]} key={index}>{item[1]}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de funcion</InputLabel>
                    <Select
                      //name={'totalSaleUnit'}
                      label="Tipo de funcion"
                      /*value={subcategory.totalSaleUnit}
                      onChange={handleInputChangeSubcategories}*/
                    >
                      <MenuItem value={'Rolling Year'}>Lineal</MenuItem>
                      <MenuItem value={'Full Year'}>Polinomial</MenuItem>
                      <MenuItem value={'Mensual'}>Logarítmica</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de curva</InputLabel>
                    <Select
                      //name={'totalSaleUnit'}
                      label="Tipo de curva"
                      value={data.curve}
                      onChange={(e)=>{
                        setUpdate(update+1);
                        setData({...data, curve:e.target.value});
                      }}
                      defaultValue="price_profit"
                    >
                      <MenuItem value={'price_profit'}>Precio vs rentabilidad</MenuItem>
                      <MenuItem value={'price_quantity'}>Precio vs cantidad</MenuItem>
                      <MenuItem value={'price_value'}>Precio vs valor</MenuItem>
                      <MenuItem value={'profit_value'}>Rentabilidad vs valor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* {<Grid item xs={4}>
                  <CustomDatePicker
                    periodicity={'monthly'}
                    label='Mes a estudiar'
                  />
                </Grid>} */}
                
                <Grid item xs={4} style={{display: 'flex'}}>
                    <Button onClick={()=>{getCurve('')}} color='primary' variant='contained' size="large" disabled={!data.sku} style={{height:'3.5em'}}>
                      Simular
                    </Button>
                </Grid>
                </Grid>
              </Paper>
              </Grid>

              {
              data.simulation?
              <>
              <Grid item xs={6}>
                {
                // <div style={{marginBottom:'1em'}}>
                //   <Table
                //     heads={['Precio competidor', 'Distribucion', 'Inflacion', 'Pandemia']}
                //   />
                // </div>
                }
                <div style={{marginBottom:'1em'}}>
                  <TableComp
                    heads={['','Precio', 'Cantidad', 'Venta', 'Rentabilidad']}
                    data={[0,1,2].map((i)=>[[{text:'MV', color:'#e67e22'},{text:'Optimo', color:'#2ecc71'},{text:'MR', color:'#e74c3c'}][i],{text:truncateNumber(data.simulation.optimals.price[i])}, {text:truncateNumber(data.simulation.optimals.quantity[i])}, {text:truncateNumber(data.simulation.optimals.value[i])}, {text:truncateNumber(data.simulation.optimals.profit[i])}])}
                  />
                </div>
                <div>
                  <Paper 
                    variant="outlined"
                    style={{padding:'1em'}}
                  >
                    <TableContainer>
                      <Table sx={{ minWidth: '100%' }} aria-label="simple table" size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Precio</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Venta</TableCell>
                            <TableCell>Rentabilidad</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                          >
                            <TableCell>
                              <input type="text" value={truncateNumber(data.price)} onChange={(e)=>{setData({...data, price:e.target.value})}}/>
                            </TableCell>
                            <TableCell><span style={{color:'#89835f'}}>{truncateNumber(data.simulation.user_point.quantity)}</span></TableCell>
                            <TableCell><span style={{color:'#89835f'}}>{truncateNumber(data.simulation.user_point.value)}</span></TableCell>
                            <TableCell><span style={{color:'#89835f'}}>{truncateNumber(data.simulation.user_point.profit)}</span></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Stack style={{paddingTop:'2em'}}>
                      <Button onClick={()=>{getCurve(data.price)}} color='primary' variant='contained' size="large" disabled={!data.sku} style={{height:'3.5em'}}>
                        Simular con este precio
                      </Button>
                    </Stack>
                  </Paper>
                </div>
              </Grid>
            {
            // <Grid item xs={6} style={{textAlign:'center'}}>
            //   <Paper 
            //     variant="outlined"
            //     style={{padding:'1em'}}
            //   >
            //     <div key={update}>
            //       <Plot
            //         points={getPoints(data.curve)}
            //         xAxis={{domain: [...findDomain(getPoints(data.curve).map(i=>i[0]))]}}
            //         yAxis={{domain: [...findDomain(getPoints(data.curve).map(i=>i[1]))]}}
            //         optimals={data.optimals}
            //         annotations={getAnnotations(data.curve)}
            //       />
            //     </div>
            //   </Paper>
            // </Grid>
            }
            <Grid item xs={6} style={{textAlign:'center'}}>
              <Paper 
                variant="outlined"
                style={{padding:'1em', overflow:'hidden'}}
              >
                <div key={update}>
                  <Plot2
                    points={getPoints(data.curve)}
                    optimals={null}
                    annotations={getAnnotations(data.curve)}
                    name={data.curve}
                    title={''}
                    xaxisTitle={data.curve.split('_')[0]==='price'?'Precio':'Rentabilidad'}
                    yaxisTitle={data.curve.split('_')[1]==='profit'?'Rentabilidad':(data.curve.split('_')[1]==='quantity'?'Cantidad':(data.curve.split('_')[1]==='value'?'Valor':''))}
                  />
                </div>
              </Paper>
            </Grid>
            </>
            :
            <>
              {
              loading?
                <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '20vh'}}>
                  <ReactLoading type={'bars'} color="#fff" />
                </Grid>
              :
                <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '5vh'}}>
                  <div style={{width:'30vw', filter: 'saturate(1)', opacity:'1'}}>
                    <img src={bg2} alt='' style={{width:'100%'}}/>
                  </div>
                </Grid>
              }
            </>
            }
          </Grid>
        )
      case 7:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar subcategoria</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar subcategoria"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar SKU</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar SKU"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo de pronostico</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Seleccionar Variables"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Tiempo de pronostico</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Variables calculadas"
                  /*value={subcategory.totalSaleUnit}
                  onChange={handleInputChangeSubcategories}*/
                >
                  <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                  <MenuItem value={'Full Year'}>Full Year</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Semestral'}>Semestral</MenuItem>
                  <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{textAlign:'center'}}>
              <Paper 
                variant="outlined"
                style={{padding:'1em'}}
              >
                Tabla
              </Paper>
            </Grid>
          </Grid>
        )
    }
  }
  
  const handleOption = (op) => {
    setOption(op);
  }

  return (
    <div style={{backgroundColor:'#e9ecf1'}}>
      <Grid container alignItems='flex-start' spacing={3}>
        <Grid item xs={2} style={{height:'100vh',  borderRight:'1px solid rgba(0, 0, 0, 0.12)', backgroundColor:'#fff'}}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div style={{display:'flex', alignItems:'center'}}>
                <BarChartIcon/><span style={{marginLeft:'1em'}}>Graficas</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <MenuList style={{width:'100%'}}>
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(1)}>
                  Pie y barras
                </MenuItem>
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(1)}>
                  Graficas 2 ejes
                </MenuItem>
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(4)}>
                  Graficas 3   ejes
                </MenuItem>
              </MenuList>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div style={{display:'flex', alignItems:'center'}}>
                <TableChartIcon/><span style={{marginLeft:'1em'}}>Tablas</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <MenuList style={{width:'100%'}}>
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(1)}>
                  Comparatibas
                </MenuItem>
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(1)}>
                  Historicas
                </MenuItem>
              </MenuList>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div style={{display:'flex', alignItems:'center'}}>
                <PsychologyIcon/><span style={{marginLeft:'1em'}}>Simulador</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <MenuList style={{width:'100%'}}>
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(6)}>
                  Puntual
                </MenuItem>
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(1)}>
                  Tendencia
                </MenuItem>
              </MenuList>
            </AccordionDetails>
          </Accordion>

          {/* {<MenuList style={{width:'100%'}}>
            {
              options.map((data, index)=>
                <MenuItem style={{width:'100%'}} key={index} onClick={()=>handleOption(index)}>
                  {data.title}
                </MenuItem>
              )
            }
          </MenuList>} */}

        </Grid>
        <Grid item xs={10} style={{paddingTop: '3em', paddingRight:'1.5em'}}>
          {
            getContent(option)
          }
        </Grid>
      </Grid>
    </div>
  )
}

/*
  MV maxima venta
  Optimo
  MR maxima rentabilidad
*/

/*
  tablas comparatibas
  t historicas
  pie y barras
  graficas 2 ejes
  graficas 3 ejes
  grafica historica
  simulador puntual 
  simulador tendencia
*/