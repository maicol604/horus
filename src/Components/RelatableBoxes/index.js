import React from 'react';

import { makeStyles } from '@mui/styles';
import StartBox from './StartBox';
import EndBox from './EndBox';
import ReactBezier from "react-bezier";
import ScreenShot from '../ScreenShot';

//import ContextMenu from '../ContextMenu';
import Fab from '@mui/material/Fab';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';


const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '1em',
        paddingBottom: '1em'
    },
    col: {
        width: '30%',
        /*padding: '1em',
        width: '30%',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        borderRadius: '4px',
        margin: '.25em',*/
        //overflow: 'hidden',
    },
    startNode: {
        border: '1px solid #2B9982',
        borderRadius: '.5em',
        padding: '.5em 1.5em'
    },
    title: {
        backgroundColor: '#2B9982',
        top: '-1em',
        left: '-1em',
        position: 'relative',
        width: 'calc( 100% + 1.5em)',
        padding: '.25em',
        color: '#fff',
        borderRadius: '4px 4px 0 0'
    },

    '@global': {
        
    }

});

const RelatableBoxes = ({dataFrom, dataTo, onUpdate, relations=[]}) => {

    const classes = useStyles();
    const [draggablesNodes, setDraggablesNodes] = React.useState([]);
    const [settings, setSettings] = React.useState([]);
    const [enter, setEnter] = React.useState({data:null, flag:false});
    const ref = React.useRef();

    React.useEffect(()=>{
        let newArray = [];
        for(let i=0;i<relations.length;i++){
            let newData = {
                from: "startBox-"+relations[i].from.id,
                to: "endBox-"+relations[i].to.id,
                toData: relations[i].to,
                fromData: relations[i].from,
                positions: {
                    start: {
                        side: "right",
                        indent: 20
                    },
                    end: {
                        side: "left",
                    },
                },
                style: "relationship-line "+`stroke-color-${relations[i].from.grouper.name}-${relations[i].from.grouper.id}`.replace(/\s/g, '_').split('.').join(""),
            }
            newArray.push(newData);
        }
        //console.log([...settings, ...newArray])
        setDraggablesNodes([...newArray]);
        setSettings([...settings, ...newArray]);
        //console.log([...settings, ...newArray],relations);
    },[])

    React.useEffect(()=>{
        ////console.log(dataFrom,dataTo)
        ////console.log(groupers)
        ////console.log(classes)
        let newSettings = [];
        //let newDraggablesNodes = [];
        
        for(let i=0;i<dataFrom.length;i++){
            newSettings.push(
                {
                    from: "start-"+dataFrom[i].id,
                    to: "end-"+dataFrom[i].id,
                    toData: dataFrom[i],
                    fromData: dataFrom[i],
                    positions: {
                        start: {
                            side: "right",
                            indent: 20
                        },
                        end: {
                            side: "left",
                        },
                    },
                    style: `relationship-line-selected`,
              }
            )
        }
        //console.log(newSettings)
        // if(settings.length===0){
        //     for(let i=0;i<relations.length;i++){
        //         let newData = {
        //             from: "startBox-"+relations[i].from.id,
        //             to: "endBox-"+relations[i].to.id,
        //             toData: relations[i].to,
        //             fromData: relations[i].from,
        //             positions: {
        //                 start: {
        //                     side: "right",
        //                     indent: 20
        //                 },
        //                 end: {
        //                     side: "left",
        //                 },
        //             },
        //             style: "relationship-line "+`stroke-color-${relations[i].from.grouper.name}-${relations[i].from.grouper.id}`.replace(/\s/g, '_').split('.').join(""),
        //         }
        //         newSettings.push(newData);
        //     }
        // }
        //console.log(settings)
        setSettings([...newSettings, ...draggablesNodes]);
        if(settings.length!==0){
            //console.log('updating')
            handleUpdate([...newSettings, ...draggablesNodes]);
        }
        //console.log([...newSettings, ...draggablesNodes])
        //console.log([...newSettings, ...draggablesNodes], relations, 'draggableNodes')
    },[draggablesNodes]);

    const handleUpdate = (data) => {
        let aux = [];
        for(let i=0;i<data.length;i++){
            if(data[i].style!=='relationship-line-selected'){
                aux.push({from:data[i].fromData, to:data[i].toData})
            }
        }
        //console.log(aux)
        if(onUpdate)
            onUpdate(aux);
    }

    const handleEnter = (data) => {
        setEnter({data, flag: true});
    }

    const handleExit = (data) => {
        setEnter({data:null, flag:false});
    }

    const handleStop = (data) => {
        ////console.log(data, enter)
        let aux = draggablesNodes.slice();
        let newData;
        
        // for(let i=0;i<aux.length;i++){
        //     try {
        //         if(aux[i].toData.id===enter.data.id && aux[i].fromData.id)
        //             //console.log('from')
        //     } catch (error) {
        //     }
        // }
        
        if(enter.flag){
            newData = {
                from: "startBox-"+data.id,
                to: "endBox-"+enter.data.id,
                toData: enter.data,
                fromData: data,
                positions: {
                    start: {
                        side: "right",
                        indent: 20
                    },
                    end: {
                        side: "left",
                    },
                },
                style: "relationship-line "+`stroke-color-${data.grouper.name}-${data.grouper.id}`.replace(/\s/g, '_').split('.').join(""),
            }
            aux.push(newData);
            ////console.log('newData')
            setDraggablesNodes(aux);
        }
    }

    const isRelated = (id) => {
        //console.log(id)
        for(let i=0;i<draggablesNodes.length;i++){
            if(`${draggablesNodes[i].toData.id}`===`${id}`)
                return true;
        }
        return false;
    }

    const changeLineColor = (data, newClass) => {
        ////console.log(id)
        let newSettings = settings.slice();
        for(let i=0;i<newSettings.length;i++){
            if(newSettings[i].toData.id===data.id)
                newSettings[i] = {
                    ...newSettings[i],
                    style: newClass,
                };
        }
        ////console.log(newSettings);
        setSettings([...newSettings]);
    }

    const changeLineColorFrom = (from, to, newClass) => {
        ////console.log('from',from)
        let newSettings = settings.slice();
        for(let i=0;i<newSettings.length;i++){
            // if(newSettings[i].style!=='relationship-line-selected'){
            //     newSettings[i] = {
            //         ...newSettings[i],
            //         style: defaultStyleClass,
            //     };
            //     //continue;
            // }
            if(newSettings[i].fromData.id===from.id && newSettings[i].toData.id===to.id){
                newSettings[i] = {
                    ...newSettings[i],
                    style: newClass,
                }; 
                //continue;
            }
        }
        ////console.log(newSettings);
        setSettings([...newSettings]);
    }

    const getRelations = (id) => {
        let data = settings.slice();
        let newData = [];
        let response = [];
        for(let i=0;i<data.length;i++){
            if(data[i].toData.id===id && (data[i].style!=='relationship-line-selected'))
                newData.push({from:data[i].fromData, to:data[i].toData});
        }
        
        for(let i=0;i<newData.length;i++){
            let flag = false;
            for(let j=0;j<response.length;j++){
                if(newData[i].from.id===response[j].from.id){
                    flag = true;
                }
            }
            if(!flag){
                response.push(newData[i]);
            }
        }
        ////console.log('data', data, id, newData)
        return response;
    }

    const hanldeDelete = (data) => {
        ////console.log(data)
        let aux = [];
        let newSettings = settings.slice();
        for(let i=0;i<newSettings.length;i++){
            if(!(newSettings[i].fromData.id===data.from.id && newSettings[i].toData.id===data.to.id)){
                aux.push(newSettings[i])
            }
        }

        let aux2 = [];
        let newDraggables = draggablesNodes.slice();
        for(let i=0;i<newDraggables.length;i++){
            ////console.log(newDraggables);
            if(!(newDraggables[i].fromData.id===data.from.id && newDraggables[i].toData.id===data.to.id)){
                aux2.push(newDraggables[i])
            }
        }
        

        setDraggablesNodes([...aux2]);
        setSettings([...aux]);
    }

    const cleanNodes = () => {
        let aux = [];
        let newSettings = settings.slice();
        for(let i=0;i<newSettings.length;i++){
            if(newSettings[i].style==='relationship-line'){
                aux.push(newSettings[i])
            }
        }
        
        setDraggablesNodes([]);
        setSettings([...aux]);
    }

    return (
        <div>
            <ScreenShot>
                <div ref={ref}>
                    {/*<ContextMenu
                        ref={ref}
                    />*/}
                    {
                       ////console.log(groupers,'groupers')
                    }
                    <ReactBezier settings={settings}>
                        {/*<CustonCursor/>*/}
                        <div className={classes.container}>
                            <div className={classes.col} style={{marginRight:'30%'}}>
                                {/*<div className={classes.title}>
                                    SKUs
                </div>*/}
                                {
                                    dataFrom.map((data, index)=> {
                                        return (
                                            <div key={index}>
                                                <StartBox
                                                    data={data}
                                                    id={data.id}
                                                    onStop={handleStop}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={classes.col}>
                                {/*<div className={classes.title}>
                                    SKUs
                            </div>*/}
                                {
                                    dataTo.map((data, index)=> {
                                        return (
                                            <div key={index} style={{position: 'relative'}}>
                                                <EndBox
                                                    data={data}
                                                    id={data.id}
                                                    onEnter={handleEnter}
                                                    onExit={handleExit}
                                                    related={isRelated(data.id)}

                                                    onEnterDelete={()=>{/*changeLineColor(data, 'relationship-line-delete')*/}}
                                                    onExitDelete={()=>{/*changeLineColor(data, 'relationship-line')*/}}//cambia el color a lines que llegan a un nodo final

                                                    relations={getRelations(data.id)}

                                                    onEnterItem={(data)=>changeLineColorFrom(data.from, data.to, 'relationship-line-delete')}
                                                    onLeaveItem={(data)=>changeLineColorFrom(data.from, data.to, 'relationship-line '+`stroke-color-${data.from.grouper.name}-${data.from.grouper.id}`.replace(/\s/g, '_').split('.').join(""))}//cambia el color de la linea

                                                    onDelete={(data)=>hanldeDelete(data)}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </ReactBezier>
                </div>
            </ScreenShot>
            <div style={{display: 'flex'}}>
                <Fab size="small" color="primary" aria-label="clean" onClick={cleanNodes}>
                    <CleaningServicesIcon/>
                </Fab>
            </div>
        </div>
    )
}

export default RelatableBoxes;