export const connection = (channelNamespace) => {
    channelNamespace.on('connection', (socket) => {
        console.log("channel connect");
        socket.emit("channel connected");
        socket.on("success enter room",(a) => {
            console.log(a);
        })
    })
}