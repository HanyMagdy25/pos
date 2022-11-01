import "./App.css";
import { GlobalProvider } from "./context/GlobalContext";
import Pos from "./pages/Pos";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Pos />
      </div>
    </GlobalProvider>
  );
}

export default App;
