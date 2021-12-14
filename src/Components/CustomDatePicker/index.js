import * as React from 'react';
import Menu from '@mui/material/Menu';
import EventIcon from '@mui/icons-material/Event';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

//import DatePicker from '@mui/lab/DatePicker';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styled } from '@mui/material/styles';

const DatePickerContainer = styled('div')(({ theme }) => ({
    position:'relative',
    '.react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range':{
        backgroundColor:theme.palette.primary.main,
    },
    '.react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected, .react-datepicker__year-text--keyboard-selected':{
        backgroundColor:theme.palette.primary.main,
    },
    '.react-datepicker__day--selected:hover, .react-datepicker__day--in-selecting-range:hover, .react-datepicker__day--in-range:hover, .react-datepicker__month-text--selected:hover, .react-datepicker__month-text--in-selecting-range:hover, .react-datepicker__month-text--in-range:hover, .react-datepicker__quarter-text--selected:hover, .react-datepicker__quarter-text--in-selecting-range:hover, .react-datepicker__quarter-text--in-range:hover, .react-datepicker__year-text--selected:hover, .react-datepicker__year-text--in-selecting-range:hover, .react-datepicker__year-text--in-range:hover':{
        backgroundColor:theme.palette.primary.main,
    },
    '.react-datepicker__month-text.react-datepicker__month--selected:hover, .react-datepicker__month-text.react-datepicker__month--in-range:hover, .react-datepicker__month-text.react-datepicker__quarter--selected:hover, .react-datepicker__month-text.react-datepicker__quarter--in-range:hover, .react-datepicker__quarter-text.react-datepicker__month--selected:hover, .react-datepicker__quarter-text.react-datepicker__month--in-range:hover, .react-datepicker__quarter-text.react-datepicker__quarter--selected:hover, .react-datepicker__quarter-text.react-datepicker__quarter--in-range:hover':{
        backgroundColor:theme.palette.primary.main,
    },
    '.react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header': {
        color: theme.palette.primary.main
    },
    '.react-datepicker__month--selected, .react-datepicker__month--in-selecting-range, .react-datepicker__month--in-range, .react-datepicker__quarter--selected, .react-datepicker__quarter--in-selecting-range, .react-datepicker__quarter--in-range':{
        backgroundColor: theme.palette.primary.main
    },
    '.datepicker-container':{
        position: 'absolute',
        top: '3.5em',
        left:0,
        zIndex:1,

    }
}));

const gridItemStyles = {
    cursor: 'pointer',
    padding: '1em',
    borderRadius: '.25em',
    border: '1px solid #bdbdbd'
}



