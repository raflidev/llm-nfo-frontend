import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import axios from 'axios'

import Home from "./Pages/Home";
import ChatHistory from "./Pages/ChatHistory";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:id" element={<ChatHistory />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
