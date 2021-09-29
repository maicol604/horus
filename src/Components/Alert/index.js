import React from 'react';

import Alert from '@mui/material/Alert';

const Alert2 = ({text, type, open}) => {
    return (
        <span style={{display:open?'block':'none'}}>
            <Alert variant="filled" severity={type} open={open}>
                {text}
            </Alert>
        </span>
    )
}

export default Alert2;