import { useRef } from "react"
import io from "socket.io-client"

export default function Join({setChatVisibility, setSocket}) {
 
  const usernameRef = useRef()

  async function handleSubmit() {
    const username = usernameRef.current.value
    if (username.trim() !== "") {
      const socket = await io.connect("http://localhost:3000")
      socket.emit("set_username", username)
      setChatVisibility(true)
      setSocket(socket)
    }
  }

  return (
    <div>
      <h1>Chat em tempo real</h1>
      <input type="text" ref={usernameRef} placeholder="Nome de usuário"/>
      <button onClick={() => handleSubmit()}>Entrar</button>
    </div>
  )
}
