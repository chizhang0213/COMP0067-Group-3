import { Select, Grid, MenuItem, FormControl, InputAdornment, Stack, TextField, Switch } from '@mui/material';
import { useState } from 'react';
import {toggleState} from './MarkingFramework';

export default function IndividualSection(){
    
     const [selectedValue, setSelectedValue] = useState('');
 
     const handleChange = (event) => {
         const value = event.target.value;
         setSelectedValue(value);
     };
 
    return(
        <Grid container spacing={3} alignItems='flex-end'>
            <Grid item xs={2.5}>
                <Stack spacing={1}>
                    <label htmlFor="title" style={{ color: '#333' }}>
                    Individual Marking
                    </label>
                    <FormControl fullWidth>
                            <Select
                                labelId="dropdown-label"
                                id="dropdown"
                                value={selectedValue}
                                onChange={handleChange}
                            >
                                <MenuItem value="overall-contribution">Overall Contribution</MenuItem>
                                <MenuItem value="peer-review">Peer Review</MenuItem>
                                <MenuItem value="comments">Comments</MenuItem>
                            </Select>
                        </FormControl>
                </Stack>
            </Grid>

            
            {(selectedValue === 'overall-contribution' || selectedValue === 'peer-review') && (
                <>
                    {toggleState ? (
                    <Grid item xs={1.2}>
                        <Stack spacing={1}>
                            <label htmlFor="title" style={{ color: '#333' }}>
                            Subweight
                            </label>
                            <TextField
                            type="text"
                            id="title"
                            name="title"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                            />
                        </Stack>
                    </Grid>
                    ) : (     
                        <Grid item xs={1.2} style={{ pointerEvents: 'none', opacity: 0.5 }}>
                        <Stack spacing={1}>
                            <label htmlFor="title" style={{ color: '#333' }}>
                                Subweight
                            </label>
                            <TextField
                                type="text"
                                id="title"
                                name="title"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                                disabled
                            />
                </Stack>
            </Grid>
        )}
                    <Grid item xs={7}>
                        <TextField
                            fullWidth
                            name='description'
                            id="standard-basic"
                            placeholder="Description"
                            variant="standard"
                            InputProps={{
                                style: { paddingLeft: '12px' } // Adjust the paddingLeft as needed
                            }}
                            />
                    </Grid>
                </>
            )}

            {selectedValue === 'comments' && (
                <Grid item xs={8.2}>
                            <TextField
                            fullWidth
                            name='description'
                            id="standard-basic"
                            placeholder="Description"
                            variant="standard"
                            InputProps={{
                                style: { paddingLeft: '12px' } // Adjust the paddingLeft as needed
                            }}
                        />
                </Grid>
            )}
        </Grid>
    );
}