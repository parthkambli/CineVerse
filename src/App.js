import "./App.css";
import Navbar from "./components/Navbar";
import { GlobalProvider } from "./context/GlobalState";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Detail />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GlobalProvider>
  );
}

export default App;
