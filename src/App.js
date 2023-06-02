import "./App.css";
import Navbar from "./components/Navbar";
import { GlobalProvider } from "./context/GlobalState";
import Home from "./pages/Home";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Navbar />
        <Home />
      </div>
    </GlobalProvider>
  );
}

export default App;
