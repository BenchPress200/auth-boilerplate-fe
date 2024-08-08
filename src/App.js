import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Join from "./pages/Join";
import Main from "./pages/Main"
import VideoChat from "./pages/VideoChat"
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Welcome />}></Route>
              <Route path={"/join"} element={<Join />}></Route>
              <Route path={"/main"} element={<Main />}></Route>
              <Route path={"/videoChat/:roomId"} element={<VideoChat />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
