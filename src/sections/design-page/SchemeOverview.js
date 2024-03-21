import { Stack, InputLabel, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Grid, Typography } from '../../../node_modules/@mui/material/index';
import MainCard from 'components/MainCard';
import { useState } from 'react';
import MarkingFramework from 'sections/design-questions/MarkingFramework';

export default function SchemeOverview(props){

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [itemIndex, setItemIndex] = useState(''); // The index of selectedItem
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
        if (props.scheme) {
            setItemIndex(props.scheme.length);
        }
        let object = {
            name: '',
            isDistributed: false,
            type: '',
            weight: null,
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
      };
    const editCriterion = (index) => {
        // console.log(index);
        // console.log(props.scheme[index]);
        // console.log(props.scheme.length);
        setItemIndex(index);
        setSelectedItem(props.scheme[index]);
        setTitle('Edit Marking Component')
        setOpen(true);
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
            // Render this if marking scheme is undefined (still need to modify)
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
                    <MarkingFramework criterion={selectedItem} itemIndex={itemIndex} handleClose={handleClose} schemeUpdated={props.schemeUpdated}/>
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