export default ({periodicity='weekly'}) => {

    const [date, setDate] = React.useState(new Date);
    const [visible, setVisible] = React.useState(false)

    const findWeek = (d) => {
        d = new Date(d);
        let day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        //console.log('new',new Date(new Date(d.setDate(diff)).getTime()+(6*24*60*60*1000)))
        let sunday = new Date(new Date(d.setDate(diff)).getTime()+(6*24*60*60*1000));
        let monday = new Date(d.setDate(diff));
        return {
            monday:monday,
            sunday:sunday
        };
    }

    const findBianual = (d) => {
        let startDate;
        let endDate;
        if(d.getMonth()<6){
            // console.log(new Date(d.getYear(), 0, 1))
            // console.log(new Date(d.getYear(), 5, 1))
            startDate = new Date(d.getFullYear(), 0, 1);
            endDate = new Date(d.getFullYear(), 5, 1);
        }
        else {
            // console.log(new Date(d.getYear(), 6, 1))
            // console.log(new Date(d.getYear(), 11, 1))
            startDate = new Date(d.getFullYear(), 6, 1);
            endDate = new Date(d.getFullYear(), 11, 1);
        }
        return ({
            startDate, 
            endDate
        });
    }

    const getContent = (type) => {
        switch(type){
            case 'daily':
                return (
                    <>
                        {
                            visible &&
                            <div>
                                <DatePicker 
                                    selected={new Date(date)} 
                                    inline 
                                    maxDate={new Date()}
                                    onChange={(date) => { 
                                        //console.log(`${date.getDate()}/${date.getMonth()}/${date.getYear()+1900}`) 
                                        setDate(date);
                                    }} 
                                    onClickOutside={()=>{
                                        setVisible(false)
                                    }}
                                />
                            </div>
                        }
                    </>
                )
            case 'weekly':
                return (
                    <>
                        {
                            visible &&
                            <div>
                                <DatePicker 
                                    maxDate={new Date()}
                                    inline 
                                    startDate={findWeek(date).monday}
                                    endDate={findWeek(date).sunday}
                                    //showWeekNumbers

                                    onChange={(date) => { 
                                        setDate(findWeek(date).monday);
                                    }} 
                                    onClickOutside={()=>{
                                        setVisible(false)
                                    }}
                                />
                            </div>
                        }
                    </>
                )
            case 'monthly':
                return (
                    <>
                        {
                            visible &&
                            <div>
                                <DatePicker 
                                    selected={new Date(date)} 
                                    inline 
                                    maxDate={new Date()}
                                    onChange={(date) => { 
                                        //console.log(`${date.getDate()}/${date.getMonth()}/${date.getYear()+1900}`) 
                                        setDate(date);
                                    }} 
                                    onClickOutside={()=>{
                                        setVisible(false)
                                    }}
                                    showMonthYearPicker
                                    
                                    peekNextMonth
                                    showYearDropdown
                                    dropdownMode="select"
                                />
                            </div>
                        }
                    </>
                )
            case 'quarterly':
                return (
                    <>
                        {
                            visible &&
                            <div>
                                <DatePicker 
                                    selected={new Date(date)} 
                                    maxDate={new Date()}
                                    inline 

                                    onChange={(date) => { 
                                        //console.log(`${date.getDate()}/${date.getMonth()}/${date.getYear()+1900}`) 
                                        setDate(date);
                                    }} 
                                    onClickOutside={()=>{
                                        setVisible(false)
                                    }}
                                    showQuarterYearPicker
                                    
                                    peekNextMonth
                                    showYearDropdown
                                    dropdownMode="select"
                                />
                            </div>
                        }
                    </>
                )
            case 'biannual':
                return (
                    <>
                        {
                            visible &&
                            <div>
                                <DatePicker 
                                    selected={new Date(date)} 
                                    maxDate={new Date()}
                                    inline 
                                    showMonthYearPicker

                                    startDate={findBianual(date).startDate}
                                    endDate={findBianual(date).endDate}

                                    onChange={(date) => { 
                                        //console.log(`${date.getDate()}/${date.getMonth()}/${date.getYear()+1900}`) 
                                        setDate(date);
                                    }} 
                                    onClickOutside={()=>{
                                        setVisible(false)
                                    }}
                                />
                            </div>
                        }
                        {
                            //console.log(findBianual(date))
                        }
                    </>
                )
            case 'annual':
                return (
                    <>
                        {
                            visible &&
                            <div>
                                <DatePicker 
                                    selected={new Date(date)} 
                                    inline 
                                    maxDate={new Date()}
                                    onChange={(date) => { 
                                        //console.log(`${date.getDate()}/${date.getMonth()}/${date.getYear()+1900}`) 
                                        setDate(date);
                                    }} 
                                    onClickOutside={()=>{
                                        setVisible(false)
                                    }}
                                    showYearPicker
                                    dateFormat="yyyy"
                                />
                            </div>
                        }
                    </>
                )
        }
    }

    return (
        <DatePickerContainer>
            <TextField
                fullWidth 
                label="Fecha de la primera medicion" 
                variant="outlined" 
                required
                onFocus={()=>{
                    setVisible(true)
                }}
                value={`${date.getDate()}/${date.getMonth()+1}/${date.getYear()+1900}`}
            />
            <div className='datepicker-container'>
                {
                    getContent(periodicity)
                }
            </div>
        </DatePickerContainer>
    );
}
