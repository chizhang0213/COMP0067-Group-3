'use client';

import { Select, Grid, MenuItem, FormControlLabel, Stack, TextField, Switch } from '@mui/material';
import MainCard from 'components/MainCard';
import { Divider } from '../../../node_modules/@mui/material/index';
import { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FormControl, InputLabel, Input, Button} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import MarkingCard from './MarkingCard';
import IndividualSection from './IndividualSection';

export default function MarkingFramework(props){
    // for checking if data is right
    const submit = (e) => {
        e.preventDefault();
        console.log(markingCriterion);
    };

    const [markingCriterion, setMarkingCriterion] = useState(props.criterion);
    const [saveForm, setSaveForm] = useState(false);
    const [dataToSave, setDataToSave] = useState('');

    const handleCriterionChange = (event) => {
        const updatedData = {
            ...markingCriterion, // Spread the existing state
            [event.target.name]: event.target.value // Update the specific field
        };

        setMarkingCriterion(updatedData);
    }

    const handleSave = () => {
        // Add save logic here
        setSaveForm(true);
        // console.log(markingCriterion);
        // setSaveForm(false);
    };
    const updateQuestions = (questions) => {
        const updatedData = {
            ...markingCriterion,
            ['questions']: questions
        };
        setDataToSave(updatedData);
    }
    useEffect(() => {
        if (markingCriterion.type === '' && saveForm === true) {
            const updatedData = {
                ...markingCriterion,
            };
            setDataToSave(updatedData);
        }
    }, [saveForm]);
    useEffect(() => {
        // console.log(dataToSave);
        if (dataToSave !== '') {
            console.log(dataToSave);
            setSaveForm(false);
        }
    }, [dataToSave]);

    {/* Group vs Individual dropdown STARTS */}
    const [selectedValue, setSelectedValue] = useState('');
    const [dropdownState, setdropdownState] = useState(false);
    {/*const handleChange = (event) => { setSelectedValue(event.target.value);};*/}
    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);

        // Set toggleState based on the selected value
        if (value === 'Group') {
            setdropdownState(true); // Enable the Group Section if 'Group' is selected
        } else if (value === 'Individual'){
            setdropdownState(true); // Enable the Individual Section if 'Individual' is selected
        } else {
            setdropdownState(false); // Disable when no value is selected
        }
        const updatedData = {
            ...markingCriterion, // Spread the existing state
            [event.target.name]: event.target.value // Update the specific field
        };

        setMarkingCriterion(updatedData);
    };

    const handleSectionChange = (event, index) => {
        // Handle change for elements in row 4: Group vs Individual
    };

    {/* Group vs Individual dropdown ENDS */}

    // sub weighting toggle 
    const [toggleState, setToggleState] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const handleToggleChange = (event) => {
        setToggleState(event.target.checked);
        
        const updatedData = {
            ...markingCriterion,
            [event.target.name]: event.target.checked
        };

        setMarkingCriterion(updatedData);
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

    return(
        <>
            <Grid container spacing={3} style={{ paddingTop: '10px' }}>
                {/* row 1 */}
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <label htmlFor="title" style={{ color: '#333' }}>
                        Marking Component
                        </label>
                        <TextField
                            type="text"
                            id="name"
                            name="name"
                            onChange={event => handleCriterionChange(event)}
                            value={markingCriterion.name}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                </Grid>

            {/* row 2 */}
            <Grid container item xs={6} alignItems='flex-end'>
                <Grid item xs={4}>
                    <Stack spacing={1}>
                        <label htmlFor="title" style={{ color: '#333' }}>
                        Total Weight 
                        </label>
                        <TextField
                        type="text"
                        id="title"
                        name="weight"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        onChange={event => handleCriterionChange(event)}
                        value={markingCriterion.weight}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    <FormControlLabel
                        control={
                            <Switch 
                            color="primary" 
                            name='isDistributed'
                            checked={markingCriterion.isDistributed}
                            onChange={handleToggleChange}
                            />
                        }   
                        label="sub weighting"
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
                            value={markingCriterion.type}
                            onChange={handleChange}
                            name='type'
                        >
                            <MenuItem value="Group">Group</MenuItem>
                            <MenuItem value="Individual">Individual</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Grid>
            {/* <Grid item xs={10}>
            </Grid> */}

                {/* Group vs Individual Section */}
                {/* Conditionally render row 4-6 or row 5-7 based on dropdownState */}
                <Grid item xs={12}>
                    {markingCriterion.type === 'Group' && 
                        <MarkingCard
                            elements={markingCriterion.questions} 
                            subWeighting={markingCriterion.isDistributed}
                            save={saveForm}
                            updateQuestions={updateQuestions}
                        />
                    }
                    {markingCriterion.type === 'Individual' && <IndividualSection/>}
                    {/* {dropdownState && selectedValue === 'Group' && (
                        <MarkingCard/>
                    )}
                    {dropdownState && selectedValue === 'Individual' && (
                        <IndividualSection/>
                    )} */}
                </Grid>
                {/* Group vs Individual Section ENDS  */}

                {/* row 4 */}
                <Grid item xs={9}>
                    {/* <Button variant="contained" color="primary" onClick={handleBack}>Back</Button> */}
                    <button onClick={submit}>submit</button>
                </Grid>
                <Grid item xs={1.5}>
                    <Button variant="contained" color="error" onClick={handleCancel}>Cancel</Button>
                </Grid>
                <Grid item xs={1.5}>
                    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                </Grid>
            </Grid>
        </>
    );
}



