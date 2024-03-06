import { Stack, InputLabel, Select, MenuItem } from '@mui/material';
import { Grid, TextField, Typography } from '../../../node_modules/@mui/material/index';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

export default function Dropdown(){
    const index0 = 0;

    const [formFields, setFormFields] = useState(['']);
    
      const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index] = event.target.value;
        setFormFields(data);
      }

      const addFields = () => {
        let newOption = ''
    
        setFormFields([...formFields, newOption])
      }
    
      const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
      }

    return(
        <>
        {formFields.length === 1 ? (
            <Grid item xs={12} key={index0}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <InputLabel htmlFor={`option-${index0}`}>{index0 + 1}.</InputLabel>
                    <TextField
                        fullWidth
                        id={`option-${index0}`}
                        name='name'
                        placeholder={`Option ${index0 + 1}`}
                        onChange={event => handleFormChange(event, index0)}
                        variant="standard"
                        InputProps={{
                            style: { paddingLeft: '3px' } // Adjust the paddingLeft as needed
                        }}
                        value={formFields[0]}
                    />
                </Stack>
            </Grid>
        ) : (
            formFields.map((input, index) => (
                <Grid item xs={12} key={index}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <InputLabel htmlFor={`option-${index}`}>{index + 1}.</InputLabel>
                        <TextField
                            fullWidth
                            id={`option-${index}`}
                            name='name'
                            placeholder={`Option ${index + 1}`}
                            onChange={event => handleFormChange(event, index)}
                            value={input}
                            variant="standard"
                            InputProps={{
                                style: { paddingLeft: '3px' } // Adjust the paddingLeft as needed
                            }}
                        />
                        <IconButton onClick={() => removeFields(index)}>
                            <ClearIcon sx={{ fontSize: '18px' }} color="secondary" />
                        </IconButton>
                    </Stack>
                </Grid>
            ))
        )}

        <Grid item xs={1.5}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <InputLabel htmlFor="add-option">{formFields.length+1}.</InputLabel>
                <TextField
                    fullWidth
                    id="add-option"
                    placeholder="Add option"
                    variant="standard"
                    onClick={addFields}
                    disabled
                    InputProps={{
                        style: { paddingLeft: '3px'} // Adjust the paddingLeft as needed
                        }}
                />
            </Stack>
        </Grid>
        </>
    );
}