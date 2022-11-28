import { enter } from "./controller/CHANNEL/enter.js";

export const connection = (channelNamespace) => {
  const onConnection = (socket) => {
    console.log("channel connect");
    socket.emit("channel connected");
    socket.on("success enter room", (a) => {
      console.log(a);
    });

    channelNamespace.on("connection", onConnection);

    enter(channelNamespace, socket);
  };
};
