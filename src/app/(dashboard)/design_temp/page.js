'use client';

import MarkingFramework from 'sections/design-questions/MarkingFramework';
import { useState } from 'react';
import { Select, Grid, MenuItem, FormControlLabel, Stack, TextField, Switch } from '@mui/material';

export default function DesignQ(){
    const [name, setName] = useState({
        name: 'h',
    });

    const handleNameChange = (event) => {
        const updatedName = {
            ...name, // Spread the existing state
            [event.target.name]: event.target.value // Update the specific field
        };

        setName(updatedName);
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(name);
    };

    return (
        <>
        <TextField
                type="text"
                id="name"
                name="name"
                onChange={event => handleNameChange(event)}
                value={name.name}
            />
        <button onClick={submit}>submit</button>
        </>

    )
    // return <MarkingFramework/>;
}