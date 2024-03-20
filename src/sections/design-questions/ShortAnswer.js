import { Stack, InputLabel, Select, MenuItem } from '@mui/material';
import { Grid, TextField } from '../../../node_modules/@mui/material/index';
import { useState } from 'react';

export default function ShortAnswer(props){
    // const [selectedInputType, setSelectedInputType] = useState('string'); // Set the default value here

    // const handleInputTypeChange = (event) => {
    //     setSelectedInputType(event.target.value);
    // };

    return(
        <>
        {/* <Grid item xs={4} sx={{ mt: 3 }}>
            <TextField
                fullWidth
                id="standard-basic"
                placeholder="Short answer text"
                variant="standard"
                disabled
                InputProps={{
                    style: { paddingLeft: '12px'} // Adjust the paddingLeft as needed
                    }}
            />
        </Grid>
        <Grid item xs={2}/>
        <Grid item xs={6}>
            <Stack spacing={1}>
                <InputLabel htmlFor="input-type">Question Response Format</InputLabel>
                <Select 
                    fullWidth 
                    id="input-type"
                    name='shortAns'
                    value={props.input} 
                    onChange={props.inputChange}
                    >
                    <MenuItem value="string">Text</MenuItem>
                    <MenuItem value="float">Number</MenuItem>
                </Select>
            </Stack>
        </Grid>  */}
        </>
        
           
    );
}