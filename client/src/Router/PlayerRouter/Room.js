import React, { useEffect, useState } from "react";
import styles from "../../css/ChannelAndRoom.module.css";

function Room({ socket, channelid }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.emit("player room list", channelid);
    console.log(channelid);
  }, []);

  socket.on("player room info", (rooms) => {
    console.log(rooms);
    setRooms(rooms);
  });

  const enterRoom = (roomid) => {
    socket.emit("enter room", roomid);
  };

  const RoomList = () => {
    return rooms.map((room) => {
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
    </div>
  );
}

export default Room;
