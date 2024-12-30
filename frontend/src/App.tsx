import { useEffect, useRef, useState } from "react"


export default function App(){
  const [messages,Setmessages] = useState(["hi there"])
  const wsRef = useRef()
  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080")
    ws.onmessage = (event) =>{
      Setmessages((m)=>[...m,event.data])
    }
    wsRef.current  = ws
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type:"join",
        payload:{
          roomId :"red"
        }
      }))
    }

  },[])

  return (
    <div className="h-screen w-full bg-zinc-900">
      <div className="h-[80%] pt-5 w-full flex flex-col gap-3 pl-10">
        {messages.map((message, index) => (
          <span key={index} className="bg-white w-fit text-black rounded px-4 py-2  ">
            {message}
          </span>
        ))}
      </div>
      <div className="h-[5%] flex px-10 gap-4">
        <input id="messageInput" className="flex-1" type="text" />
        <button
          onClick={(e) => {
            e.preventDefault();
            const message = (document.getElementById("messageInput") as HTMLInputElement)?.value;
            if (message && wsRef.current) {
              wsRef.current.send(
                JSON.stringify({
                  type: "chat",
                  payload: {
                    message: message,
                  },
                })
              );
            }
          }}
          className="text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}