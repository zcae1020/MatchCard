import React, { useEffect, useState } from "react";
import style from "../../css/Game.module.css";

export default function Team({ socket, class_Name, score, turnUid, teamInfo }) {
  const [uids, setUids] = useState([]);
  const [userName, setUserName] = useState([]);

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
  };

  socket.on("success get username by uid", (ret) => {
    console.log(ret);
  });

  return (
    <div className={class_Name}>
      <div className={style.score}>TeamScore: {score}</div>
      <table>
        <tbody>
          <tr>
            <td>user1</td>
            <td>user2</td>
          </tr>
          <tr>
            <td>user3</td>
            <td>user4</td>
          </tr>
        </tbody>
      </table>
      <button onClick={click}>123123123123</button>
    </div>
  );
}
