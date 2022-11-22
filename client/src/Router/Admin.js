import React, { useEffect, useState } from "react";
import "../css/Common.css";
import styles from "../css/ChannelAndRoom.module.css";
import login_style from "../css/Login.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
// import Typography from '@mui/material/Typography';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 170,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Admin({ socket, uid }) {
  const [channels, setChannels] = useState([]);
  const [maxRoom, setMaxRoom] = useState();
  const [maxTeam, setMaxTeam] = useState();
  const [errorMessage, setErrorMessage] = useState("");
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

  socket.on("success admin channel list", (channel) => {
    console.log(channel);
    setChannels(channel);
    setErrorMessage("");
  });

  const changeMaxRoom = (e) => {
    setMaxRoom(e.target.value);
  };

  const changeMaxTeam = (e) => {
    setMaxTeam(e.target.value);
  };

  const createChannel = (e) => {
    if (maxRoom === undefined) {
      setErrorMessage("*MaxRoom을 입력해주세요");
    } else if (maxTeam === undefined) {
      setErrorMessage("*MaxTeam을 입력해주세요");
    } else if (isNaN(maxRoom) || isNaN(maxTeam)) {
      setErrorMessage("*숫자를 입력해주세요");
    } else if (maxRoom <= 0) {
      setErrorMessage("*maxRoom은 1 이상의 숫자를 입력해주세요");
    } else if (maxTeam < 2 || maxTeam > 4) {
      setErrorMessage("*maxTeam은 2 이상 4 이하의 숫자를 입력해주세요");
    } else {
      console.log(uid, maxRoom, maxTeam);
      socket.emit("create channel", uid, maxRoom, maxTeam);
      setOpen((prev) => !prev);
    }
  };

  const deleteChannel = (channelId) => {
    console.log(channelId);
    socket.emit("delete channel", uid, channelId);
  };

  const ChannelList = () => {
    return channels.map((item, index) => (
      <div key={item}>
        <h2>Channel {index + 1}</h2>
        <div
          className={styles.channel_delete}
          onClick={() => {
            deleteChannel(item);
          }}
        >
          삭제
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.list}>
      <h1>Channel List</h1>
      <div className={styles.channel_plus} onClick={handleOpen}>
        채널 추가
      </div>
      <Modal open={open} onClose={handleClose} className={styles.modal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h2 id="modal-modal-title" variant="h6" component="h2">
            채널 추가
          </h2>
          <TextField id="standard-basic" label="MaxRoom" variant="standard" onChange={changeMaxRoom} />
          <TextField id="standard-basic" label="MaxTeam" variant="standard" onChange={changeMaxTeam} />
          <p className={login_style.errorMessage}>{errorMessage}</p>
          <Button onClick={createChannel}>Apply</Button>
        </Box>
      </Modal>
      <ChannelList />
    </div>
  );
}

export default Admin;
