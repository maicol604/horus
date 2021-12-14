import React from 'react';

import Alert from '@mui/material/Alert';

export default ({text, type, open}) => {
    return (
        <span style={{display:open?'block':'none'}}>
            <Alert variant="filled" severity={type} open={open}>
                {text}
            </Alert>
        </span>
    )
}