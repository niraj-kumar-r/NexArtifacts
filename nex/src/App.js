import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Feature from "./Components/Feature";
import About from "./Components/About";
import aboutimage from "./images/About.png";
import Contact from "./Components/Contact";
import Map from "./Components/Map"; // Import the Hello component

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Main layout route with common components */}
          <Route path="/"element={<>
          <Header /><Feature /><About image={aboutimage} title="About" button="Get the Website" /><Contact />
              </>
            }
          />
          {/* Route for the "Hello" page */}
          <Route path="/Map" element={<Map />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
