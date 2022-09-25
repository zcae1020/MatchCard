import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from '../css/Login.module.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase';

const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState();

  const signin = async () => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log(auth.currentUser.getIdToken());
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
    signin();
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
          <button className={styles.box_login_button} onClick={onClick}>
            login
          </button>
        </Box>

        <p>
          <Link to={'SignUp'}>signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
