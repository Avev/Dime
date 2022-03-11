import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SelectCategory from './SelectCategory';
import UploadButton from './UploadButton';
import { itemService } from '../services/itemService';
import classes from '../assets/styles/cmps/ItemAdd.module.css';
import { useRef } from 'react';
import { useTheme } from '@mui/material';

const EMPTY_FORM_DATA = {
  title: '',
  category: 'furniture',
  location: '',
  description: '',
  phone: '',
  image: null,
};

const DEV_TEST_DATA = {
  title: 'Yarden test',
  category: 'furniture',
  location: 'petahTikva',
  description: 'Testing',
  phone: '0542487955',
  image: null,
};

export default function ItemAdd(user) {
  const [open, setOpen] = React.useState(false);
  const [itemToAdd, setItemToAdd] = React.useState(DEV_TEST_DATA);
  const { palette } = useTheme();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      await itemService.add(itemToAdd);
    } catch (err) {
      console.error('err: ', err);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (ev) => {
    let { value, name, type, files } = ev.target;
    if (type === 'file') {
      value = files[0];
    }
    itemToAdd.userId = user.user._id;
    const updatedFormData = { ...itemToAdd, [name]: value };
    setItemToAdd(updatedFormData);
  };

  const handleClickLogin = () => {
    window.open('http://localhost:3030/auth/google', '_self');
  };

  return (
    <div>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => {
          if (user.user) {
            handleClickOpen();
          } else {
            handleClickLogin();
          }
        }}>
        Add item
      </Button>
      <Dialog className={classes.dialog} open={open} onClose={handleClose}>
        <DialogTitle sx={{ borderBottom: `2px solid ${palette.primary.main}` }}>
          Add item
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Write your listing details here</DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.itemAddField}
              name='title'
              value={itemToAdd.title}
              onChange={handleChange}
              autoFocus
              required
              margin='dense'
              label='Title'
              type='text'
              fullWidth
              variant='standard'
            />
            <SelectCategory
              value={itemToAdd.category}
              onChange={handleChange}
              className={[classes.itemAddField, classes.selectCategory]}
            />
            <TextField
              className={classes.itemAddField}
              name='location'
              value={itemToAdd.location}
              onChange={handleChange}
              autoFocus
              required
              margin='dense'
              label='Location'
              type='text'
              fullWidth
              variant='standard'
            />
            <TextField
              className={classes.itemAddField}
              name='description'
              value={itemToAdd.description}
              onChange={handleChange}
              autoFocus
              margin='dense'
              label='Description'
              type='text'
              fullWidth
              multiline
              rows={4}
              variant='standard'
            />
            <TextField
              className={classes.itemAddField}
              name='phone'
              value={itemToAdd.phone}
              onChange={handleChange}
              autoFocus
              required
              margin='dense'
              label='Phone number'
              type='text'
              fullWidth
              variant='standard'
            />
            <UploadButton onChange={handleChange} name='image' />
            <DialogActions>
              <Button color='warning' onClick={handleClose}>
                Cancel
              </Button>
              <Button color='secondary' type='submit'>
                Post
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      </Dialog>
    </div>
  );
}
