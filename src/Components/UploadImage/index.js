import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const UploadImage = ({title='Upload file', variant="contained", onChange, name, value}) => {

    const [file,setFile] = React.useState(null);

    React.useEffect(()=>{
        setFile(value);
    },[value])

    const handleChage = (event) => {
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
 
        reader.onload = (e) => {
            setFile(e.target.result)
            if(onChange){
                //console.log({target:{value:e.target.result, name}})
                onChange({target:{value:e.target.result, name}})
            }
        }
    }

    const handleRemove = () => {
        setFile(null)
        if(onChange){
            onChange({target:{value:null, name}})
        }
    }

    return (
        <div style={{display: 'flex', flexDirection:'column'}}>
            {file?
                <div style={{width:'100%', position:'relative'}}>
                    
                    <div style={{position:'absolute', top:'.5em', right:'.5em', cursor:'pointer', fontSize: '1em'}} onClick={handleRemove}>
                        <DeleteIcon/>
                    </div>
                    <img src={file} style={{width:'100%'}}/>
                </div>
                :<></>
            }
            <Button
                variant={variant}
                component="label"
                style={{width:'100%'}}
            >
                {title}
                <input
                    type="file"
                    hidden
                    accept='.jpeg, .png, .jpg'
                    onChange={handleChage}
                />
            </Button>
        </div>
    )
}

export default UploadImage;  