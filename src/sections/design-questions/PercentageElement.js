import { Stack, InputLabel, Select, MenuItem } from '@mui/material';
import { Grid, TextField } from '../../../node_modules/@mui/material/index';
import { useState } from 'react';

export default function PercentageElement(props){

    return(
        <>
        <Grid item xs={3}>
            <Stack spacing={1}>
                <InputLabel htmlFor="input-type">Element Percentage</InputLabel>
                <TextField
                    placeholder="Percentage"
                    id="url-start-adornment"
                    InputProps={{
                        endAdornment: '%'
                    }}
                    name='percentage'
                    value={props.input}
                    onChange={props.inputChange}
                />
            </Stack>
        </Grid> 
        </>        
           
    );
}