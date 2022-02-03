import { Button } from '@mui/material';
import React from 'react';
import nofound from '../../Assets/Img/P2.png';

function PageConstution({ onChange }) {
  return (
    <div style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <h1>Página en construcción</h1>
        <img src={nofound} alt="" style={{width:'250px'}}/>
        <Button onClick={() => { onChange('0') }} > Volver al inicio</Button>
    </div>


  );

}

export default PageConstution;
