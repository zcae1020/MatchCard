import React, { useEffect, useState } from "react";
// import styles from '../css/ChannelAndRoom.module.css';

function Admin({ socket }) {
	const [channels, setChannels] = useState([]);
	const [channelIds, setChannelIds] = useState([]);

	useEffect(() => {
		socket.emit("admin channel list");
		socket.on("admin channels info", (channel) => {
			console.log(channel);
		});
		// socket.on('admin channels info', ({ channel }) => {
		//   setChannels([]);
		//   setChannelIds([]);
		//   Object.keys(channel).map((item) => {
		//     setChannels((prevState) => [...prevState, item]);
		//     setChannelIds((prevState) => [...prevState, channel[item].id]);
		//   });
		// });
	}, []);
	useEffect(() => {
		console.log(channels);
		console.log(channelIds);
	}, [channels, channelIds]);

	const deleteChannel = (index) => {
		console.log(channelIds[index]);
		socket.emit("delete channel", channelIds[index]);
	};

	const ChannelList = () => {
		return channels.map((item, index) => (
			<div key={item}>
				<p>{item}</p>
				<button
					onClick={() => {
						deleteChannel(index);
					}}
				>
					-
				</button>
			</div>
		));
	};

	return (
		<div>
			<h1>I'm admin!</h1>
			<ChannelList />
		</div>
	);
}

export default Admin;
