import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "../../css/Login.module.css";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../../firebase";
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';

const auth = getAuth(app);

function SignUp({ userType, socket }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  // const [accessToken, setAccessToken] = useState("");
  const [uid, setUid] = useState("");
  const [userName, setUserName] = useState("");
  const [group, setGroup] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [userType, setUserType] = React.useState('player');

  const navigate = useNavigate();

  // const handleChange = (event) => {
  //   setUserType(event.target.value);
  // };

  // useEffect(() => {
  // 	if (accessToken === "" || uid === "" || group === "") {
  // 		return;
  // 	}
  // 	// else if (userType === 'admin') {
  // 	//   socket.emit('admin signup', { email, password, userName, group });
  // 	//   socket.emit('admin login', { accessToken, uid });
  // 	//   socket.on('success', () => {
  // 	//     navigate('/Admin');
  // 	//   });
  // 	// }
  // 	else {
  // socket.emit("player signup", { email, password, userName, group });
  // signOut(auth);
  // socket.on("success", () => {
  // 	navigate("/Channel");
  // });
  // 	}
  // }, [accessToken, uid]);

  useEffect(() => {
    if (email === "" || password === "" || userName === "" || uid === "" || group === "") {
      return;
    } else if (userType === "player") {
      socket.emit("player signup", email, password, userName, group, uid);
    } else {
      socket.emit("admin signup", email, password, userName, group, uid);
    }
  }, [uid]);

  socket.on("success player signup", () => {
    signOut(auth).then(() => {
      navigate("/PlayerSignUpSuccess");
    });
  });
  socket.on("success admin signup", () => {
    signOut(auth).then(() => {
      navigate("/AdminSignUpSuccess");
    });
  });
  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((result) => {
        console.log(auth.currentUser);
        updateProfile(auth.currentUser, {
          displayName: userName,
        });
        setUid(auth.currentUser.uid);
      });
      // setAccessToken(auth.currentUser.accessToken);
      // setUid(auth.currentUser.uid);
    } catch (error) {
      switch (error.code) {
        case "auth/weak-password":
          setErrorMessage("*비밀번호는 6자리 이상이어야 합니다");
          break;
        case "auth/invalid-email":
          setErrorMessage("*잘못된 이메일 주소입니다");
          break;
        case "auth/email-already-in-use":
          setErrorMessage("*이미 가입되어 있는 계정입니다");
          break;
        default:
          console.log(error);
          break;
      }
    }
  };

  const onChange = (e) => {
    if (e.target.id === "textfield-id") setEmail(e.target.value);
    else if (e.target.id === "textfield-userName") setUserName(e.target.value);
    else if (e.target.id === "textfield-password") setPassword(e.target.value);
    else if (e.target.id === "textfield-group") setGroup(e.target.value);
    else setRepeatedPassword(e.target.value);
    console.log(email);
    console.log(password);
    console.log(userName);
    console.log(group);
  };

  const onClick = (e) => {
    e.preventDefault();
    if (password !== repeatedPassword) {
      setErrorMessage("*입력하신 비밀번호가 일치하지 않습니다.");
    } else if (userName === "") {
      setErrorMessage("*이름을 입력해주세요");
    } else if (email === "") {
      setErrorMessage("*이메일을 입력해주세요");
    } else if (password === "") {
      setErrorMessage("*패스워드를 입력해주세요");
    } else if (group === "") {
      setErrorMessage("*그룹을 입력해주세요");
    } else signup();
  };

  return (
    <div>
      {/* <h1>Match Card Game</h1> */}
      <div className={styles.div_login}>
        <Box
          className={styles.div_box_login}
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {/* <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              value={userType}
              onChange={handleChange}
              className={styles.radio_userType}
            >
              <FormControlLabel
                value="player"
                control={<Radio />}
                label="Player"
                labelPlacement="top"
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
                labelPlacement="top"
              />
            </RadioGroup>
          </FormControl> */}
          <TextField id="textfield-userName" label="USERNAME" variant="standard" onChange={onChange} />
          <TextField id="textfield-id" label="E-MAIL" variant="standard" onChange={onChange} />
          <TextField id="textfield-password" label="PASSWORD" variant="standard" type="password" onChange={onChange} />
          <TextField id="textfield-repeatPassword" label="REPEAT PASSWORD" variant="standard" type="password" onChange={onChange} />
          <TextField id="textfield-group" label="GROUP" variant="standard" onChange={onChange} />
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
