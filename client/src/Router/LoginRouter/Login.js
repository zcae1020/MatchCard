import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase";
import style from "../../css/Login.module.css";

const auth = getAuth(app);

function Login({ userType, socket, setUid }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [thisUid, setThisUid] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setUid(thisUid);
    if (accessToken === "" || thisUid === "") {
      return;
    } else if (userType === "admin") {
      socket.emit("admin login", accessToken, thisUid);
    } else {
      socket.emit("player login", accessToken, thisUid);
    }
  }, [accessToken, thisUid]);

  socket.on("success admin login", () => {
    navigate("/Admin");
  });
  socket.on("success player login", () => {
    navigate("/Channel");
  });

  const signin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // console.log(result);
        // console.log(result.user.accessToken);
        // console.log(result.user.displayName);
        // console.log(result.user.uid);
        // console.log(userType);
        setAccessToken(result.user.accessToken);
        setThisUid(result.user.uid);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/wrong-password":
            setErrorMessage("*비밀번호가 일치하지 않습니다.");
            break;
          case "auth/invalid-email":
            setErrorMessage("*잘못된 이메일 주소입니다");
            break;
          case "auth/user-not-found":
            setErrorMessage("*가입되지 않은 이메일입니다.");
            break;
          default:
            console.log(error);
        }

        console.log(error);
      });
  };

  const onChange = (e) => {
    if (e.target.id === "textfield-id") setEmail(e.target.value);
    else setPassword(e.target.value);
    // console.log(email);
    // console.log(password);
  };

  const onClick = (e) => {
    e.preventDefault();
    signin();
  };

  return (
    <div className={style.div_login}>
      <Box
        className={style.div_box_login}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="textfield-id" label="E-MAIL" variant="standard" onChange={onChange} />
        <TextField id="textfield-password" label="PASSWORD" variant="standard" type="password" onChange={onChange} />
        <button className={style.box_login_button} onClick={onClick}>
          login
        </button>
      </Box>
      <p className={style.errorMessage}>{errorMessage}</p>
      <p>
        <Link to={userType === "player" ? "/PlayerSignUp" : "/AdminSignUp"} className={style.signup_link}>
          signup
        </Link>
      </p>
    </div>
  );
}

export default Login;
