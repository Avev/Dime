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

const EMPTY_FORM_DATA = {
  title: '',
  category: 'furniture',
  location: '',
  description: '',
  phone: '',
  image: '',
};

const DEV_TEST_DATA = {
  title: 'Yarden test',
  category: 'furniture',
  location: 'petah tikva',
  description: 'Testing',
  phone: '0542487955',
  image: '',
};

export default function ItemAdd() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState(EMPTY_FORM_DATA);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      await itemService.add(formData);
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
    const value =
      ev.target.type === 'file' ? ev.target.files[0] : ev.target.value;

    const updatedFormData = { ...formData, [ev.target.name]: value };
    setFormData(updatedFormData);
  };

  return (
    <div>
      <Button variant='contained' color='secondary' onClick={handleClickOpen}>
        Add item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add item</DialogTitle>
        <DialogContent>
          <DialogContentText>Write your listing details here</DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              name='title'
              value={formData.title}
              onChange={handleChange}
              autoFocus
              required
              margin='dense'
              label='Title'
              type='text'
              fullWidth
              variant='standard'
            />
            <SelectCategory value={formData.category} onChange={handleChange} />
            <TextField
              name='location'
              value={formData.location}
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
              name='description'
              value={formData.description}
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
              name='phone'
              value={formData.phone}
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
              <Button onClick={handleClose}>Cancel</Button>
              <Button type='submit'>Post</Button>
            </DialogActions>
          </form>
        </DialogContent>
        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      </Dialog>
    </div>
  );
}
