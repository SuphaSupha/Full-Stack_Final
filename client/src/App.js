import { Routes, Route } from "react-router-dom";
import Error from "./pages/Error/Error";
import Home from "./pages/Home";
import SingUp from "./pages/Singup/index";
import LogIn from "./pages/LogIn/index";
import CommentProvider from "./context/CommentProvider";
import NightDayProvider from "./context/NightDayProvider";
import Comments from "./pages/Comment";

function App() {
  return (
    <NightDayProvider>
      <CommentProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/comment/:id" element={<Comments />}></Route>
          <Route path="/singup" element={<SingUp />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </CommentProvider>
    </NightDayProvider>
  );
}

export default App;
