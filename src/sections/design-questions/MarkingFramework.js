'use client';

import { Select, Grid, MenuItem, FormControlLabel, Stack, TextField, Switch } from '@mui/material';
import MainCard from 'components/MainCard';
import { useState } from 'react';
import { FormControl, InputLabel, Input, Button} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment'

import MarkingCard from './MarkingCard';
import IndividualSection from './IndividualSection';

export default function MarkingFramework(){

    {/* Group vs Individual dropdown STARTS */}
    const [selectedValue, setSelectedValue] = useState('');
    const [dropdownState, setdropdownState] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);

        // Set dropdownState based on the selected value
        if (value === 'option1') {
            setdropdownState(true); // Enable the Group Section if 'Group' is selected
        } else if (value === 'option2'){
            setdropdownState(true); // Enable the Individual Section if 'Individual' is selected
        } else {
            setdropdownState(false); // Disable when no value is selected
        }
    };

    {/* Group vs Individual dropdown ENDS */}

    // sub weighting toggle 
    const [toggleState, setToggleState] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const handleToggleChange = (event) => {
        setToggleState(event.target.checked);
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };
    // toggle ends 

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
            <Grid container item xs={12} alignItems='flex-end'>
                <Grid item xs={2}>
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
                <Grid item xs={10}>
                    <FormControlLabel
                        control={
                            <Switch 
                            color="primary" 
                            checked={toggleState}
                            onChange={handleToggleChange}
                            />
                        }   
                        label="sub weights"
                        labelPlacement="start"
                    />
                </Grid>
            </Grid>

            {/* row 3 */}
            <Grid item xs={2}>
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
            <Grid item xs={10}>
            </Grid>

                {/* Group vs Individual Section */}
                {/* Conditionally render Group / Individual based on dropdownState */}
                <Grid item xs={12}>
                    {dropdownState && selectedValue === 'option1' && (
                        <MarkingCard/>
                    )}
                    {dropdownState && selectedValue === 'option2' && (
                        <IndividualSection/>
                    )}
                </Grid>
                {/* Group vs Individual Section ENDS  */}

                {/* button row */}
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



