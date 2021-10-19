import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    colorSquare: {
        width: '.5em',
        height: '1em',
        borderRadius: '5px',
        marginRight: '.25em',
        border: '1px solid #c4c4c4',
        flex: '0 0 auto'
    },
    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        width: 'inherit'
    },
}));

export default function RadioButtonsGroup({items, title, onChange, name, value}) {
    //const [value, setValue] = React.useState();
    const classes = useStyles();
    const handleChange = (event) => {
        ////console.log(JSON.parse(event.target.value))
        if(onChange)
            onChange({target: {name, value:JSON.parse(event.target.value)}})
        //setValue(event.target.value);
    };
    //console.log(value)
    return (
        <FormControl component="fieldset">
            {title?<FormLabel component="legend">{title}</FormLabel>:<React.Fragment/>}
            <RadioGroup aria-label="gender" name="gender1" value={JSON.stringify(value)} onChange={handleChange}>
                {items.map((data, index)=>
                    <FormControlLabel key={index} value={JSON.stringify(data)} control={<Radio />} label={<div style={{display: 'flex', alignItems: 'center'}}><div className={classes.colorSquare} style={{backgroundColor:data.color}}/>{data.name}</div>} />
                )}
            </RadioGroup>
        </FormControl>
    );
}
