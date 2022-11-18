import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../../css/Login.module.css";

function SignUpSuccess({ userType }) {
  const navigate = useNavigate();
  const onClick = () => {
    if (userType === "admin") navigate("/AdminLogin");
    else navigate("/");
  };

  return (
    <div>
      <h1>회원가입에 성공했습니다!</h1>
      <p className={style.toLogin} onClick={onClick}>
        로그인 화면으로 돌아가기
      </p>
    </div>
  );
}

export default SignUpSuccess;
