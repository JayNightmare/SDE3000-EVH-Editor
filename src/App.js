import React, { useState, useEffect } from "react";
import FrontPage from "./FrontPage";
import MidiEditor from "./MidiEditor";
import AnimatedCursor from "react-animated-cursor";
import "./App.css";

function App() {
    const [currentView, setCurrentView] = useState("home");

    useEffect(() => {
        // Register service worker for PWA functionality
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker
                    .register("/sw.js")
                    .then((registration) => {
                        console.log("SW registered: ", registration);
                    })
                    .catch((registrationError) => {
                        console.log(
                            "SW registration failed: ",
                            registrationError
                        );
                    });
            });
        }
    }, []);

    const handleEnterApp = () => {
        setCurrentView("editor");
    };

    const handleBackToHome = () => {
        setCurrentView("home");
    };

    return (
        <div className="App">
            <AnimatedCursor
                innerSize={10}
                outerSize={30}
                color="255, 46, 99"
                outerAlpha={0.4}
                innerScale={0.6}
                outerScale={0}
            />

            {currentView === "home" ? (
                <FrontPage onEnterApp={handleEnterApp} />
            ) : (
                <MidiEditor onBackToHome={handleBackToHome} />
            )}
        </div>
    );
}

export default App;
