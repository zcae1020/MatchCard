import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from '../css/Login.module.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase';
import { style } from '@mui/system';

const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const signin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user.accessToken);
        console.log(result.user.displayName);
        navigate('/Channel');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/wrong-password':
            setErrorMessage('*비밀번호가 일치하지 않습니다.');
            break;
          case 'auth/invalid-email':
            setErrorMessage('*잘못된 이메일 주소입니다');
            break;
          case 'auth/user-not-found':
            setErrorMessage('*가입되지 않은 이메일입니다.');
            break;
        }

        console.log(error);
      });
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
            label="E-MAIL"
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
        <p className={styles.errorMessage}>{errorMessage}</p>
        <p>
          <Link to={'/SignUp'}>signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
