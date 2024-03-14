'use client';

import { Select, Grid, MenuItem, FormControlLabel, Stack, TextField, Switch, Button } from '@mui/material';
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

export default function MarkingQuestion(props){
    // <Grid item xs={4}>
    //     <Select 
    //         fullWidth
    //         name="qType"
    //         id="qType" 
    //         value={element.qType} 
    //         onChange={event => handleElementsChange(event, index)}
    //         >
    //         <MenuItem value="short-answer">Short Answer</MenuItem>
    //         <MenuItem value="paragraph">Paragraph</MenuItem>
    //         <Divider/>
    //         <MenuItem value="dropdown">Dropdown</MenuItem>
    //         <Divider/>
    //         {/* Conditionally render the MenuItem based on toggleState */}
    //         <MenuItem value="percentage" disabled={!toggleState}>Marking Element (with Percentage)</MenuItem>
    //     </Select>
    // </Grid>
    const _ = require('lodash');

    // for checking if data is right
    const submit = (e) => {
        e.preventDefault();
        console.log(markingElements)
    }

    const [markingElements, setMarkingElements] = useState(props.elements);

    const handleElementsChange = (event, index) => {
        let data = [...markingElements];
        // console.log(event.target.name)
        // console.log(event.target.value)
        // console.log(event.target.checked)

        data[index][event.target.name] = event.target.name === 'isOptional' 
            ? (!event.target.checked)
            : event.target.value;
        // console.log(data[index][event.target.name])

        setMarkingElements(data);
    }
    const handleDetailsChange = (event, index) => {
        let data = [...markingElements];

        data[index]['detail'][event.target.name] = event.target.value;

        setMarkingElements(data);
    }
    const handleDropdownChange = (drop, index) => {
        let data = [...markingElements];

        // console.log(index)

        data[index]['detail']['dropdown'] = drop;

        setMarkingElements(data);
    }

    const addElement = () => {
        let object = {
            title: '', 
            description: '',
            qType: 'short-answer', 
            marker: 'lec-and-ta', 
            isOptional: true,
            detail: {
                'short-ans': '', 
                'dropdown': [''],
                'percentage': ''
            }
        }
    
        setMarkingElements([...markingElements, object])
      }

    const copyElement = (index) => {
        let data = _.cloneDeep(markingElements);
        data.splice(index + 1, 0, _.cloneDeep(data[index]));
        // console.log(data)
        setMarkingElements(data);
    };

    const removeElement = (index) => {
        let data = [...markingElements];
        data.splice(index, 1)
        setMarkingElements(data)
    }

    return(
        <>
        <Grid container>
        {markingElements.map((element, index) => {
            // if (element.qType === 'short-answer' && element.detail === ''){
            //     element.detail = 'string';
            // }

            return (
                <MainCard key={index}>
                    <Grid container spacing={3}>
                        {/* row 1 */}
                        <Grid item xs={6}>
                            <TextField 
                                fullWidth
                                name='title'
                                id="title" 
                                placeholder="Question Title" 
                                variant="filled"
                                onChange={event => handleElementsChange(event, index)}
                                value={element.title}
                            />
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={4}>
                            <Select 
                                fullWidth
                                name="qType"
                                id="qType" 
                                value={element.qType} 
                                onChange={event => handleElementsChange(event, index)}
                                >
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
                                name='description'
                                id="standard-basic"
                                placeholder="Description"
                                variant="standard"
                                onChange={event => handleElementsChange(event, index)}
                                value={element.description}
                                InputProps={{
                                    style: { paddingLeft: '12px' } // Adjust the paddingLeft as needed
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container paddingLeft={'10px'} spacing={3}>
                                {/* Conditional rendering based on selected question type */}
                                {element.qType === 'short-answer' && <ShortAnswer inputChange={event => handleDetailsChange(event, index)} input={element.detail.shortAns}/>}
                                {element.qType === 'paragraph' && <Paragraph/>}
                                {element.qType === 'dropdown' && <Dropdown dropChange={event => handleDropdownChange(event, index)} input={element.detail.dropdown}/>}
                                {element.qType === 'percentage' && <PercentageElement inputChange={event => handleDetailsChange(event, index)} input={element.detail.percentage}/>}
                            </Grid>  
                        </Grid>

                        <Grid item xs={12}>
                            <Divider/>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Select 
                                        fullWidth 
                                        id="user-type" 
                                        name='marker'
                                        value={element.marker} 
                                        onChange={event => handleElementsChange(event, index)}
                                        style={{ width: '250px' }}
                                        >
                                        <MenuItem value="lec-and-ta">For Both Lecturers and TAs</MenuItem>
                                        <MenuItem value="lecturer">Only for Lecturers</MenuItem>
                                        <MenuItem value="ta">Only for TAs</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <Stack direction="row" alignItems="center" spacing={2.4}>
                                        <IconButton onClick={() => copyElement(index)}>
                                            <ContentCopyIcon sx={{ fontSize: '22px' }} color="secondary"/>
                                        </IconButton>
                                        <IconButton onClick={() => removeElement(index)}>
                                            <DeleteOutlineIcon sx={{ fontSize: '27px' }} color="secondary"/>
                                        </IconButton>
                                        <Divider orientation="vertical" flexItem />
                                        <FormControlLabel
                                            name='isOptional'
                                            // value="start"
                                            onChange={event => handleElementsChange(event, index)}
                                            control={<Switch color="primary" />}
                                            label="Required"
                                            labelPlacement="start"
                                            sx={{ mr: 1 }}
                                            checked={!element.isOptional}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid> 
                        
                    </Grid>
                </MainCard>
            )
          })}
        {/* <button onClick={submit}>submit</button> */}
        
            <Grid item xs={4}>
                <Button fullWidth variant="outlined" color="primary" onClick={addElement}>+ Add Marking Component</Button>
            </Grid>
        </Grid>

        </>
        
        );
    }

