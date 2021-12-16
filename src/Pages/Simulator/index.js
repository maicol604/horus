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

import Plot from '../../Components/Plot';
import Chart from '../../Components/Chart';

const options = [
  {
    title:'Tablas históricas'
  },
  {
    title:'Tablas comparativas'
  },
  {
    title:'Gráficas de pie y barras'
  },
  {
    title:'Gráficas 2D'
  },
  {
    title:'Gráficas de burbujas'
  },
  {
    title:'Gráficas'//(mensuales, trimestrales, semestrales, RY, YTD)
  },
  {
    title:'Curvas de precios y simulador'
  },
  {
    title:'Simulador con tendencia'
  },
  {
    title:'Simulador con tendencia'
  },
]

export default () => {

  const [auth, setAuth] = React.useState({
    token:null
  });

  const [option, setOption] = React.useState(0);

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
                <InputLabel>Tipo de funcion</InputLabel>
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
                <InputLabel>Tipo de curva</InputLabel>
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
                <InputLabel>Mes</InputLabel>
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
                <InputLabel>Año</InputLabel>
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
              Tabla
            </Grid>
            <Grid item xs={8} style={{textAlign:'center'}}>
              <Paper 
                variant="outlined"
                style={{padding:'1em'}}
              >
                <Plot/>
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

  React.useEffect(()=>{

    var myHeaders = new Headers();
    myHeaders.append("mode", "");
    myHeaders.append("Cookie", "session_id=4a8fdccdbee206b068306a31a5e3ab0c607116aa");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch("https://pricing.demo4to.com/api/auth/token?login=admin&password=admin&db=pricing", requestOptions)
      .then(response => console.log(response))
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  },[]);

  return (
    <div style={{padding:'1em'}}>
      <Grid container alignItems='flex-start' spacing={3}>
        <Grid item xs={3} style={{height:'100vh',  borderRight:'1px solid rgba(0, 0, 0, 0.12)'}}>
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
        <Grid item xs={9}>
          {
            getContent(option)
          }
        </Grid>
      </Grid>
    </div>
  )
}