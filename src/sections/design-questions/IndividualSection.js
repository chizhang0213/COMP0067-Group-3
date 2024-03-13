import { TextField, Grid, Stack } from '@mui/material';

export default function Paragraph(){

    return(
        <Grid item xs={6}>
            <Stack spacing={1}>
                <label htmlFor="title" style={{ color: '#333' }}>
                Placeholder
                </label>
                <TextField
                type="text"
                id="title"
                name="title"
                />
            </Stack>
        </Grid>    
    );
}