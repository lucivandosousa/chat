import { useEffect, useRef, useState } from "react"

export default function Chat({socket}) {

  const messageRef = useRef()
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    socket.on("receive_message", data => {
      setMessageList((current) => [...current, data])
    })

    return () => socket.off("receive_message")

  }, [socket])

  async function handleSubmit() {
    const message = messageRef.current.value
    if (message.trim() !== "") {
      socket.emit("set_message", message)
      clearInput()
    }
  }

  function clearInput() {
    messageRef.current.value = ""
  }

  return (
    <div>
      <h1>Bate Papo</h1>
      <input type="text" ref={messageRef} placeholder="Mensagem"/>
      <button onClick={() => handleSubmit()}>Enviar</button>
      {
        messageList.map((message, index) => (
          <p key={index}>{message.author}: {message.text}</p>
        ))
      }
    </div>
  )
}
