import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SelectCategory from "./SelectCategory";
import UploadButton from "./UploadButton";


export default function ItemAdd() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Add item
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Write your listing details here
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <SelectCategory/>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="location"
                        label="Location"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="phone number"
                        label="Phone number"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <UploadButton/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Post</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
