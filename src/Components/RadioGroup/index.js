import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup({items, title, onChange, name, value=null}) {
    //const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        if(onChange)
            onChange({target: {name, value:JSON.parse(event.target.value)}})
        //setValue(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            {title?<FormLabel component="legend">{title}</FormLabel>:<React.Fragment/>}
            <RadioGroup aria-label="gender" name="gender1" value={JSON.stringify(value)} onChange={handleChange}>
                {items.map((data, index)=>
                    <FormControlLabel key={index} value={JSON.stringify(data)} control={<Radio />} label={data.name} />
                )}
            </RadioGroup>
        </FormControl>
    );
}
