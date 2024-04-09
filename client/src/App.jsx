import { useState } from 'react'
import './App.css'
import Join from './components/Join'
import Chat from './components/Chat'

function App() {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)

  return (
    <div className='card'>
      {
        chatVisibility ? <Chat socket={socket}/> : <Join setChatVisibility={setChatVisibility} setSocket={setSocket}/>
      }
    </div>
  )
}

export default App
