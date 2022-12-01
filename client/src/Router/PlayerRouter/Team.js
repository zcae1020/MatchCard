import React, { useEffect, useState } from "react";
import style from "../../css/Game.module.css";

export default function Team({ socket, class_Name, score, turnUid, teaminfo }) {
  const [uids, setUids] = useState([]);
  const [userName, setUserName] = useState([]);
  const [team, setTeam] = useState({});
  const [readyState, setReadyState] = useState([false, false]);
  // const userName = ["김준하", "나주영", "홍성표"];

  useEffect(() => {
    setTeam(teaminfo);
    if (teaminfo.length !== 0) {
      console.log(teaminfo);
      setUids(
        teaminfo.users.map((user) => {
          return user.uid;
        })
      );
      setReadyState(
        teaminfo.users.map((user) => {
          return user.ready;
        })
      );
    } else {
      console.log(teaminfo);
      setUids([]);
      setUserName([]);
    }
  }, [teaminfo]);

  useEffect(() => {
    if (team.length === 0) return;
    if (uids.length === 0) return;
    socket.emit("get username by uid", uids, team.teamId);
  }, [uids, team]);

  socket.on("success get username by uid", (ret, teamId) => {
    if (team.teamId === teamId) {
      setUserName(ret);
    }
  });

  const UserInfo = (n) => {
    if (userName.length < n) {
      return "";
    } else {
      return userName[n - 1];
    }
  };

  const turn = (n) => {
    if (userName.length <= n) {
      return null;
    } else if (uids[n] === turnUid) {
      console.log("myturn");
      return style.turn_user;
    } else {
      return null;
    }
  };

  return (
    <div className={class_Name}>
      <div className={style.score}>TeamScore: {score}</div>
      <table>
        <tbody>
          <tr>
            <td className={readyState[0] === true ? style.ready_user : turn(0)}>{UserInfo(1)}</td>
            <td className={readyState[1] === true ? style.ready_user : turn(1)}>{UserInfo(2)}</td>
          </tr>
          <tr>
            <td className={readyState[2] === true ? style.ready_user : turn(2)}>{UserInfo(3)}</td>
            <td className={readyState[3] === true ? style.ready_user : turn(3)}>{UserInfo(4)}</td>
          </tr>
        </tbody>
      </table>
      {/* <button onClick={click}>123123123123</button> */}
    </div>
  );
}
