import React, { useRef } from 'react';
import Newclients from './components/NewClient';
import AllClients from './components/AllClients';

function Clients() {
    const [pageClients, setPageClients] = React.useState(0)
    const onNextPage = ()=>{
        setPageClients(pageClients+1)
    }
    const onPreviusPage = ()=>{
        setPageClients(pageClients-1)
    }
console.log(pageClients)
    const steps = [
        <Newclients onNextPage={onNextPage}/>, 
        <AllClients onPreviusPage={onPreviusPage}/>
      ]
      return steps[pageClients] || null
    }

export default Clients;
