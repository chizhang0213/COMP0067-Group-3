'use client';

import { Select, Grid, MenuItem, FormControlLabel, Stack, TextField, Switch } from '@mui/material';
import MainCard from 'components/MainCard';
import { Divider } from '../../../node_modules/@mui/material/index';
import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ShortAnswer from './ShortAnswer';
import Paragraph from './Paragraph';
import Dropdown from './Dropdown';
import PercentageElement from './PercentageElement';

export default function MarkingQuestion(){

    const defaultQType = "short-answer";
    const [selectedQType, setSelectedQType] = useState(defaultQType);

    const handleQTypeChange = (event) => {
        setSelectedQType(event.target.value);
      };

    const defaultUserType = "lec-and-ta";
    const [selectedUserType, setSelectedUserType] = useState(defaultUserType);

    const handleUserTypeChange = (event) => {
        setSelectedUserType(event.target.value);
      };

    return(
        <MainCard>
            <Grid container spacing={3}>
                {/* row 1 */}
                <Grid item xs={6}>
                    <TextField fullWidth id="filled-basic" placeholder="Question Title" variant="filled" />
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={4}>
                    <Select fullWidth id="question-type" value={selectedQType} onChange={handleQTypeChange}>
                        <MenuItem value="short-answer">Short Answer</MenuItem>
                        <MenuItem value="paragraph">Paragraph</MenuItem>
                        <Divider/>
                        <MenuItem value="dropdown">Dropdown</MenuItem>
                        <Divider/>
                        <MenuItem value="percentage">Marking Element (with Percentage)</MenuItem>
                    </Select>
                </Grid>

                {/* row 2 */}
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        placeholder="Description"
                        variant="standard"
                        InputProps={{
                            style: { paddingLeft: '12px' } // Adjust the paddingLeft as needed
                          }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Grid container paddingLeft={'10px'} spacing={3}>
                        {/* Conditional rendering based on selected question type */}
                        {selectedQType === 'short-answer' && <ShortAnswer/>}
                        {selectedQType === 'paragraph' && <Paragraph/>}
                        {selectedQType === 'dropdown' && <Dropdown/>}
                        {selectedQType === 'percentage' && <PercentageElement/>}
                    </Grid>  
                </Grid>

                <Grid item xs={12}>
                    <Divider/>
                </Grid>

                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Select fullWidth id="user-type" value={selectedUserType} onChange={handleUserTypeChange} style={{ width: '250px' }}>
                                <MenuItem value="lec-and-ta">For Both Lecturers and TAs</MenuItem>
                                <MenuItem value="lecturer">Only for Lecturers</MenuItem>
                                <MenuItem value="ta">Only for TAs</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item>
                            <Stack direction="row" alignItems="center" spacing={2.4}>
                                <IconButton>
                                    <ContentCopyIcon sx={{ fontSize: '22px' }} color="secondary"/>
                                </IconButton>
                                <IconButton>
                                    <DeleteOutlineIcon sx={{ fontSize: '27px' }} color="secondary"/>
                                </IconButton>
                                <Divider orientation="vertical" flexItem />
                                <FormControlLabel
                                    value="start"
                                    control={<Switch color="primary" />}
                                    label="Required"
                                    labelPlacement="start"
                                    sx={{ mr: 1 }}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>    
            </Grid> 
        </MainCard>
    );
}