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

import Typography from '@mui/material/Typography';

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
import ApexChart from '../../Components/ApexChart';
import Chart from '../../Components/Chart';
import TableComp from '../../Components/Table';
import SnackBar from '../../Components/SnackBar';
import CustomDatePicker from '../../Components/CustomDatePicker';
import Loader from '../../Components/Loader';

import OptimalPrices from '../OptimalPrices';

import bg1 from '../../Assets/Img/1.svg';
import bg2 from '../../Assets/Img/P3.png';
import bg3 from '../../Assets/Img/P2.png';

import pie1 from '../../Assets/Img/13.png';
import pie2 from '../../Assets/Img/11.png';
import pie3 from '../../Assets/Img/5.png';
import pie4 from '../../Assets/Img/8.png';

import bar1 from '../../Assets/Img/3.png';
import bar2 from '../../Assets/Img/7.png';
import bar3 from '../../Assets/Img/4.png';
import bar4 from '../../Assets/Img/9.png';

import trend1 from '../../Assets/Img/16.png';
import trend2 from '../../Assets/Img/1.png';
import trend3 from '../../Assets/Img/6.png';
import trend4 from '../../Assets/Img/12.png';

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
    title:'Labotatorio'//'Simulador con tendencia'
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
    subcategories:[],
    simulation: null,
    price:'',
    curve:'price_profit', 
    fun:'lineal',
    points:[],
    sku:null,
    month:null,
  });

  const [bubbleData, setBubbleData] = React.useState({
    data: null,
    loading: false,
  });

  const [chartData, setChartData] = React.useState({
    data: null,
    loading: false,
    subcategory:null,
    time:null,
    xAxis:null
  });

  const [chartData2, setChart2Data] = React.useState({
    data: null,
    loading: false,
    subcategory:null,
    time:null,
    xAxis:null
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

  const getSkusBySubcategory = (subcategory, token, cb) => {
    
    fetch("https://pricing.demo4to.com/api/pricing.sku.subcategory/"+subcategory+"/sku_ids?access-token="+token+"&method=name_search", {
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
      //console.log('sub',result);
      setSubcategories({...subcategories, data: result.data})
    })
    .catch(error => console.log('error sub', error));
  }

  const generateCurve = (data, option) => {
    
    let price_profit = [];
    let price_quantity = [];
    let price_value = [];
    let profit_value = [];
    let user_point;
    let optimals;

    switch(option){
      case 'lineal':
        for(let i=0;i<data.lineal.table.price.length;i++){
          //  price_profit.push([truncateNumber(data.lineal.table.price[i]), truncateNumber(data.lineal.table.profit[i])]);
          //  price_quantity.push([truncateNumber(data.lineal.table.price[i]), truncateNumber(data.lineal.table.quantity[i])]);
          //  price_value.push([truncateNumber(data.lineal.table.price[i]), truncateNumber(data.lineal.table.value[i])]);
          //  profit_value.push([truncateNumber(data.lineal.table.profit[i]), truncateNumber(data.lineal.table.value[i])]);
          
           price_profit.push([data.lineal.table.price[i], data.lineal.table.profit[i]]);
           price_quantity.push([data.lineal.table.price[i], data.lineal.table.quantity[i]]);
           price_value.push([data.lineal.table.price[i], data.lineal.table.value[i]]);
           profit_value.push([data.lineal.table.profit[i], data.lineal.table.value[i]]);
        }
        user_point = data.lineal.user_point;
        optimals = data.lineal.optimals;
      break;
      case 'polynomial':
        for(let i=0;i<data.polynomial.table.price.length;i++){
          //  price_profit.push([truncateNumber(data.polynomial.table.price[i]), truncateNumber(data.polynomial.table.profit[i])]);
          //  price_quantity.push([truncateNumber(data.polynomial.table.price[i]), truncateNumber(data.polynomial.table.quantity[i])]);
          //  price_value.push([truncateNumber(data.polynomial.table.price[i]), truncateNumber(data.polynomial.table.value[i])]);
          //  profit_value.push([truncateNumber(data.polynomial.table.profit[i]), truncateNumber(data.polynomial.table.value[i])]);
           
           price_profit.push([data.polynomial.table.price[i], data.polynomial.table.profit[i]]);
           price_quantity.push([data.polynomial.table.price[i], data.polynomial.table.quantity[i]]);
           price_value.push([data.polynomial.table.price[i], data.polynomial.table.value[i]]);
           profit_value.push([data.polynomial.table.profit[i], data.polynomial.table.value[i]]);
        }
        user_point = data.polynomial.user_point;
        optimals = data.polynomial.optimals;
      break;
      case 'logarithmic':
        for(let i=0;i<data.logarithmic.table.price.length;i++){
          //  price_profit.push([truncateNumber(data.logarithmic.table.price[i]), truncateNumber(data.logarithmic.table.profit[i])]);
          //  price_quantity.push([truncateNumber(data.logarithmic.table.price[i]), truncateNumber(data.logarithmic.table.quantity[i])]);
          //  price_value.push([truncateNumber(data.logarithmic.table.price[i]), truncateNumber(data.logarithmic.table.value[i])]);
          //  profit_value.push([truncateNumber(data.logarithmic.table.profit[i]), truncateNumber(data.logarithmic.table.value[i])]);
           
           price_profit.push([data.logarithmic.table.price[i], data.logarithmic.table.profit[i]]);
           price_quantity.push([data.logarithmic.table.price[i], data.logarithmic.table.quantity[i]]);
           price_value.push([data.logarithmic.table.price[i], data.logarithmic.table.value[i]]);
           profit_value.push([data.logarithmic.table.profit[i], data.logarithmic.table.value[i]]);
        }
        user_point = data.logarithmic.user_point;
        optimals = data.logarithmic.optimals;
      break;
      default: 
        return {};
    }
    return ({
      price_profit,
      price_quantity,
      price_value,
      profit_value,
      user_point,
      optimals,
    })
  }

  const formatNumber = (number) => {
    let str = number.toString().split('.');
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return str.join(".");
  }

  const getCurve = (price, values, month) => {
    let val;
    console.log(month)
    try {
      //console.log('{'+values.map(i=>(`${[i.key]}:${i.value}`)).join(',')+'}')
      val = ''+values.map(i=>(`${[i.key]}=${i.value}`)).join('&')+'';
      console.log(val)
    } catch (error) {
      val = '';
    }
    //let url = `https://pricing.demo4to.com/api/pricing.sku/${data.sku}?access-token=${auth.access_token}&method=get_table&price=${price}&values=${''}`;
    let url = `https://pricing.demo4to.com/api/pricing.sku/${data.sku}?access-token=${auth.access_token}&method=get_table${price!==''?'&price='+price:''}${val!==''?'&'+val:''}${month?('&month='+month):''}`;
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
      //console.log(result)

      let curve = generateCurve(result.data, data.fun);
      //console.log(curve)

      setTimeout(() => {
        setLoading(false);
        setData({...data, ...result.data, price: curve.user_point.price, optimals:curve.optimals, user_point: curve.user_point, simulation: {...result.data, user_point: curve.user_point, optimals:curve.optimals ,price_profit:curve.price_profit, price_quantity:curve.price_quantity, price_value:curve.price_value, profit_value:curve.profit_value, points:curve.price_quantity}})
      }, 2000);
    })
    .catch(error => {
      console.log('error', error);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }
  
  function sort_by_key(array, key){
    return array.sort(function(a, b){
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  const getBubles = (t) => {
    let bubblesPadding = 2.5;
    let url = `https://pricing.demo4to.com/api/pricing.sku.subcategory/${subcategories.selected}/get_historic_table?access-token=${t}&x_axis=elasticity&y_axis=distribution&z_axis=price_units&som=som`;
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
      //console.log('bubples',result)
      //console.log([{color:'', id:'test', name:'', x:-5, y:0, z:0},...result.data.filter((element, index) => index < result.data.length - 1)])
      let bubbles = result.data.map(i=>({...i, x:i.x_axis, y:i.y_axis, z:i.z_axis, name:i.name+' (SOM:'+truncateNumber(i.som)+')'}));
      bubbles.pop();
      //console.log(bubbles)
      bubbles = sort_by_key(bubbles, 'z').reverse();
      //console.log(bubbles)
      let xmax, xmin, ymax, ymin, zmax;

      zmax=Math.max(...bubbles.map(i=>i.z));

      xmax=Math.max(...bubbles.map(i=>i.x));
      xmin=Math.min(...bubbles.map(i=>i.x));
      ymax=Math.max(...bubbles.map(i=>i.y));
      ymin=Math.min(...bubbles.map(i=>i.y));

      let bubbleData = [{name:'', color:'', id:'sample1', x:xmax+bubblesPadding, y:ymax+bubblesPadding, z:0},{name:'', color:'', id:'sample2', x:xmin-bubblesPadding, y:ymin-bubblesPadding, z:0},...bubbles];

      if(result.type!=='Exception')
        setTimeout(() => {
          setBubbleData({...bubbleData, loading: false, data:bubbleData});
        }, 2000);
    })
    .catch(error => {
      console.log('error', error);
      setTimeout(() => {
        setLoading(false);  
      }, 2000);
    });
  }

  const getChart = (t, subcategory, time, xAxis ) => {
    let url = `https://pricing.demo4to.com/api/pricing.sku.subcategory/${subcategory}/get_historic_table?access-token=${t}&x_axis=${xAxis}&granularity=${time}`;
    //console.log(url, s)
    let requestOptions = {
      method: 'GET',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    
    setChartData({...chartData, loading: true, data:null});

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      //console.log('bubples',result)
      //console.log([{color:'', id:'test', name:'', x:-5, y:0, z:0},...result.data.filter((element, index) => index < result.data.length - 1)])
      let chart = result.data.map(i=>({...i, x:i.x_axis}));
      chart.pop();
      //console.log(bubbles)
      //console.log(chart)
      
      if(result.type!=='Exception')
        setTimeout(() => {
          setChartData({...chartData, loading: false, data:chart});
        }, 2000);
    })
    .catch(error => {
      console.log('error', error);
      setTimeout(() => {
        setChartData({...chartData, loading: false});
      }, 2000);
    });
  }

  const getChart2 = (t, subcategory, time, xAxis ) => {
    let url = `https://pricing.demo4to.com/api/pricing.sku.subcategory/${subcategory}/get_historic_complete?access-token=${t}&granularity=${time}`;
    //console.log(url, s)
    let requestOptions = {
      method: 'GET',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    
    setChart2Data({...chartData2, loading: true, data:null});

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('chart 2',result)
      //console.log([{color:'', id:'test', name:'', x:-5, y:0, z:0},...result.data.filter((element, index) => index < result.data.length - 1)])
      let chart = result.data.map(i=>({...i, x:i.x_axis}));
      chart.pop();
      //console.log(bubbles)
      //console.log(chart)
      
      if(result.type!=='Exception')
        setTimeout(() => {
          //setChart2Data({...chartData2, loading: false, data:chart});
        }, 2000);
    })
    .catch(error => {
      console.log('error', error);
      setTimeout(() => {
        setChart2Data({...chartData2, loading: false});
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
      
      getSubcategories(result.access_token);

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
            // x: truncateNumber(data.optimals.price[0]),
            // y: truncateNumber(data.optimals.profit[0]),

            x: data.optimals.price[0],
            y: data.optimals.profit[0],
            text: 'MV = '+truncateNumber(data.optimals.price[0]),
            color: '#e67e22'
          },
          {
          //   x: truncateNumber(data.optimals.price[1]),
          //   y: truncateNumber(data.optimals.profit[1]),
            
            x: data.optimals.price[1],
            y: data.optimals.profit[1],
            text: 'Optimo = '+truncateNumber(data.optimals.price[1]),
            color: '#2ecc71'
          },
          {
            // x: truncateNumber(data.optimals.price[2]),
            // y: truncateNumber(data.optimals.profit[2]),
            
            x: data.optimals.price[2],
            y: data.optimals.profit[2],
            text: 'MR = '+truncateNumber(data.optimals.price[2]),
            color: '#e74c3c'
          },
          {
            // x: truncateNumber(data.user_point.price),
            // y: truncateNumber(data.user_point.profit),

            x: data.user_point.price,
            y: data.user_point.profit,
            text: 'Punto usuario = '+truncateNumber(data.user_point.price),
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
            text: 'Punto usuario = '+truncateNumber(data.user_point.price),
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
            text: 'Punto usuario = '+truncateNumber(data.user_point.price),
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
            text: 'Punto usuario = '+truncateNumber(data.user_point.profit),
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
                <InputLabel>Periodicidad</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Periodicidad"
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
                <InputLabel>Periodicidad</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Periodicidad"
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
                <InputLabel>Periodicidad</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Periodicidad"
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
                <Chart
                  legend={false}
                  datasets={[
                    {
                      type: 'pie',
                      data: [15,50,23,69,78],
                      label: 'Skus',
                      backgroundColor: [
                        '#2ecc71',
                        '#3498db',
                        '#9b59b6',
                        '#f1c40f',
                        '#34495e'
                      ],
                    }
                  ]}
                />
              </Paper>
            </Grid>
            <Grid item xs={6} style={{textAlign:'center'}}>
              <Paper 
                variant="outlined"
                style={{padding:'1em'}}
              >
                <Chart
                  legend={false}
                  datasets={[
                    {
                      type: 'bar',
                      data: [15,50,23,69,78],
                      label: 'Skus',
                      backgroundColor: [
                        '#2ecc71',
                        '#3498db',
                        '#9b59b6',
                        '#f1c40f',
                        '#34495e'
                      ],
                    }
                  ]}
                />
              </Paper>
            </Grid>
          </Grid>
        )
      case 3:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Periodicidad</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Periodicidad"
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
                <ApexChart
                  datasets={{
                    series: [...bubbleData.data.map(i=>(
                      {
                        data:[[
                          parseFloat(truncateNumber(i.x)),
                          parseFloat(truncateNumber(i.y)),
                          parseFloat(truncateNumber(i.z))
                        ]],
                        color: i.color,
                        name: i.name
                      }
                    ))]
                  }}
                />
                {/* {<Chart 
                  type='bubble'
                  legend={false}
                  datasets={[...bubbleData.data.map(i=>(
                    {
                      type: 'bubble',
                      data: [{
                        x:truncateNumber(i.x),
                        y:truncateNumber(i.y), 
                        r:truncateNumber(i.z*3),
                      }],
                      label: i.name,
                      backgroundColor: [
                        i.color?i.color:randomColor(),
                      ],
                    }
                  ))]}
                />} */}
              </Paper>
            </Grid>
            :
            <>
              {
                bubbleData.loading?
                  <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '20vh'}}>
                    <Loader/>
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
                <InputLabel>Periodicidad</InputLabel>
                <Select
                  //name={'totalSaleUnit'}
                  label="Periodicidad"
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
                    <InputLabel>Selecciona subcategoria</InputLabel>
                    <Select
                      label="Seleccionar subcategoria"
                      value={subcategories.selected}
                      onChange={(e)=>{
                        setSubcategories({...subcategories, selected:e.target.value});
                        setData({...data, skus: []});
                        getSkusBySubcategory(e.target.value, auth.access_token, (r)=>{
                          console.log(r)
                          setData({...data, skus: r.data})
                        })
                      }}
                    >
                      {
                        subcategories.data.map((item, index)=>{
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
                    <InputLabel>Selecciona SKU</InputLabel>
                    <Select
                      //name={'totalSaleUnit'}
                      label="Selecciona SKU"
                      /*value={subcategory.totalSaleUnit}*/
                      onChange={(e)=>{
                        setData({...data, sku:e.target.value});
                      }}
                      disabled={data.skus.length===0}
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
                      label="Tipo de funcion"
                      value={data.fun}
                      onChange={(e)=>{
                        //setUpdate(update+1);
                        try {
                          let curve = generateCurve(data.simulation, e.target.value);
                          setData({...data, fun:e.target.value, price: curve.user_point.price, optimals:curve.optimals, user_point: curve.user_point, simulation: {...data.simulation, user_point: curve.user_point, optimals:curve.optimals ,price_profit:curve.price_profit, price_quantity:curve.price_quantity, price_value:curve.price_value, profit_value:curve.profit_value, points:curve.price_quantity}})
                        } catch (error) {
                          setData({...data, fun:e.target.value});
                        }}}
                    >
                      <MenuItem value={'lineal'}>Lineal</MenuItem>
                      <MenuItem value={'polynomial'}>Polinomial</MenuItem>
                      <MenuItem value={'logarithmic'}>Logarítmica</MenuItem>
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

                <Grid item xs={4}>
                  <CustomDatePicker
                    periodicity={'monthly'}
                    label='Mes a estudiar'
                    onChange={(e)=>{
                      setData({...data, month:e.getMonth()+1});
                    }}
                  />
                </Grid>
                
                <Grid item xs={4} style={{display: 'flex'}}>
                  <Button onClick={()=>{getCurve('', '', data.month);}} color='primary' variant='contained' size="large" style={{height:'3.5em'}} disabled={!data.sku}>
                    Ejecutar
                  </Button>
                </Grid>
                </Grid>
              </Paper>
              </Grid>

              {
              data.simulation?
              <>
              <Grid item xs={12}>
                
                <Paper 
                  variant="outlined"
                  style={{padding:'1em'}}
                >
                  <Typography varian='h4' align='left' style={{marginBottom:'1em'}}>
                    Variables del entorno
                  </Typography>
                  <TableComp
                    heads={data.simulation.env_values.map(i=>i.name)}
                    data={[data.simulation.env_values.map(i=>({text:truncateNumber(i.value), editable:true, key:i.key}))]}
                    onChange={(e)=>{
                      //console.log(data.simulation.env_values, e)
                      let copy = data.simulation.env_values.slice();
                      copy[e.j].value = e.value;
                      setData({...data, simulation:{...data.simulation, env_values:copy}})
                    }}
                    style={{backgroundColor:'#6FD1B0'}}
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <div style={{marginBottom:'1em'}}>
                  <TableComp
                    heads={['','Precio', 'Cantidad', 'Venta', 'Rentabilidad']}
                    data={[0,1,2].map((i)=>[[{text:'MV', color:'#e67e22'},{text:'Optimo', color:'#2ecc71'},{text:'MR', color:'#e74c3c'}][i],{text:formatNumber(truncateNumber(data.simulation.optimals.price[i]))}, {text:formatNumber(truncateNumber(data.simulation.optimals.quantity[i]))}, {text:formatNumber(truncateNumber(data.simulation.optimals.value[i]))}, {text:formatNumber(truncateNumber(data.simulation.optimals.profit[i]))}])}
                  />
                </div>
                <div style={{marginBottom:'3.5em'}}>
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
                            <TableCell><span style={{color:'#89835f'}}>{formatNumber(truncateNumber(data.simulation.user_point.quantity))}</span></TableCell>
                            <TableCell><span style={{color:'#89835f'}}>{formatNumber(truncateNumber(data.simulation.user_point.value))}</span></TableCell>
                            <TableCell><span style={{color:'#89835f'}}>{formatNumber(truncateNumber(data.simulation.user_point.profit))}</span></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </div>
                <div>
                  <Paper 
                    variant="outlined"
                    style={{padding:'1em'}}
                  >
                    <Stack>
                      <Button onClick={()=>{getCurve(data.price, data.simulation.env_values, data.month)}} color='primary' variant='contained' size="large" disabled={!data.sku} style={{height:'3.5em'}}>
                        Simular
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
                style={{padding:'1em', overflow:'hidden', marginBottom:'2em'}}
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
                  <Loader/>
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
      case 8:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={12}>
              <Paper
                variant="outlined"
                style={{padding:'1em'}}
              >
                <Grid container alignItems='flex-start' spacing={3}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Seleccionar subcategoria</InputLabel>
                      <Select
                        label="Seleccionar subcategoria"
                        value={chartData.subcategory}
                        onChange={(e)=>{
                          setChartData({...chartData, subcategory:e.target.value})
                        }}
                      >
                        {
                          subcategories.data.map((item, index)=>{
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
                    <InputLabel>Periodicidad</InputLabel>
                    <Select
                      //name={'totalSaleUnit'}
                      label="Periodicidad"
                      value={chartData.time}
                      onChange={(e)=>{
                        setChartData({...chartData, time:e.target.value})
                      }}
                    >
                      <MenuItem value={'month'}>Mensual</MenuItem>
                      <MenuItem value={'quarter'}>Trimestral</MenuItem>
                      <MenuItem value={'bianual'}>Semestral</MenuItem>
                      <MenuItem value={'years'}>Anual</MenuItem>
                      <MenuItem value={'rolling_year'}>Año movil</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Seleccionar el eje X</InputLabel>
                      <Select
                        label="Seleccionar el eje X"
                        value={chartData.xAxis}
                        onChange={(e)=>{
                          setChartData({...chartData, xAxis:e.target.value})
                        }}
                      >
                        <MenuItem value={'distribution'}>Distribución</MenuItem>
                        <MenuItem value={'elasticity'}>Elasticidad</MenuItem>
                        <MenuItem value={'sale_values'}>Venta valor</MenuItem>
                        <MenuItem value={'sale_kg'}>Venta en Kg</MenuItem>
                        <MenuItem value={'sale_units'}>Venta en unidades</MenuItem> 
                        <MenuItem value={'price_units'}>Precio unidad</MenuItem>
                        <MenuItem value={'price_kg'}>Precio Kg</MenuItem>
                        <MenuItem value={'som'}>SOM</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                   {/*<Grid item xs={4}>
                    {<FormControl fullWidth>
                      <InputLabel>Eje X</InputLabel>
                      <Select
                        label="Seleccionar Variables"
                        value={subcategory.totalSaleUnit}
                        onChange={handleInputChangeSubcategories}
                      >
                        <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                        <MenuItem value={'Full Year'}>Full Year</MenuItem>
                        <MenuItem value={'Mensual'}>Mensual</MenuItem>
                        <MenuItem value={'Semestral'}>Semestral</MenuItem>
                        <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                      </Select>
                    </FormControl>}
                  </Grid> */}
                  <Grid item xs={4} style={{display: 'flex'}}>
                    <Button onClick={()=>{getChart(auth.access_token, chartData.subcategory, chartData.time, chartData.xAxis);}} color='primary' variant='contained' size="large" disabled={!chartData.subcategory || !chartData.time || !chartData.xAxis} style={{height:'3.5em'}}>
                      Ejecutar
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

              {
                chartData.loading?
                <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '20vh'}}>
                  <Loader/>
                </Grid>
                :
                <></>
              }
              {
                chartData.data?
                  <Grid item xs={12}>
                    <Paper
                      variant="outlined"
                      style={{padding:'1em'}}
                    >
                      <Chart
                        type={'pie'}
                        legend={true}
                        datasets={[
                          {
                            data: chartData.data.map(i=>(i.x)),
                            backgroundColor: chartData.data.map(i=>(i.color)),
                          },
                        ]}
                        labels={chartData.data.map(i=>(i.name))}
                      />
                    </Paper>
                  </Grid>
                :
                (
                  (!chartData.loading && !chartData.data)?
                    <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '5vh'}}>
                      <div style={{width:'30vw', filter: 'saturate(1)', opacity:'1'}}>
                        <img src={bg2} alt='' style={{width:'100%'}}/>
                      </div>
                    </Grid>
                  :
                    <></>
                )
              }
          </Grid>
        )
      case 9:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={12}>
              <Paper
                variant="outlined"
                style={{padding:'1em'}}
              >
                <Grid container alignItems='flex-start' spacing={3}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Seleccionar subcategoria</InputLabel>
                      <Select
                        label="Seleccionar subcategoria"
                        value={chartData.subcategory}
                        onChange={(e)=>{
                          setChartData({...chartData, subcategory:e.target.value})
                        }}
                      >
                        {
                          subcategories.data.map((item, index)=>{
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
                    <InputLabel>Periodicidad</InputLabel>
                    <Select
                      //name={'totalSaleUnit'}
                      label="Periodicidad"
                      value={chartData.time}
                      onChange={(e)=>{
                        setChartData({...chartData, time:e.target.value})
                      }}
                    >
                      <MenuItem value={'month'}>Mensual</MenuItem>
                      <MenuItem value={'quarter'}>Trimestral</MenuItem>
                      <MenuItem value={'bianual'}>Semestral</MenuItem>
                      <MenuItem value={'years'}>Anual</MenuItem>
                      <MenuItem value={'rolling_year'}>Año movil</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Seleccionar el eje X</InputLabel>
                      <Select
                        label="Seleccionar el eje X"
                        value={chartData.xAxis}
                        onChange={(e)=>{
                          setChartData({...chartData, xAxis:e.target.value})
                        }}
                      >
                        <MenuItem value={'distribution'}>Distribución</MenuItem>
                        <MenuItem value={'elasticity'}>Elasticidad</MenuItem>
                        <MenuItem value={'sale_values'}>Venta valor</MenuItem>
                        <MenuItem value={'sale_kg'}>Venta en Kg</MenuItem>
                        <MenuItem value={'sale_units'}>Venta en unidades</MenuItem> 
                        <MenuItem value={'price_units'}>Precio unidad</MenuItem>
                        <MenuItem value={'price_kg'}>Precio Kg</MenuItem>
                        <MenuItem value={'som'}>SOM</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                    {/*<Grid item xs={4}>
                    {<FormControl fullWidth>
                      <InputLabel>Eje X</InputLabel>
                      <Select
                        label="Seleccionar Variables"
                        value={subcategory.totalSaleUnit}
                        onChange={handleInputChangeSubcategories}
                      >
                        <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                        <MenuItem value={'Full Year'}>Full Year</MenuItem>
                        <MenuItem value={'Mensual'}>Mensual</MenuItem>
                        <MenuItem value={'Semestral'}>Semestral</MenuItem>
                        <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                      </Select>
                    </FormControl>}
                  </Grid> */}
                  <Grid item xs={4} style={{display: 'flex'}}>
                    <Button onClick={()=>{getChart(auth.access_token, chartData.subcategory, chartData.time, chartData.xAxis);}} color='primary' variant='contained' size="large" disabled={!chartData.subcategory || !chartData.time || !chartData.xAxis} style={{height:'3.5em'}}>
                      Ejecutar
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
              {
                chartData.loading?
                <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '20vh'}}>
                  <Loader/>
                </Grid>
                :
                <></>
              }
              {
                chartData.data?
                  <Grid item xs={12}>
                    <Paper
                      variant="outlined"
                      style={{padding:'1em'}}
                    >
                      <Chart
                        type={'bar'}
                        legend={true}
                        datasets={[
                          /*{
                            label: 'Something3',
                            type: 'bar',
                            data: chartData.data.map(i=>(i.x)),
                            backgroundColor: chartData.data.map(i=>(i.color))
                          },*/
                          ...chartData.data.map(i=>({
                            data:[i.x],
                            backgroundColor:i.color,
                            label:i.name
                          }))
                        ]}
                        labels={['SKUs']}
                      />
                    </Paper>
                  </Grid>
                :
                (
                  (!chartData.loading && !chartData.data)?
                    <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '5vh'}}>
                      <div style={{width:'30vw', filter: 'saturate(1)', opacity:'1'}}>
                        <img src={bg2} alt='' style={{width:'100%'}}/>
                      </div>
                    </Grid>
                  :
                    <></>
                )
              }
          </Grid>
        )
      case 10:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={12}>
              <Paper
                variant="outlined"
                style={{padding:'1em'}}
              >
                <Grid container alignItems='flex-start' spacing={3}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Seleccionar subcategoria</InputLabel>
                      <Select
                        label="Seleccionar subcategoria"
                        value={chartData2.subcategory}
                        onChange={(e)=>{
                          setChart2Data({...chartData2, subcategory:e.target.value})
                        }}
                      >
                        {
                          subcategories.data.map((item, index)=>{
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
                    <InputLabel>Periodicidad</InputLabel>
                    <Select
                      //name={'totalSaleUnit'}
                      label="Periodicidad"
                      value={chartData2.time}
                      onChange={(e)=>{
                        setChart2Data({...chartData2, time:e.target.value})
                      }}
                    >
                      <MenuItem value={'month'}>Mensual</MenuItem>
                      <MenuItem value={'quarter'}>Trimestral</MenuItem>
                      <MenuItem value={'bianual'}>Semestral</MenuItem>
                      <MenuItem value={'years'}>Anual</MenuItem>
                      <MenuItem value={'rolling_year'}>Año movil</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Seleccionar el eje X</InputLabel>
                      <Select
                        label="Seleccionar el eje X"
                        value={chartData2.xAxis}
                        onChange={(e)=>{
                          setChart2Data({...chartData2, xAxis:e.target.value})
                        }}
                      >
                        <MenuItem value={'distribution'}>Distribución</MenuItem>
                        <MenuItem value={'elasticity'}>Elasticidad</MenuItem>
                        <MenuItem value={'sale_values'}>Venta valor</MenuItem>
                        <MenuItem value={'sale_kg'}>Venta en Kg</MenuItem>
                        <MenuItem value={'sale_units'}>Venta en unidades</MenuItem> 
                        <MenuItem value={'price_units'}>Precio unidad</MenuItem>
                        <MenuItem value={'price_kg'}>Precio Kg</MenuItem>
                        <MenuItem value={'som'}>SOM</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                    {/*<Grid item xs={4}>
                    {<FormControl fullWidth>
                      <InputLabel>Eje X</InputLabel>
                      <Select
                        label="Seleccionar Variables"
                        value={subcategory.totalSaleUnit}
                        onChange={handleInputChangeSubcategories}
                      >
                        <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                        <MenuItem value={'Full Year'}>Full Year</MenuItem>
                        <MenuItem value={'Mensual'}>Mensual</MenuItem>
                        <MenuItem value={'Semestral'}>Semestral</MenuItem>
                        <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                      </Select>
                    </FormControl>}
                  </Grid> */}
                  <Grid item xs={4} style={{display: 'flex'}}>
                    <Button onClick={()=>{
                        getChart2(auth.access_token, chartData2.subcategory, chartData2.time, chartData2.xAxis);
                      }} 
                      color='primary' 
                      variant='contained' 
                      size="large" 
                      disabled={!chartData2.subcategory || !chartData2.time || !chartData2.xAxis} 
                      style={{height:'3.5em'}}
                    >
                      Ejecutar
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
              {
                chartData.loading?
                <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '20vh'}}>
                  <Loader/>
                </Grid>
                :
                <></>
              }
              {
                chartData2.data?
                  <Grid item xs={12}>
                    <Paper
                      variant="outlined"
                      style={{padding:'1em'}}
                    >
                      <Chart
                        type={'bar'}
                        legend={true}
                        datasets={[
                          /*{
                            label: 'Something3',
                            type: 'bar',
                            data: chartData.data.map(i=>(i.x)),
                            backgroundColor: chartData.data.map(i=>(i.color))
                          },*/
                          ...chartData2.data.map(i=>({
                            data:[i.x],
                            backgroundColor:i.color,
                            label:i.name
                          }))
                        ]}
                        labels={['SKUs']}
                      />
                    </Paper>
                  </Grid>
                :
                (
                  (!chartData2.loading && !chartData2.data)?
                    <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '5vh'}}>
                      <div style={{width:'30vw', filter: 'saturate(1)', opacity:'1'}}>
                        <img src={bg2} alt='' style={{width:'100%'}}/>
                      </div>
                    </Grid>
                  :
                    <></>
                )
              }
          </Grid>
        )
      case 11:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={12}>
              <Paper
                variant="outlined"
                style={{padding:'1em'}}
              >
                <Grid container alignItems='flex-start' spacing={3}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Seleccionar subcategoria</InputLabel>
                      <Select
                        label="Seleccionar subcategoria"
                        value={chartData.subcategory}
                        onChange={(e)=>{
                          setChartData({...chartData, subcategory:e.target.value})
                        }}
                      >
                        {
                          subcategories.data.map((item, index)=>{
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
                    <InputLabel>Periodicidad</InputLabel>
                    <Select
                      //name={'totalSaleUnit'}
                      label="Periodicidad"
                      value={chartData.time}
                      onChange={(e)=>{
                        setChartData({...chartData, time:e.target.value})
                      }}
                    >
                      <MenuItem value={'month'}>Mensual</MenuItem>
                      <MenuItem value={'quarter'}>Trimestral</MenuItem>
                      <MenuItem value={'bianual'}>Semestral</MenuItem>
                      <MenuItem value={'years'}>Anual</MenuItem>
                      <MenuItem value={'rolling_year'}>Año movil</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Seleccionar el eje X</InputLabel>
                      <Select
                        label="Seleccionar el eje X"
                        value={chartData.xAxis}
                        onChange={(e)=>{
                          setChartData({...chartData, xAxis:e.target.value})
                        }}
                      >
                        <MenuItem value={'distribution'}>Distribución</MenuItem>
                        <MenuItem value={'elasticity'}>Elasticidad</MenuItem>
                        <MenuItem value={'sale_values'}>Venta valor</MenuItem>
                        <MenuItem value={'sale_kg'}>Venta en Kg</MenuItem>
                        <MenuItem value={'sale_units'}>Venta en unidades</MenuItem> 
                        <MenuItem value={'price_units'}>Precio unidad</MenuItem>
                        <MenuItem value={'price_kg'}>Precio Kg</MenuItem>
                        <MenuItem value={'som'}>SOM</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                   {/*<Grid item xs={4}>
                    {<FormControl fullWidth>
                      <InputLabel>Eje X</InputLabel>
                      <Select
                        label="Seleccionar Variables"
                        value={subcategory.totalSaleUnit}
                        onChange={handleInputChangeSubcategories}
                      >
                        <MenuItem value={'Rolling Year'}>Rolling Year</MenuItem>
                        <MenuItem value={'Full Year'}>Full Year</MenuItem>
                        <MenuItem value={'Mensual'}>Mensual</MenuItem>
                        <MenuItem value={'Semestral'}>Semestral</MenuItem>
                        <MenuItem value={'Trimestral'}>Trimestral</MenuItem>
                      </Select>
                    </FormControl>}
                  </Grid> */}
                  <Grid item xs={4} style={{display: 'flex'}}>
                    <Button onClick={()=>{getChart(auth.access_token, chartData.subcategory, chartData.time, chartData.xAxis);}} color='primary' variant='contained' size="large" disabled={!chartData.subcategory || !chartData.time || !chartData.xAxis} style={{height:'3.5em'}}>
                      Ejecutar
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

              {
                chartData.loading?
                <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '20vh'}}>
                  <Loader/>
                </Grid>
                :
                <></>
              }
              {
                chartData.data?
                  <Grid item xs={12}>
                    <Paper
                      variant="outlined"
                      style={{padding:'1em'}}
                    >
                      <Chart
                        type={'doughnut'}
                        legend={true}
                        datasets={[
                          {
                            data: chartData.data.map(i=>(i.x)),
                            backgroundColor: chartData.data.map(i=>(i.color)),
                          },
                        ]}
                        labels={chartData.data.map(i=>(i.name))}
                      />
                    </Paper>
                  </Grid>
                :
                (
                  (!chartData.loading && !chartData.data)?
                    <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '5vh'}}>
                      <div style={{width:'30vw', filter: 'saturate(1)', opacity:'1'}}>
                        <img src={bg2} alt='' style={{width:'100%'}}/>
                      </div>
                    </Grid>
                  :
                    <></>
                )
              }
          </Grid>
        )
      case 12:
        return (
          <OptimalPrices
            subcategories={subcategories}
            token={auth.access_token}
          />
        )
      default:
        return (
          <Grid container alignItems='flex-start' spacing={3}>
            <Grid item xs={12} style={{display: 'flex', justifyContent:'center', marginTop: '10vh'}}>
              <div style={{width:'40vw', filter: 'saturate(1)', opacity:'1'}}>
                <img src={bg3} alt='' style={{width:'100%'}}/>
              </div>
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
            >
              <div style={{display:'flex', alignItems:'center'}}>
                <BarChartIcon/><span style={{marginLeft:'1em'}}>Graficas</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <MenuList style={{width:'100%'}}>
                <MenuItem style={{width:'100%'}}>
                <Accordion>

                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <div style={{display:'flex', alignItems:'center'}}>
                      <span style={{marginLeft:'1em'}}>Pie</span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <MenuList style={{width:'100%'}}>
                      <MenuItem style={{width:'100%'}} onClick={()=>{
                        setChartData({...chartData2, data:null});
                        handleOption(8);
                      }}>
                        <div style={{width:'2em'}}><img style={{width:'100%', filter: 'invert(.75)'}} src={pie1}/></div>
                      </MenuItem>
                      <MenuItem style={{width:'100%'}} onClick={()=>{
                        setChartData({...chartData2, data:null});
                        handleOption(11);
                      }}>
                        <div style={{width:'2em'}}><img style={{width:'100%', filter: 'invert(.75)'}} src={pie2}/></div>
                      </MenuItem>
                      <MenuItem style={{width:'100%'}} onClick={()=>{}}>
                        <div style={{width:'2em'}}><img style={{width:'100%', filter: 'invert(.75)'}} src={pie3}/></div>
                      </MenuItem>
                      <MenuItem style={{width:'100%'}} onClick={()=>{}}>
                        <div style={{width:'2em'}}><img style={{width:'100%', filter: 'invert(.75)'}} src={pie4}/></div>
                      </MenuItem>
                    </MenuList>
                  </AccordionDetails>
                </Accordion>

                </MenuItem>

                <MenuItem>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <div style={{display:'flex', alignItems:'center'}}>
                        <span style={{marginLeft:'1em'}}>Barra</span>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <MenuList style={{width:'100%'}}>
                        <MenuItem style={{width:'100%'}} onClick={()=>{
                          setChartData({...chartData, data:null});
                          handleOption(9);
                        }}>
                          <div style={{width:'2em'}}><img style={{width:'100%', filter: 'invert(.75)'}} src={bar1}/></div>
                        </MenuItem>
                        <MenuItem style={{width:'100%'}} onClick={()=>{}}>
                          <div style={{width:'2em'}}><img style={{width:'100%', filter: 'invert(.75)'}} src={bar2}/></div>
                        </MenuItem>
                        <MenuItem style={{width:'100%'}} onClick={()=>{}}>
                          <div style={{width:'2em'}}><img style={{width:'100%', filter: 'invert(.75)'}} src={bar3}/></div>
                        </MenuItem>
                        <MenuItem style={{width:'100%'}} onClick={()=>{}}>
                          <div style={{width:'2em'}}><img style={{width:'100%', filter: 'invert(.75)'}} src={bar4}/></div>
                        </MenuItem>
                      </MenuList>
                    </AccordionDetails>
                  </Accordion>
                </MenuItem>

                <MenuItem>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <div style={{display:'flex', alignItems:'center'}}>
                        <span style={{marginLeft:'1em'}}>Tendencia</span>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <MenuList style={{width:'100%'}}>
                        <MenuItem style={{width:'100%'}} onClick={()=>{}}>
                          <div style={{width:'2em'}}><img style={{width:'100%', filter: 'invert(.75)'}} src={trend1}/></div>
                        </MenuItem>
                        <MenuItem style={{width:'100%'}} onClick={()=>{}}>
                          <div style={{width:'2em'}}><img style={{width:'100%', filter: 'invert(.75)'}} src={trend2}/></div>
                        </MenuItem>
                        <MenuItem style={{width:'100%'}} onClick={()=>{}}>
                          <div style={{width:'2em'}}><img style={{width:'100%', filter: 'invert(.75)'}} src={trend3}/></div>
                        </MenuItem>
                        <MenuItem style={{width:'100%'}} onClick={()=>{}}>
                          <div style={{width:'2em'}}><img style={{width:'100%', filter: 'invert(.75)'}} src={trend4}/></div>
                        </MenuItem>
                      </MenuList>
                    </AccordionDetails>
                  </Accordion>
                </MenuItem>

                {/* {<MenuItem style={{width:'100%'}} onClick={()=>{
                  setChart2Data({...chartData2, data:null});
                  handleOption(10);
                }}>
                  Tendencia
                </MenuItem>} */}
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(10)}>
                  Gráficas 2 ejes
                </MenuItem>
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(4)}>
                  Gráficas 3   ejes
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
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(10)}>
                  Comparativas
                </MenuItem>
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(10)}>
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
                <PsychologyIcon/><span style={{marginLeft:'1em'}}>Laboratorio</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <MenuList style={{width:'100%'}}>
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(6)}>
                  Curvas
                </MenuItem>
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(12)}>
                  Optimal prices
                </MenuItem>
                <MenuItem style={{width:'100%'}} onClick={()=>handleOption(10)}>
                  Tendencia
                </MenuItem>
              </MenuList>
            </AccordionDetails>
          </Accordion>
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
  guardar escenario
*/