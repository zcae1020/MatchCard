import { style } from '@mui/system';
import React from 'react';
import styles from '../css/ChannelAndRoom.module.css';

function Channel() {
  return (
    <div>
      <h1>Channels</h1>
      <div className={styles.channel_row}>
        <span className={styles.channel_span}>
          <span className={styles.channel_num}>Channel1</span>
        </span>
        <span className={styles.channel_span}>Channel2</span>
      </div>
      <div className={styles.channel_row}>
        <span className={styles.channel_span}>Channel3</span>
        <span className={styles.channel_span}>Channel4</span>
      </div>
      <div className={styles.channel_row}>
        <span className={styles.channel_span}>Channel5</span>
        <span className={styles.channel_span}>Channel6</span>
      </div>
    </div>
  );
}

export default Channel;
