import React, { useEffect, useState } from 'react';
import styles from '../css/ChannelAndRoom.module.css';

function Admin({ socket }) {
  const [channels, setChannels] = useState([]);
  const [channelIds, setChannelIds] = useState([]);

  useEffect(() => {
    socket.emit('show me admin info');
    socket.on('admin channels info', ({ channel }) => {
      setChannels([]);
      setChannelIds([]);
      Object.keys(channel).map((item) => {
        setChannels((prevState) => [...prevState, item]);
        setChannelIds((prevState) => [...prevState, channel[item].id]);
      });
    });
  }, []);
  useEffect(() => {
    console.log(channels);
    console.log(channelIds);
  }, [channels, channelIds]);

  return (
    <div>
      <h1>I'm admin!</h1>
    </div>
  );
}

export default Admin;
