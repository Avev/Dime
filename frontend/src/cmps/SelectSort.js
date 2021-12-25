import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import {OutlinedInput} from "@mui/material";

const sorts = [
    {
        value: 'date',
        label: 'date',
    },
    {
        value: 'location',
        label: 'location',
    },
];

export default function SelectSort({ value, onChange }) {
    return (
        <>
            <InputLabel>Sort by</InputLabel>
            <Select
                onChange={onChange}
                value={value}
                name='sort'
                style={{ width: '10%' }}
                margin='dense'
                // label='Sort'
                variant='outlined'
                helperText='Sort by'>
                {sorts.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}
