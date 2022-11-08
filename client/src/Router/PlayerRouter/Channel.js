import React, { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

function Channel({ socket, uid }) {
  const [channels, setChannels] = useState([]);
  const [listNum, setListNum] = useState(0);
  const [beforeDisable, setBeforeDisable] = useState(true);
  const [forwardDisable, setForwardDisable] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("player channel list", uid);
  }, []);

  useEffect(() => {
    if (listNum === 0) {
      setBeforeDisable(true);
    }
    if (channels.length - listNum <= 10) {
      setForwardDisable(true);
    }
  }, [listNum]);

  socket.on("player channels info", (channel) => {
    setChannels(channel);
    console.log(channel);
    if (channel.length > 10) {
      setForwardDisable(false);
    } else {
      setForwardDisable(true);
    }
  });

  const previousChannelList = () => {
    setListNum((prev) => prev - 10);
    setForwardDisable(false);
  };

  const nextChannelList = () => {
    setListNum((prev) => prev + 10);
    setBeforeDisable(false);
  };

  const enterChannel = (channelId) => {
    socket.emit("room list", channelId);
    console.log(channelId + " clicked");
    navigate("/Room");
  };

  const ChannelList = () => {
    return channels.map((item, index) => {
      if (index >= listNum && index < listNum + 10)
        return (
          <button key={item} onClick={() => enterChannel(item)}>
            <div>
              <span>Channel {index + 1}</span>
            </div>
          </button>
        );
    });
  };

  return (
    <div>
      <h1>Channels</h1>
      <ChannelList />
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

export default Channel;
