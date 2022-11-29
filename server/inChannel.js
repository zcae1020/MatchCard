import { enter } from "./controller/CHANNEL/enter.js";

export const connection = (channelNamespace) => {
  const onConnection = (socket) => {
    console.log("channel connect");
    socket.emit("channel connected");
    socket.on("disconnect", () => {
      console.log("channel disconnect")
    });

    enter(channelNamespace, socket);
  };

  channelNamespace.on("connection", onConnection);
};
