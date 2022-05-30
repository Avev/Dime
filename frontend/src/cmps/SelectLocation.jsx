import { Locations } from "../lib/Locations";
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Box } from '@mui/system';

const SelectLocation = ({value, onChange, className}) => {
    return (
      <Box className={className}>
      <InputLabel fullWidth>Location</InputLabel>
      <Select
        onChange={onChange}
        value={value}
        name='location'
        margin='dense'
        label='Location'
        required
        fullWidth
        variant='standard'
        helperText='Please select your location'>
        {Object.values(Locations).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
    );
  }

  export default SelectLocation