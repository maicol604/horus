import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@mui/styles';

import Checkbox from '@mui/material/Checkbox';
const useStyles = makeStyles((theme) => ({
    colorSquare: {
        width: '1em',
        height: '1em',
        borderRadius: '2px',
        marginRight: '.5em',
        border: '2px solid #c4c4c4',
        flex: '0 0 auto'
    },
    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        width: 'inherit'
    },
}));

export default function CheckboxGroup({items=[], title='', onChange, name}) {
    const [itemList, setItemList] = React.useState([]);
    const classes = useStyles();
    const handleChange = (index) => {
        let aux = JSON.parse(JSON.stringify(itemList.slice()));
        aux[index].checked = !aux[index].checked;
        setItemList(aux);
        if(onChange)
            onChange({target: {name, value:aux}})
    };

    React.useEffect(()=>{
        //console.log(items)
        let flag = false;
        for(let i=0;i<items.length;i++){
            if(items[i].checked)
                flag = true;
        }
        setItemList(items); 
        if(!flag)
            setItemList(items.map(data=>({ ...data, checked:false })));
    },[])


    return (
        <FormGroup row onChange={onchange}>
            {itemList.map((data, index)=>
                <div key={index} className={classes.checkboxContainer}>
                    {data.color?
                        <div className={classes.colorSquare} style={{backgroundColor:data.color}}/>
                        :
                        <React.Fragment/>
                    }
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={data.checked}
                                onChange={()=>handleChange(index)}
                                name={ index }
                                color="primary"
                            />
                        }
                        label={data.name}
                    />
                </div>
            )}
        </FormGroup>
    );
}
