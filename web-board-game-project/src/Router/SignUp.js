import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from '../css/Login.module.css';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import app from '../firebase';

const auth = getAuth(app);

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: userName,
      });
      console.log(auth.currentUser);
      console.log(userName);
      navigate('/Channel');
    } catch (error) {
      switch (error.code) {
        case 'auth/weak-password':
          setErrorMessage('*비밀번호는 6자리 이상이어야 합니다');
          break;
        case 'auth/invalid-email':
          setErrorMessage('*잘못된 이메일 주소입니다');
          break;
        case 'auth/email-already-in-use':
          setErrorMessage('*이미 가입되어 있는 계정입니다');
          break;
      }
    }
  };

  const onChange = (e) => {
    if (e.target.id === 'textfield-id') setEmail(e.target.value);
    else if (e.target.id === 'textfield-userName') setUserName(e.target.value);
    else if (e.target.id === 'textfield-password') setPassword(e.target.value);
    else setRepeatedPassword(e.target.value);

    console.log(email);
    console.log(password);
    console.log(repeatedPassword);
    console.log(userName);
  };

  const onClick = (e) => {
    e.preventDefault();
    if (password !== repeatedPassword) {
      setErrorMessage('*입력하신 비밀번호가 일치하지 않습니다.');
    } else signup();
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
            id="textfield-userName"
            label="USERNAME"
            variant="standard"
            onChange={onChange}
          />
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
          <TextField
            id="textfield-repeatPassword"
            label="REPEAT PASSWORD"
            variant="standard"
            type="password"
            onChange={onChange}
          />
          <button className={styles.box_login_button} onClick={onClick}>
            sign up
          </button>
        </Box>
        <p className={styles.errorMessage}>{errorMessage}</p>
      </div>
    </div>
  );
}

export default SignUp;
