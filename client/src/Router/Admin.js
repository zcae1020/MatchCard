import React, { useEffect, useState } from 'react';
import styles from '../css/ChannelAndRoom.module.css';

function Admin({ socket }) {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    socket.emit('show me admin info');
  }, []);

  socket.on('admin info', ({ channel }) => {
    setChannels((channels) => [...channels, channel]);
    console.log('good?');
    console.log(channels);
  });

  return (
    <div>
      <h1>I'm admin!</h1>
      {channels.map((item) => {
        return (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <h3>{item.id}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Admin;
