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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

axios.defaults.withCredentials = true
// set-cookie


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:id/:step" element={<ChatHistory />} />
          </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
