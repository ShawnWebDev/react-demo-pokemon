
import Header from "./components/Header.jsx";
import "./App.css";
import { Outlet } from "react-router";

function App() {





  return (
    <>
      <Header />

      <main>
        <Outlet/>
      </main>
    </>
  );
}

export default App;
