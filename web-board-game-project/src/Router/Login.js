import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from '../css/Login.module.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
  };

  const onChange = (e) => {
    if (e.target.id === 'textfield-id') setEmail(e.target.value);
    else setPassword(e.target.value);

    console.log(email);
    console.log(password);
  };

  const onClick = (e) => {
    e.preventDefault();
    signup();
  };

  return (
    <div>
      <h1>Match Card Game</h1>
      <div className={styles.div_login}>
        <Box
          className={styles.div_box_login}
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="textfield-id"
            label="ID"
            variant="standard"
            onChange={onChange}
          />
          <TextField
            id="textfield-password"
            label="PASSWORD"
            variant="standard"
            type="password"
            onChange={onChange}
          />
          <button onClick={onClick}>login</button>
        </Box>

        <a href="https://www.naver.com">sign up</a>
      </div>
    </div>
  );
}

export default Login;
