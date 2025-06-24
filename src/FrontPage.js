import React, { useState, useEffect } from "react";

const FrontPage = ({ onEnterApp }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`User response to the install prompt: ${outcome}`);

    // Clear the deferredPrompt variable
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  return (
    <div className="min-h-screen fade-in">
      <div className="hero-section">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="hero-title">SDE-3000 EVH Editor</h1>
          <p className="hero-subtitle">
            Professional MIDI editor for the Boss SDE-3000 EVH digital delay
            pedal. Control your sound with precision and style.
          </p>
        </header>

        {/* Action Buttons */}
        <div className="hero-buttons">
          <button onClick={onEnterApp} className="editor-button">
            🎚️ Launch Editor
          </button>

          {showInstallButton && (
            <button
              onClick={handleInstallClick}
              className="install-button"
              disabled={!deferredPrompt}
            >
              <span>📱</span>
              Install App
            </button>
          )}
        </div>

        {/* Feature Grid */}
        <div className="features-grid">
          <div className="feature-card slide-in">
            <div className="feature-icon">🎚️</div>
            <h3 className="feature-title">Real-time Control</h3>
            <p className="feature-description">
              Adjust parameters and hear changes instantly through MIDI.
              Fine-tune your delay settings with precision sliders and immediate
              feedback.
            </p>
          </div>

          <div
            className="feature-card slide-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="feature-icon">💾</div>
            <h3 className="feature-title">Memory Management</h3>
            <p className="feature-description">
              Read, write, and organize your presets across all 6 memory slots.
              Never lose your perfect delay settings again.
            </p>
          </div>

          <div
            className="feature-card slide-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">Mobile Ready</h3>
            <p className="feature-description">
              Install as a PWA for offline access and native app experience.
              Control your pedal from any device, anywhere.
            </p>
          </div>
        </div>

        {/* Requirements Section */}
        <div
          className="glass-card"
          style={{
            marginTop: "4rem",
            padding: "2rem",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "1.5rem",
              color: "var(--warning-text)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              justifyContent: "center",
            }}
          >
            <span>⚠️</span> Requirements
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              margin: "0",
              color: "var(--text-secondary)",
              lineHeight: "1.8",
            }}
          >
            <li style={{ marginBottom: "0.5rem" }}>
              • Boss SDE-3000 EVH digital delay pedal
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              • MIDI interface or USB MIDI cable
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              • Modern web browser with MIDI Web API support
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              • Chrome, Edge, or Opera recommended
            </li>
          </ul>
        </div>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            marginTop: "4rem",
            color: "var(--text-muted)",
            fontSize: "0.9rem",
          }}
        >
          <p>© 2025 SDE-3000 EVH Editor. Built with React and MIDI Web API.</p>
        </footer>
      </div>
    </div>
  );
};

export default FrontPage;
