import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";

export default function LoginButtons() {
    // const [user, setUser] = React.useState(null);
    // const [buttonName, setButtonName] = React.useState('Login');

    const handleClickLogin = () => {
        window.open('http://localhost:3030/auth/google', '_self')
        // fetch('http://localhost:3030/auth/login/success', {
        //     method: "GET",
        //     credentials: 'include',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Credentials': true,
        //     },
        // })
        //     .then(response => {
        //         if (response.status === 200) return response.json();
        //         throw new Error("failed");
        //     })
        //     .then(resObject => {
        //     setUser(resObject.user);
        //     setButtonName('Logout')
        // })
        // const userInfo = axios.get('http://localhost:3030/auth/login/success')
        //     .then((res) => {
        //         if(res.status===200) {
        //             console.log('res.json()');
        //         }
        //     })
        // userService.login().then((user) => {
        //     console.log(user);
        //     setUser(user);
        //     console.log(user);
        // })
    }

    // const handleClickLogOut = () => {
    //     axios.get('http://localhost:3030/auth/logout').then(() => {
    //         setUser(null);
    //         setButtonName('Login')
    //     })
    // }

    return (
        <Stack spacing={2} direction="row">
            <Button
                variant="contained"
                color="error"
                onClick={() => {
                    // if(!user) {
                        handleClickLogin()
                    // }
                    // else {
                    //     handleClickLogOut()
                    // }
                }}
            >Login
            </Button>
        </Stack>
    );
}
