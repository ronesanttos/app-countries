import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Search from "./pages/Search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countrie/:name" element={<Details />} />
          <Route path="/countrie/search/:names" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
