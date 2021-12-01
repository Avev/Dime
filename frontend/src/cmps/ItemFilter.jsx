import { Container, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import styled from 'styled-components';

const ItemFilter = ({}) => {
  const [filterBy, setFilterBy] = useState({
    txt: '',
    price: {
      from: 0,
      to: 0,
    },
  });

  // handleChange is initiated every time the user types something (onChange event).
  // it gets the 'event' object as a parameter. then we can extract the name and value from event.target - which is the input in which the event occured.
  // after extracting these, we can modify the state accordingly, the name of the input being the key of the relevant property in the object, and the value being the value of the property.
  // e.g. - txt is the name/key, 'hello' is the value of txt
  const handleChange = (ev) => {
    // Object destructuring
    const { name, value } = ev.target;

    // Dynamically change only the relevant property in filterBy state.
    setFilterBy((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <TextField
          label='Free Text'
          color='secondary'
          name='txt'
          value={filterBy.txt}
          onChange={handleChange}
        />
        <PriceFilter price={filterBy.price} />
      </Box>
      {
        //debug mode
        // only shows up in dev env
        process.env.NODE_ENV === 'development' && (
          <pre>{JSON.stringify(filterBy, null, 2)}</pre>
        )
      }
    </>
  );
};

const PriceFilter = ({ price }) => {
  return (
    <Container>
      <TextField label='from' />
      <TextField label='to' />
    </Container>
  );
};

export default ItemFilter;
