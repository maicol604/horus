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

import Plot from '../../Components/Plot';
import Chart from '../../Components/Chart';
import Table from '../../Components/Table';

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
    points:[]
  })

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

  const getCurve = () => {
    let url = `https://pricing.demo4to.com/api/pricing.sku/29?access-token=${auth.access_token}&method=get_table&price=${data.price}`;
    let requestOptions = {
      method: 'GET',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      let price_profit = [];
      let price_quantity = [];
      let price_value = [];
      for(let i=0;i<result.data.table.price.length;i++){
        price_profit.push([result.data.table.price[i], result.data.table.profit[i]]);
       // price_profit.push([result.data.table.profit[i], result.data.table.value[i]]);
        price_quantity.push([result.data.table.price[i], result.data.table.quantity[i]]);
        price_value.push([result.data.table.price[i], result.data.table.value[i]]);

      }
      setData({...data, ...result.data, simulation: {...result.data, price_profit, price_quantity, price_value, points:price_quantity, xAxis: result.data.limits.price, yAxis: result.data.limits.quantity}})
    })
    .catch(error => console.log('error', error));
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
                  /*value={subcategory.totalSaleUnit}*/
                  onChange={(e)=>{
                    //console.log(e.target.value)
                    if(e.target.value==='price_profit'){
                      setData({...data, simulation: {...data.simulation, points:data.simulation.price_profit, xAxis: data.limits.price, yAxis: data.limits.profit}});
                    }
                    if(e.target.value==='price_quantity'){
                      setData({...data,  simulation: {...data.simulation, points:data.simulation.price_quantity, xAxis: data.limits.price, yAxis: data.limits.quantity}});
                    }
                    if(e.target.value==='price_value'){
                      setData({...data,  simulation: {...data.simulation, points:data.simulation.price_value, xAxis: data.limits.price, yAxis: data.limits.value}});
                    }
                  }}
                >
                  <MenuItem value={'price_profit'}>Precio rentabilidad</MenuItem>
                  <MenuItem value={'price_quantity'}>Precio cantidad</MenuItem>
                  <MenuItem value={'price_value'}>Precio valor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Mes</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Mes"
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
                <InputLabel>Año</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Año"
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
                <Button onClick={()=>{getCurve()}} color='primary' variant='contained'>
                  Simular
                </Button>
            </Grid>
            <Grid item xs={6}>
              <Table
                heads={['Precio competidor', 'Distribucion', 'Inflacion', 'Pandemia']}
              />
              {
                data.simulation?//data.simulation.optimals.price, data.simulation.optimals.quantity, data.simulation.optimals.value, data.simulation.optimals.profit
                  <Table
                    heads={['Precio', 'Cantidad', 'Venta', 'Rentabilidad']}
                    data={[0,1,2].map((i)=>[data.simulation.optimals.price[i], data.simulation.optimals.quantity[i], data.simulation.optimals.value[i], data.simulation.optimals.profit[i]])}
                  />
                :
                  <></>
              }
              {data.simulation?
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
              :
              <></>
              }
            </Grid>
            <Grid item xs={6} style={{textAlign:'center'}}>
              <Paper 
                variant="outlined"
                style={{padding:'1em'}}
              >
                {
                  data.simulation?
                    <div key={update}>
                      <Plot
                        points={data.simulation.points}
                        xAxis={{domain: [...data.simulation.xAxis]}}
                        yAxis={{domain: [...data.simulation.yAxis]}}
                      />
                    </div>
                  :
                    <>cargando</>
                }
              </Paper>
            </Grid>
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
    <div style={{padding:'1em'}}>
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