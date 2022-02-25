import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { OutlinedInput } from '@mui/material';
import { ItemSorts } from '../lib/ItemSorts';

const itemSorts = Object.values(ItemSorts).sort((s1, s2) => {
  return s1.value.localeCompare(s2.value);
});

const itemSortStyles = {
  minWidth: '140px',
};
const itemSortProps = {
  name: 'sort',
  margin: 'dense',
  variant: 'standard',
};

export default function ItemSort({ value = itemSorts[0].value, onChange }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 2,
      }}>
      <InputLabel>Sort by:</InputLabel>
      <Select
        sx={itemSortStyles}
        {...itemSortProps}
        value={value}
        onChange={onChange}>
        {itemSorts.map((s) => (
          <MenuItem key={s.value} value={s.value}>
            {s.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
