import React from "react";
import styles from "../css/ChannelAndRoom.module.css";
import { getAuth, signOut } from "firebase/auth";

function Channel() {
	const auth = getAuth();

	const logout = () => {
		signOut(auth)
			.then(() => {
				console.log("logout success");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<h1>Channels</h1>
			<div className={styles.channel_row}>
				<span className={styles.channel_span} onClick={logout}>
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
				<br />
				<button onClick={logout}>logout</button>
			</div>
		</div>
	);
}

export default Channel;
