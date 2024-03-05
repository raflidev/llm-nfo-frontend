import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home";
import ChatHistory from "./Pages/ChatHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:id" element={<ChatHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
