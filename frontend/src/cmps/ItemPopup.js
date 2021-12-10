import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as path from "path";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ItemPopup({item}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>View more</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {item.title}
                    </Typography>
                    <Typography>
                        {item.category}, {item.location}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Contact Info: {item.phone}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Description:
                    </Typography>
                    <Typography id="modal-modal-description">
                        {item.description}
                    </Typography>
                    <Typography sx={{mt: 2}}>
                        last update {item.updatedAt.split('T')[0]}
                    </Typography>
                    <img
                        src={window.location.origin + '/images/' + item.image}
                        alt={item.image}
                        height='180'
                        align='right'
                        >
                    </img>
                </Box>
            </Modal>
        </div>
    );
}
