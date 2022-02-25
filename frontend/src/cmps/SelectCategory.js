import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Box } from '@mui/system';

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

export default function SelectCategory({ value, onChange, className }) {
  return (
    <Box className={className}>
      <InputLabel>Category</InputLabel>
      <Select
        onChange={onChange}
        value={value}
        style={{ width: '100%' }}
        name='category'
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
    </Box>
  );
}
