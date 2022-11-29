import React, { useEffect, useState } from "react";
import style from "../../css/Game.module.css";

export default function Team({ socket, class_Name, score, turnUid, teamInfo }) {
  const [uids, setUids] = useState([]);
  const [userName, setUserName] = useState([]);

  useEffect(() => {
    if (teamInfo !== undefined) {
      setUids(
        teamInfo.users.map((user) => {
          return user.uid;
        })
      );
    }
  }, []);

  useEffect(() => {
    socket.emit("get username by uid", uids);
  }, [uids]);

  socket.on("");

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
    </div>
  );
}
