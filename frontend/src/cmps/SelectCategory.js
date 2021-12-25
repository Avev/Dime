import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const categories = [
  {
    value: 'furniture',
    label: 'Furniture',
  },
  {
    value: 'electronics',
    label: 'Electronics',
  },
  {
    value: 'clothes',
    label: 'Clothes',
  },
  {
    value: 'books/media',
    label: 'Books/Media',
  },
  {
    value: 'sports',
    label: 'Sports',
  },
  {
    value: 'games',
    label: 'Games',
  },
  {
    value: 'lifestyle',
    label: 'Lifestyle',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

export default function SelectCategory({ value, onChange }) {
  return (
    <>
      <InputLabel>Category</InputLabel>
      <Select
        onChange={onChange}
        value={value}
        name='category'
        style={{ width: '20%' }}
        margin='dense'
        label='Category'
        required
        variant='standard'
        helperText='Please select your category'>
        {categories.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
