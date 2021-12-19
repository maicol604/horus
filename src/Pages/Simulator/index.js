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

import ReactLoading from "react-loading";

import Plot from '../../Components/Plot';
import Chart from '../../Components/Chart';
import Table from '../../Components/Table';
import CustomDatePicker from '../../Components/CustomDatePicker';

import img from '../../Assets/Img/chart-illustration.jpg';

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
    title:5//'Gráficas de burbujas'
  },
  {
    title:6//'Gráficas'//(mensuales, trimestrales, semestrales, RY, YTD)
  },
  {
    title:7//'Curvas de precios y simulador'
  },
  {
    title:'Simulador'//'Simulador con tendencia'
  },
  {
    title:9//'Simulador con tendencia'
  },
]

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

  const findDomain = (nums) => {
    return [Math.min(...nums),Math.max(...nums)];
  }

  const getCurve = () => {
    let url = `https://pricing.demo4to.com/api/pricing.sku/${data.sku}?access-token=${auth.access_token}&method=get_table&price=${data.price}`;
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
        price_profit.push([result.data.table.price[i], result.data.table.profit[i]]);
       // price_profit.push([result.data.table.profit[i], result.data.table.value[i]]);
        price_quantity.push([result.data.table.price[i], result.data.table.quantity[i]]);
        price_value.push([result.data.table.price[i], result.data.table.value[i]]);
        profit_value.push([result.data.table.profit[i], result.data.table.value[i]]);
      }
      setTimeout(() => {
        setLoading(false);
        setData({...data, ...result.data, simulation: {...result.data, price_profit, price_quantity, price_value, profit_value, points:price_quantity}})
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
      getSkus(result.access_token, (r)=>{
        setData({...data, skus: r.data})
      })
    })
    .catch(error => console.log('error', error));

  },[]);

  React.useEffect(()=>{
    if(data.simulation)
      setUpdate(update+1);
  },[data.simulation]);

  const truncateNumber = (number) => {
    return (number+'').toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
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
                <Plot/>
              </Paper>
            </Grid>
          </Grid>
        )
      case 4:
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
                <Chart type='bubble'/>
              </Paper>
            </Grid>
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
                style={{padding:'1em', display:'flex', height:'40vh'}}
              >
                <Chart type='bar'/>
              </Paper>
            </Grid>
            <Grid item xs={12} style={{textAlign:'center'}}>
              <Paper 
                variant="outlined"
                style={{padding:'1em', display:'flex', height:'40vh'}}
              >
                <Chart type='bar'/>
              </Paper>
            </Grid>
          </Grid>
        )
      case 7:
        return (
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
                  <MenuItem value={'price_profit'}>Precio rentabilidad</MenuItem>
                  <MenuItem value={'price_quantity'}>Precio cantidad</MenuItem>
                  <MenuItem value={'price_value'}>Precio valor</MenuItem>
                  <MenuItem value={'profit_value'}>Rentabilidad valor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <CustomDatePicker
                periodicity={'monthly'}
                label='Mes a estudiar'
              />
            </Grid>
            
            <Grid item xs={4} style={{display: 'flex'}}>
                <Button onClick={()=>{getCurve()}} color='primary' variant='contained' size="large" disabled={!data.sku}>
                  Simular
                </Button>
            </Grid>
            {
            data.simulation?
            <>
            <Grid item xs={6}>
              <div style={{marginBottom:'1em'}}>
                <Table
                  heads={['Precio competidor', 'Distribucion', 'Inflacion', 'Pandemia']}
                />
              </div>
              <div style={{marginBottom:'1em'}}>
                <Table
                  heads={['Precio', 'Cantidad', 'Venta', 'Rentabilidad']}
                  data={[0,1,2].map((i)=>[truncateNumber(data.simulation.optimals.price[i]), truncateNumber(data.simulation.optimals.quantity[i]), truncateNumber(data.simulation.optimals.value[i]), truncateNumber(data.simulation.optimals.profit[i])])}
                />
              </div>
              <div>
                <TextField 
                    id="" 
                    label="Precio" 
                    variant="outlined" 
                    fullWidth
                    name='price'
                    onChange={(e)=>{
                      setData({...data, price:e.target.value})
                    }}
                    // value={category.name}
                    // required
                />
                <p>price: {data.simulation.user_point.price}</p>
                <p>profit: {data.simulation.user_point.profit}</p>
                <p>quantity: {data.simulation.user_point.quantity}</p>
                <p>value: {data.simulation.user_point.value}</p>
              </div>
            </Grid>
            <Grid item xs={6} style={{textAlign:'center'}}>
              <Paper 
                variant="outlined"
                style={{padding:'1em'}}
              >
                <div key={update}>
                  <Plot
                    points={getPoints(data.curve)}
                    xAxis={{domain: [...findDomain(getPoints(data.curve).map(i=>i[0]))]}}
                    yAxis={{domain: [...findDomain(getPoints(data.curve).map(i=>i[1]))]}}
                    optimals={data.optimals}
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
              <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '20vh'}}>
                <div style={{width:'30vw'}}>
                  <img src={img} alt='' style={{width:'100%'}}/>
                </div>
              </Grid>
              }
            </>
            }
          </Grid>
        )
      case 8:
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
    <div style={{padding:'1em', paddingTop:'2em'}}>
      <Grid container alignItems='flex-start' spacing={3}>
        <Grid item xs={2} style={{height:'100vh',  borderRight:'1px solid rgba(0, 0, 0, 0.12)'}}>
          <MenuList style={{width:'100%'}}>
            {
              options.map((data, index)=>
                <MenuItem style={{width:'100%'}} key={index} onClick={()=>handleOption(index)}>
                  {data.title}
                </MenuItem>
              )
            }
          </MenuList>
        </Grid>
        <Grid item xs={10}>
          {
            getContent(option)
          }
        </Grid>
      </Grid>
    </div>
  )
}