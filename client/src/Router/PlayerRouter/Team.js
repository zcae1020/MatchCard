import React from "react";
import style from "../../css/Game.module.css";

export default function Team({ class_Name, score, turnUid }) {
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
