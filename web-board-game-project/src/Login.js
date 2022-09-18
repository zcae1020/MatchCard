import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from './css/Login.module.css';

function Login() {
  return (
    <div>
      <h1>Game Title</h1>
      <Box
        className={styles.box_login}
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="textfield-id" label="ID" variant="standard" />
        <TextField
          id="textfield-password"
          label="PASSWORD"
          variant="standard"
          type="password"
        />
      </Box>
      <a href="https://www.naver.com">sign up</a>
    </div>
  );
}

export default Login;
