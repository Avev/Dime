import React, { useCallback, useEffect, useState } from 'react';
import {
  debounce,
  TextField,
  Input,
  Typography,
  Container,
  useTheme,
  InputLabel,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import { ItemCategories } from '../lib/ItemCategories';
import { Locations } from '../lib/Locations';
import classes from '../assets/styles/cmps/ItemFilter.module.css';

const ItemFilterFieldNames = {
  Text: 'txt',
  Price: {
    From: 'from',
    To: 'to',
  },
  Category: 'category',
  Location: 'location',
};

const ItemFilterFieldLabels = {
  Text: 'Free Text',
  Price: {
    From: 'From',
    To: 'To',
  },
  Category: 'Category',
  Location: 'Location',
};

const baseItemFilterFieldProps = {
  color: 'secondary',
  variant: 'standard',
};

const itemCategories = Object.values(ItemCategories).sort((c1, c2) => {
  return c1.value.localeCompare(c2.value);
});

const locations = Object.values(Locations).sort((l1, l2) => {
  return l1.value.localeCompare(l2.value);
});

const ItemFilter = ({ onFilter }) => {
  const [filter, setFilter] = useState({
    txt: '',
    price: {
      from: '',
      to: '',
    },
    category: '',
    location: '',
  });
  const _onFilter = useCallback(debounce(onFilter, 400), []);
  const theme = useTheme();
  
  useEffect(() => {
    _onFilter(filter);
  }, [filter]);

  // handleChange is initiated every time the user types something (onChange event).
  // it gets the 'event' object as a parameter. then we can extract the name and value from event.target - which is the input in which the event occured.
  // after extracting these, we can modify the state accordingly, the name of the input being the key of the relevant property in the object, and the value being the value of the property.
  // e.g. - txt is the name/key, 'hello' is the value of txt
  const handleChange = (ev) => {
    // Object destructuring
    let { name, value, type } = ev.target;
    if (type === 'number') {
      value = +value;
    }
    // Dynamically change only the relevant property in filterBy state.
    if (
      name === ItemFilterFieldNames.Price.From ||
      name === ItemFilterFieldNames.Price.To
    ) {
      value = {
        ...filter.price,
        [name]: value,
      };
      name = 'price';
    }
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };
  return (
    <Box
      className={classes.container}
      sx={{
        border: `1px solid ${theme.palette.text.primary}`,
        borderRadius: '.2rem',
      }}>
      <Typography className={classes.fieldSubtitle} variant='subtitle1'>
        What would you like to search?
      </Typography>
      <Box className={classes.wrapper}>
        <FreeTextField
          className={[classes.filterField]}
          value={filter.txt}
          onChange={handleChange}
        />
        <CategoryField
          className={[classes.filterField]}
          value={filter.category}
          onChange={handleChange}
        />
        <LocationField
          className={[classes.filterField]}
          value={filter.location}
          onChange={handleChange}
        />
      </Box>
      {/* <DebugView data={filterBy} /> */}
    </Box>
  );
};

const priceFieldProps = {
  from: {
    name: ItemFilterFieldNames.Price.From,
    label: ItemFilterFieldLabels.Price.From,
    type: 'number',
  },
  to: {
    name: ItemFilterFieldNames.Price.To,
    label: ItemFilterFieldLabels.Price.To,
    type: 'number',
  },
};
const PriceField = ({
  toFieldProps: restOfToFieldProps,
  fromFieldProps: restOfFromFieldProps,
}) => {
  return (
    <div>
      <TextField
        {...baseItemFilterFieldProps}
        {...priceFieldProps.from}
        {...restOfFromFieldProps}
      />
      <TextField
        {...baseItemFilterFieldProps}
        {...priceFieldProps.to}
        {...restOfToFieldProps}
      />
    </div>
  );
};

const textFieldProps = {
  label: ItemFilterFieldLabels.Text,
  name: ItemFilterFieldNames.Text,
};

const FreeTextField = ({ value, onChange, className }) => {
  return (
    <TextField
      {...baseItemFilterFieldProps}
      {...textFieldProps}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

const categoryFieldProps = {
  name: ItemFilterFieldNames.Category,
};

const CategoryField = ({ value, onChange, className }) => {
  return (
    <Box className={classes.selectContainer}>
      <InputLabel>{ItemFilterFieldLabels.Category}</InputLabel>
      <Select
        {...baseItemFilterFieldProps}
        {...categoryFieldProps}
        value={value}
        onChange={onChange}
        className={className}
        displayEmpty>
        {itemCategories.map((c) => (
          <MenuItem key={c.value} value={c.value}>
            {c.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

const locationFieldProps = {
  ...categoryFieldProps,
  name: ItemFilterFieldNames.Location,
};

const LocationField = ({ value, onChange, className }) => {
  return (
    <Box className={classes.selectContainer}>
      <InputLabel>{ItemFilterFieldLabels.Location}</InputLabel>
      <Select
        {...baseItemFilterFieldProps}
        {...locationFieldProps}
        value={value}
        displayEmpty
        onChange={onChange}
        className={className}>
        {locations.map((l) => (
          <MenuItem key={l.value} value={l.value}>
            {l.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default ItemFilter;
