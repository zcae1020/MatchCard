import React from "react";
import SignUpSuccess from "./SignUpSuccess";

function AdminSignUpSuccess() {
  const userType = "admin";
  return <SignUpSuccess userType={userType} />;
}

export default AdminSignUpSuccess;
