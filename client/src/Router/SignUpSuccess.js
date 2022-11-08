import React from "react";
import { useNavigate } from "react-router-dom";

function SignUpSuccess() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>회원가입에 성공했습니다!</h1>
      <button onClick={onClick}>로그인 화면으로 돌아가기</button>
    </div>
  );
}

export default SignUpSuccess;
