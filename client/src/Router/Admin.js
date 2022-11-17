import React, { useEffect, useState } from "react";
import "../css/Common.css";
import styles from "../css/ChannelAndRoom.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 150,

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Admin({ socket, uid }) {
  const [channels, setChannels] = useState([]);
  const [maxRoom, setMaxRoom] = useState(0);
  const [maxTeam, setMaxTeam] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    socket.emit("admin channel list", uid);
    // socket.on('admin channels info', ({ channel }) => {
    //   setChannels([]);
    //   setChannelIds([]);
    //   Object.keys(channel).map((item) => {
    //     setChannels((prevState) => [...prevState, item]);
    //     setChannelIds((prevState) => [...prevState, channel[item].id]);
    //   });
    // });
  }, []);

  socket.on("admin channels info", (channel) => {
    console.log(channel);
    setChannels(channel);
  });

  const changeMaxRoom = (e) => {
    setMaxRoom(e.target.value);
  };

  const changeMaxTeam = (e) => {
    setMaxTeam(e.target.value);
  };

  const createChannel = () => {
    socket.emit("create channel", uid, maxRoom, maxTeam);
  };

  const deleteChannel = (channelId) => {
    console.log(channelId);
    socket.emit("delete channel", channelId);
  };

  const ChannelList = () => {
    return channels.map((item, index) => (
      <div key={item}>
        <p>Channel {index + 1}</p>
        <button
          onClick={() => {
            deleteChannel(item);
          }}
        >
          채널 삭제하기
        </button>
      </div>
    ));
  };

  return (
    <div>
      <h1>Channel List</h1>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            채널 추가
          </Typography>
          <TextField id="standard-basic" label="MaxRoom" variant="standard" onChange={changeMaxRoom} />
          <TextField id="standard-basic" label="MaxTeam" variant="standard" onChange={changeMaxTeam} />
          <Button onClick={createChannel}>Apply</Button>
        </Box>
      </Modal>
      <ChannelList />
    </div>
  );
}

export default Admin;
