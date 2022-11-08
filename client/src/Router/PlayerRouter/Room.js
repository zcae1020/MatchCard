import React from "react";
import styles from "../../css/ChannelAndRoom.module.css";

function Room({ socket, uid }) {
  return (
    <div>
      <span>
        <h1>Channels</h1>
        {/* <button onClick={logout}>logout</button> */}
      </span>
      <div className={styles.channel_row}>
        <span className={styles.channel_span}>
          <span className={styles.channel_num}>Channel1</span>
        </span>
        <span className={styles.channel_span}>
          <span className={styles.channel_num}>Channel2</span>
        </span>
      </div>
      <div className={styles.channel_row}>
        <span className={styles.channel_span}>
          <span className={styles.channel_num}>Channel3</span>
        </span>
        <span className={styles.channel_span}>
          <span className={styles.channel_num}>Channel4</span>
        </span>
      </div>
      <div className={styles.channel_row}>
        <span className={styles.channel_span}>
          <span className={styles.channel_num}>Channel5</span>
        </span>
        <span className={styles.channel_span}>
          <span className={styles.channel_num}>Channel6</span>
        </span>
      </div>
    </div>
  );
}

export default Room;
