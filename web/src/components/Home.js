import React from "react";
import io from "socket.io-client";
const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log(socket.id);
});

export default function Home() {
  const [state, setState] = React.useState(["HI"]);
  const [val, setVal] = React.useState("");
  const [room, setRoom] = React.useState("");

  function onSubmit(e) {
    e.preventDefault();
    console.log(e);
    socket.emit("custom", val, room);
    setVal("");
  }
  socket.on("new", (message) => {
    console.log(message);
    setState((state) => state.concat([message]));
  });

  function onChange(e) {
    setVal(e.target.value);
  }
  return (
    <>
      {state.map((state, i) => (
        <div key={i} className="App">
          {state}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <label>message</label>
        <input value={val} onChange={onChange} />
        <button>submit</button>

        <label>room</label>
        <input value={room} onChange={(e) => setRoom(e.target.value)} />
        <button>submit</button>
      </form>
    </>
  );
}
