import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function LoginButtons(user) {
    console.log(user.user)
    let buttonName = 'Login'
    if(user.user){
        buttonName = 'Logout';
    }

    const handleClickLogin = () => {
        window.open('http://localhost:3030/auth/google', '_self')
    }

    const handleClickLogOut = () => {
        window.open('http://localhost:3030/auth/logout', '_self')
    }

    return (
        <Stack spacing={2} direction="row">
            <Button
                variant="contained"
                color="error"
                onClick={() => {
                    if(!user.user) {
                        handleClickLogin()
                    }
                    else {
                        handleClickLogOut()
                    }
                }}
            >${buttonName}
            </Button>
        </Stack>
    );
}
