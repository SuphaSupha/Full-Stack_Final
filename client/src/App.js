import { Routes, Route } from "react-router-dom";
import Error from "./pages/Error/Error";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}

export default App;
