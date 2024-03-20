import { Stack, InputLabel, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Grid, Typography } from '../../../node_modules/@mui/material/index';
import MainCard from 'components/MainCard';
import { useState } from 'react';
import MarkingFramework from 'sections/design-questions/MarkingFramework';

export default function SchemeOverview(props){
    // const defaultValue
    // {props.scheme ? (

    // ) : (

    // )

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [title, setTitle] = useState('');

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };
    const addCriterion = () => {
        // console.log(index);
        // console.log(props.scheme[index]);
        let object = {
            name: '',
            isDistributed: false,
            type: '',
            weight: '',
            questions:[
                {
                    title: '', 
                    description: '',
                    qType: 'short-answer', 
                    marker: 'lec-and-ta', 
                    isOptional: true,
                    detail: {
                        'shortAns': '', 
                        'dropdown': [''],
                        'percentage': ''
                    }
                }
            ]
        }
        setSelectedItem(object);
        setTitle('Create Marking Component');
        setOpen(true);
        // console.log(selectedItem);
      };
    const editCriterion = (index) => {
        // console.log(index);
        // console.log(props.scheme[index]);
        setSelectedItem(props.scheme[index]);
        setTitle('Edit Marking Component')
        setOpen(true);
        // console.log(selectedItem);
      };
    const deleteCriterion = (index) => {
        console.log(index);
      };

    return(
        <>
        {props.scheme ? (
            // Render this if marking scheme is defined */}
            props.scheme.map((criterion, index) => (
                <Grid item xs={12} key={index}>
                    <MainCard>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5" fontWeight="bold">
                                    {criterion.name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" alignItems="center" spacing={2.4}>
                                    {/* need to change color */}
                                    <Button variant="contained" color="primary" onClick={() => editCriterion(index)}>Edit</Button>
                                    <Button variant="contained" color="primary" onClick={() => deleteCriterion(index)}>Delete</Button>
                                    {/* <button>Edit</button> 
                                    <button>Delete</button> */}
                                </Stack>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            ))
        ) : (
            // Render this if projects is undefined (still need to modify)
            <Grid item xs={12}>
                <Typography variant="h5" fontWeight="bold">
                    No marking scheme available.
                </Typography>
            </Grid>
        )}
            
            <Grid item xs={4}>
                <Button fullWidth variant="outlined" color="primary" onClick={addCriterion}>+ Add Marking Criterion</Button>
            </Grid>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" margin="auto" fullWidth>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <MarkingFramework criterion={selectedItem}/>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddModule} variant="contained" color="primary">
                        Add
                    </Button> */}
                </DialogActions>
            </Dialog>
        </>

    );
        
}