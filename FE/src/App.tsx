import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <main className="h-full">
      <Outlet />
    </main>
  );
}

export default App;
