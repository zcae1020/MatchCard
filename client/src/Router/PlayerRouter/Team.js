import React, { useEffect, useState } from "react";
import style from "../../css/Game.module.css";

export default function Team({ socket, class_Name, score, turnUid, teaminfo }) {
  const [uids, setUids] = useState([]);
  const [userName, setUserName] = useState([]);
  const [team, setTeam] = useState({});
  // const userName = ["김준하", "나주영", "홍성표"];

  useEffect(() => {
    if (teaminfo !== null) {
      console.log(teaminfo);
      setUids(
        teaminfo.users.map((user) => {
          return user.uid;
        })
      );
      setTeam(teaminfo);
    } else {
      console.log(teaminfo);
    }
  }, [teaminfo]);

  // const click = () => {
  //   if (team === null) return;
  //   socket.emit("get username by uid", uids, team.teamId);
  //   console.log("보내는 uids 배열 정보:", uids);
  //   console.log("보내는 teamId:", team.teamId);
  // };

  useEffect(() => {
    if (team === null) return;
    if (uids === null) return;
    socket.emit("get username by uid", uids, team.teamId);
  }, [uids, team]);

  socket.on("success get username by uid", (ret, teamId) => {
    console.log("받은 username:", ret);
    console.log("before");
    console.log("갖고있는 teamId:", team.teamId);
    console.log("medium");
    console.log("받은 teamId:", teamId);
    console.log("last");
    if (team.teamId === teamId) {
      setUserName(ret);
      console.log("userName useState");
    }
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
      {/* <button onClick={click}>123123123123</button> */}
    </div>
  );
}
