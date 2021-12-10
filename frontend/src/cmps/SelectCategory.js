import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const categories = [
    {
        value: 'furniture',
        label: 'furniture',
    },
    {
        value: 'electronics',
        label: 'electronics',
    },
    {
        value: 'clothes',
        label: 'clothes',
    },
    {
        value: 'books/media',
        label: 'books/media',
    },
    {
        value: 'sports',
        label: 'sports',
    },
    {
        value: 'games',
        label: 'games',
    },
    {
        value: 'lifestyle',
        label: 'lifestyle',
    },
    {
        value: 'other',
        label: 'other',
    },
]

export default function SelectCategory() {
    const [category, setCategory] = React.useState('furniture');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
                <TextField
                    autoFocus
                    margin="dense"
                    id="outlined-select-currency"
                    select
                    required
                    variant="standard"
                    label="Category"
                    value={category}
                    onChange={handleChange}
                    helperText="Please select your category"
                >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
    );
}
