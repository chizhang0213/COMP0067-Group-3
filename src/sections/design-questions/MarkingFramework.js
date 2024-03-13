'use client';

import { Select, Grid, MenuItem, FormControlLabel, Stack, TextField, Switch } from '@mui/material';
import MainCard from 'components/MainCard';
import { Divider } from '../../../node_modules/@mui/material/index';
import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FormControl, InputLabel, Input, Button} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import MarkingQuestion from './MarkingCard';

export default function MarkingFramework(){
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => { setSelectedValue(event.target.value);};

    const handleBack = () => {
        // Add cancel logic here
      };

    const handleCancel = () => {
        // Add cancel logic here
      };

    const handleSave = () => {
        // Add save logic here
      };

    return(
        <MainCard>
            <Grid container spacing={3}>
                {/* row 1 */}
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <label htmlFor="title" style={{ color: '#333' }}>
                        Marking Criterion
                        </label>
                        <TextField
                        type="text"
                        id="title"
                        name="title"
                        />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                </Grid>

                {/* row 2 */}
                <Grid item xs={1.5}>
                    <Stack spacing={1}>
                        <label htmlFor="title" style={{ color: '#333' }}>
                        Total Weight 
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
                <Grid item xs={10.5}>
                </Grid>

                {/* row 3 */}
                <Grid item xs={1.5}>
                    <Stack spacing={1}>
                        <label htmlFor="title" style={{ color: '#333' }}>
                        Type
                        </label>
                        <FormControl fullWidth>
                            <Select
                                labelId="dropdown-label"
                                id="dropdown"
                                value={selectedValue}
                                onChange={handleChange}
                            >
                                <MenuItem value="option1">Group</MenuItem>
                                <MenuItem value="option2">Individual</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Grid>
                <Grid item xs={10.5}>
                </Grid>

                <MarkingQuestion/>

                {/* row 4 */}
                <Grid item xs={9}>
                    <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>
                </Grid>
                <Grid item xs={1.5}>
                    <Button variant="contained" color="error" onClick={handleCancel}>Cancel</Button>
                </Grid>
                <Grid item xs={1.5}>
                    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                </Grid>
            </Grid> 
        </MainCard>
    );
}



