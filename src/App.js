import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Chat from "./views/chat/chat";
import { StateProvider } from "./store/store";

function App() {
  return (
    <StateProvider>
      <Chat/>
    </StateProvider>
  );
}

export default App;
