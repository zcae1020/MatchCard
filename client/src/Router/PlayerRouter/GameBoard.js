import React, { useEffect, useState } from "react";
import style from "../../css/Game.module.css";
import Team from "./Team";

export default function GameBoard({ socket, uid, channelid, roomid }) {
  const rowIndex = [0, 1, 2, 3];
  const columnIndex = [0, 1, 2, 3, 4, 5, 6, 7];
  const [cards, setCards] = useState([
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ]);
  const [firstCard, setFirstCard] = useState([]);
  const [secondCard, setSecondCard] = useState([]);
  const [round, setRound] = useState(1);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState([0, 0, 0, 0]);
  const [myturn, setMyturn] = useState(false); //내 턴인지 확인
  const [turnUid, setTurnUid] = useState("");
  const [playing, setPlaying] = useState(true); //ture면 modal창 안나옴
  const [roomInfo, setRoomInfo] = useState([{ length: 0 }, { length: 0 }, { length: 0 }, { length: 0 }]);
  const [ready, setReady] = useState(false);
  const [gamestart, setGamestart] = useState(false);

  useEffect(() => {
    console.log(channelid, roomid);
    socket.emit("enter room", roomid, channelid, uid);
  }, []);

  socket.on("success enter room", (roomInfo) => {
    console.log("roomInfo:", roomInfo);
    setRoomInfo(roomInfo);
  });

  socket.on("start game", (player) => {
    setGamestart(true);
    setTurnUid(player);
    if (uid === player) setMyturn(true);
    else setMyturn(false);
  });

  //선택한 카드가 뒤집힘
  socket.on("success pick card", (row, column, cardNum, player) => {
    setTurnUid(player); //현재 누구 턴인지. 해당하는 사람의 uid를 저장. 해당 유저에 표시해놓기 위함
    //내 턴이라면 myturn을 true로 바꿈
    if (uid === player) setMyturn(true);
    else setMyturn(false);

    if (firstCard.length === 0) {
      setFirstCard([row, column]);
      console.log("First card clicked");
    } else {
      setSecondCard([row, column]);
      console.log("Second card clicked");
    }

    //카드 뒤집기
    setCards(
      cards.map((cardRow, rowI) => {
        return cardRow.map((cardColumn, columnI) => {
          return row === rowI && column === columnI ? cardNum : cardColumn;
        });
      })
    );
  });

  //매치가 성공하면 팀 스코어 올림
  socket.on("success match", (teamscore, team) => {
    setFirstCard([]);
    setSecondCard([]);
    setScore(
      score.map((item, index) => {
        return index === team ? teamscore : item;
      })
    );
  });

  //매치 실패 시 1.5초 후 카드 원래대로 되돌리기
  socket.on("fail match", () => {
    setTimeout(() => {
      setCards(
        cards.map((cardRow, rowI) => {
          return cardRow.map((cardColumn, columnI) => {
            return (firstCard[0] == rowI && firstCard[1] == columnI) || (secondCard[0] == rowI && secondCard[1] == columnI) ? "" : cardColumn;
          });
        })
      );
    }, 1500);
  });

  //게임 끝나면 전체 스코어 update하고 modal창 나옴
  socket.on("gameover", (teamscore) => {
    setScore(teamscore);
    setPlaying(false);
  });

  //modal 창 닫기
  const offClick = () => {
    setPlaying(true);
  };

  //라운드
  socket.on("new round", (round) => {
    setRound(round);
  });

  //시간
  socket.on("count time", (time) => {
    setTime(time);
  });

  socket.on("all match", () => {
    setCards([
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ]);
  });

  //카드 클릭 시 수행되는 함수
  const cardClick = (row, column) => {
    if (!myturn) return; //내 턴이 아니라면 함수 종료. 즉 카드 클릭이 안됨. 처음에 false로 선언해서 서버 없이 테스트해보려면 위에서 true로 바꾸어야함
    if (cards[row][column] !== "") return; //이미 뒤집혀있는 카드를 클릭한 경우 함수 종료
    console.log(row, column);

    //이거는 당장 확인용으로 넣어놓은 것. 서버와 연동하면 아래 코드는 주석처리 해야함
    // setCards(
    //   cards.map((cardRow, rowI) => {
    //     return cardRow.map((cardColumn, columnI) => {
    //       return row === rowI && column === columnI ? 1 : cardColumn;
    //     });
    //   })
    // );

    //서버로 row와 column을 보냄
    socket.emit("pick card", row, column);
    setMyturn(false);
  };

  const getReady = () => {
    setReady(!ready);
    socket.emit("ready", uid);
  };

  const changeTeam = (n) => {
    socket.emit("change team", uid, n);
  };

  //카드테이블을 관리
  const CardTable = () => {
    return (
      <table id={style.cardTable}>
        <tbody>
          {rowIndex.map((row) => {
            return (
              <tr key={row}>
                {columnIndex.map((column) => {
                  return (
                    <td key={column} onClick={() => cardClick(row, column)}>
                      {cards[row][column]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className={style.gameboard}>
      <div className={style.round}>Round: {round}</div>
      <div className={style.time}>Time: {time}</div>
      <span className={style.team_info} onClick={() => changeTeam(0)}>
        <Team socket={socket} class_Name={style.team_info_0} score={score[0]} turnUid={turnUid} teaminfo={roomInfo[0]} />
      </span>
      <span className={style.team_info} onClick={() => changeTeam(1)}>
        <Team socket={socket} class_Name={style.team_info_1} score={score[1]} turnUid={turnUid} teaminfo={roomInfo[1]} />
      </span>
      {roomInfo.length >= 3 ? (
        <span className={style.team_info} onClick={() => changeTeam(2)}>
          <Team socket={socket} class_Name={style.team_info_2} score={score[2]} turnUid={turnUid} teaminfo={roomInfo[2]} />
        </span>
      ) : null}
      {roomInfo.length >= 4 ? (
        <span className={style.team_info} onClick={() => changeTeam(3)}>
          <Team socket={socket} class_Name={style.team_info_3} score={score[3]} turnUid={turnUid} teaminfo={roomInfo[3]} />
        </span>
      ) : null}

      <section className={style.memory_game}>
        <CardTable />
      </section>

      {gamestart ? (
        <></>
      ) : (
        <button className={ready === true ? style.ready : style.getready} onClick={getReady}>
          {ready === true ? "준비완료" : "준비"}
        </button>
      )}

      {/* playing 상태를 확인하고 modal의 display를 결정. 적용되는 css가 달라짐 */}
      <div className={playing ? style.black_bg_none : style.black_bg}></div>
      <div className={playing ? style.modal_wrap_none : style.modal_wrap}>
        <div className={style.modal_close}>
          <a href="" onClick={offClick}>
            close
          </a>
        </div>
        <div className={style.modal_content}>
          SCORE
          <br />
          Team0 score: {score[0]}
          <br />
          Team1 score: {score[1]}
          <br />
          Team2 score: {score[2]}
          <br />
          Team3 score: {score[3]}
          <br />
        </div>
      </div>
    </div>
  );
}
