import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import About from "./pages/about";
import Works from "./pages/works";
import Contacts from "./pages/contact";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="works" element={<Works />} />
        <Route path="contacts" element={<Contacts />} />
      </Routes>
      {/* <Home /> */}
      {/* <About /> */}
      {/* <Works /> */}
      {/* <Contacts /> */}
      <Footer />
    </>
  );
}

export default App;
