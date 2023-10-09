import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Feature from "./Components/Feature";
import About from "./Components/About";
import aboutimage from "./images/3d-fluency-map-marker.png";
import Contact from "./Components/Contact";
import Map from "./Components/Map"; // Import the Hello component
import { ChakraProvider } from "@chakra-ui/react";

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        {/* Main layout route with common components */}
                        <Route
                            path="/"
                            element={
                                <>
                                    <Header />
                                    <Feature title="Features" />
                                    <About image={aboutimage} title="About" />
                                    <Contact />
                                </>
                            }
                        />
                        {/* Route for the "Hello" page */}
                        <Route path="/Map" element={<Map />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
