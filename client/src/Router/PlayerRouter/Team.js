import React, { useEffect, useState } from "react";
import style from "../../css/Game.module.css";

export default function Team({ socket, class_Name, score, turnUid, teamInfo }) {
  const [uids, setUids] = useState([]);
  // const [userName, setUserName] = useState([]);
  const userName = ["김준하", "나주영", "홍성표"];

  useEffect(() => {
    if (teamInfo !== null) {
      console.log(teamInfo);
      setUids(
        teamInfo.users.map((user) => {
          return user.uid;
        })
      );
    } else {
      console.log(teamInfo);
    }
  }, [teamInfo]);

  const click = () => {
    socket.emit("get username by uid", uids);
    console.log("보내는 uids 배열 정보:", uids);
  };

  socket.on("success get username by uid", (ret) => {
    console.log("받은 username:", ret);
  });

  const UserInfo = (n) => {
    if (userName.length < n) {
      return "empty";
    } else {
      return userName[n - 1];
    }
  };

  return (
    <div className={class_Name}>
      <div className={style.score}>TeamScore: {score}</div>
      <table>
        <tbody>
          <tr>
            <td>{UserInfo(1)}</td>
            <td>{UserInfo(2)}</td>
          </tr>
          <tr>
            <td>{UserInfo(3)}</td>
            <td>{UserInfo(4)}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={click}>123123123123</button>
    </div>
  );
}
