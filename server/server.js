const app = require("express")()
const server = require("http").createServer(app)
const io = require("socket.io")(server, {cors: {origin: "http://localhost:5173"}})

const PORT = process.env.PORT || 3000

io.on("connection", (socket) => {
  console.log("User connected!", socket.id)

  socket.on("disconnect", reason => {
    console.log("User disconnected!", socket.id)
  })

  socket.on("set_username", username => {
    socket.data.username = username
  })

  socket.on("set_message", text => {
    io.emit("receive_message", {
      text,
      authorId: socket.id,
      author: socket.data.username
    })
  })

})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))