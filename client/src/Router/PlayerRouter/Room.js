import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import style from "../../css/ChannelAndRoom.module.css";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

function Room({ socket, channelid, uid, setRoomid }) {
  // const [connection, setConnection] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [listNum, setListNum] = useState(1);
  const [beforeDisable, setBeforeDisable] = useState(true);
  const [forwardDisable, setForwardDisable] = useState(true);

  const navigate = useNavigate();

  // socket_channel.on("channel connected", () => {
  //   setConnection(true);
  // });

  const socket_channel = io(`http://localhost:3001/${channelid}`);
  // socket_channel.on("channel connected", () => {
  //   console.log("channel connected!!!!");
  // });

  useEffect(() => {
    // if (connection === true) {
    socket.emit("room list", channelid, uid);
    console.log(channelid);
    console.log(uid);
    // }
  }, []);

  useEffect(() => {
    if (rooms.length > 6) {
      setForwardDisable(false);
    } else {
      setForwardDisable(true);
    }
  }, [rooms]);

  socket.on("success room list", (rooms) => {
    console.log(rooms);
    setRooms(Object.keys(rooms).map((item) => rooms[item]));
  });

  useEffect(() => {
    if (listNum === 1) {
      setBeforeDisable(true);
    }
    if (rooms.length - listNum <= 5) {
      setForwardDisable(true);
    }
  }, [listNum]);

  const previousChannelList = () => {
    setListNum((prev) => prev - 6);
    setForwardDisable(false);
  };

  const nextChannelList = () => {
    setListNum((prev) => prev + 6);
    setBeforeDisable(false);
  };

  const enterRoom = (roomId) => {
    // socket.emit("enter room", roomId, channelid, uid);
    setRoomid(roomId);
    console.log(roomId);
    console.log(channelid);
    console.log(uid);
    navigate("/Game");
  };

  const RoomList = () => {
    return rooms.map((room, index) => {
      if (index >= listNum - 1 && index < listNum + 5)
        return (
          <div
            key={room.roomId}
            className={parseInt(rooms.length / listNum) <= 1 && parseInt(rooms.length % listNum) === 0 ? style.room_box_one : style.room_box}
          >
            <span className={style.room_num}>Room {room.roomId + 1}</span>
            <span>
              {room.userCnt}/{room.maxTeam * 4}
            </span>
            {room.state ? (
              <button className={style.room_enter} disabled={true}>
                게임중
              </button>
            ) : room.userCnt >= room.maxTeam * 4 ? (
              <button className={style.room_enter} disabled={true}>
                입장하기
              </button>
            ) : (
              <button className={style.room_enter} onClick={() => enterRoom(room.roomId)}>
                입장하기
              </button>
            )}
          </div>
        );
    });
  };

  return (
    <div className={style.room}>
      <h1>Room</h1>
      <div className={style.room_list}>
        <RoomList />
      </div>
      <span className={style.arrow}>
        <button disabled={beforeDisable} onClick={previousChannelList}>
          <ArrowBackIosNewIcon fontSize="small" />
        </button>
        <button disabled={forwardDisable} onClick={nextChannelList}>
          <ArrowForwardIosIcon fontSize="small" />
        </button>
      </span>
    </div>
  );
}

export default Room;
