import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "../../css/ChannelAndRoom.module.css";

function Room({ socket, channelid }) {
  const [rooms, setRooms] = useState([]);
  const [listNum, setListNum] = useState(0);
  const [beforeDisable, setBeforeDisable] = useState(true);
  const [forwardDisable, setForwardDisable] = useState(true);

  useEffect(() => {
    socket.emit("player room list", channelid);
    console.log(channelid);
  }, []);

  socket.on("player room info", (rooms) => {
    console.log(rooms);
    setRooms(rooms);
    if (rooms.length > 6) {
      setForwardDisable(false);
    } else {
      setForwardDisable(true);
    }
  });

  useEffect(() => {
    if (listNum === 0) {
      setBeforeDisable(true);
    }
    if (rooms.length - listNum <= 6) {
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

  const enterRoom = (roomid) => {
    socket.emit("enter room", roomid);
  };

  const RoomList = () => {
    return rooms.map((room, index) => {
      if (index >= listNum && index < listNum + 6)
        return (
          <div key={room.roomid} className={styles.roomBox}>
            <span>Room {room.roomid}</span>
            <span>{room.state ? <button disabled={true}>게임중</button> : <button onClick={() => enterRoom(room.roomid)}>입장하기</button>}</span>
          </div>
        );
    });
  };

  return (
    <div>
      <h1>Room</h1>
      <div className={styles.roomList}>
        <RoomList />
      </div>
      <span>
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
