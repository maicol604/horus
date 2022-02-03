import React, { useState, useEffect } from 'react';

import { Button, Grid } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import GlobalTable from '../../../Components/GlobalTable';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function AllClients({ onPreviusPage }) {
    const [expanded, setExpanded] = React.useState('panel1');

    const [auth, setAuth] = React.useState({
        access_token: null
    });
    const [clients, setClients] = React.useState([]);
    const [select, setSelect] = React.useState();

    const tables = ['Precio Máximo Histórico', 'Precio de Lista', 'Margen del Cliente por SKU', 'Sell Out Piezas', 'Sell Out Valor', 'Sell In', 'Inventarios']

    const columns = [
        { title: "id", field: "id" },
        { title: "Enero", field: "january" },
        { title: "Febrero", field: "february" },
        { title: "Marzo", field: "march" },
        { title: "Abril", field: "april" },
        { title: "Mayo", field: "may" },
        { title: "Junio", field: "june" },
        { title: "Julio", field: "july" },
        { title: "Agosto", field: "august" },
        { title: "Septiembre", field: "september" },
        { title: "Octubre", field: "october" },
        { title: "Noviembre", field: "november" },
        { title: "Diciembre", field: "december" },
    ];
    const alldata = [
        { id: 1, january: "12", february: "31", march: "4", april: "1", may: "3", june: "3", july: "3", august: "3", september: "3", october: "3", november: "34", december: "1" },
    ];


    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const previusPage = () => {
        onPreviusPage()
    }

    const getClients = (token) => {

        fetch("https://pricing.demo4to.com/api/pricing.customer/name_search?access-token=" + token, {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            method: "GET"
        })
            .then(response => response.json())
            .then(result => {
                setClients(result.data)
            })
            .catch(error => console.log('error sub', error));
    }


    useEffect(() => {

        var requestOptions = {
            method: 'GET',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };

        fetch("https://pricing.demo4to.com/api/auth/token?login=admin&password=admin&db=pricing", requestOptions)
            .then(response => response.json())
            .then(result => {
                setAuth(result);
                getClients(result.access_token);
            })
            .catch(error => console.log('error', error));
    }, []);

    return (
        <div style={{ marginTop: '50px', marginLeft: '40px', marginRight: '20px', gap: '15px' }}>
            <h2> Carga de datos</h2>
            {clients.length === 0 ?
                <div>Cargando clientes...</div> : (
                    <div style={{ width: '350px' }}>
                        <FormControl fullWidth>
                            <InputLabel >Clientes</InputLabel>
                            <Select
                                label="Clientes"
                                onChange={(event) => {
                                    setSelect(event.target.value)
                                }}>
                                {clients?.map((item, index) => (
                                    <MenuItem key={index} value={item}>{item[1]}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </div>
                )}

            {tables.map((item, index) => (
                <Accordion key={index} expanded={expanded === index} onChange={handleChange(index)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <h3>{item}</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                        <GlobalTable
                            columns={columns}
                            alldata={alldata}
                            title='Carga de datos' />
                    </AccordionDetails>
                </Accordion>
            ))}
            <Button onClick={previusPage}>Volver</Button>
        </div>
    )

}

export default AllClients;
