import React, { useEffect, useState, useCallback } from "react";
import { paramDefs } from "./sysexParams";

const MidiEditor = ({ onBackToHome }) => {
  const [midi, setMidi] = useState({
    access: null,
    input: null,
    output: null,
  });
  const [connected, setConnected] = useState(false);
  const [params, setParams] = useState(
    Object.fromEntries(paramDefs.map((p) => [p.key, p.min])),
  );
  const [currentSlot, setCurrentSlot] = useState(1);

  const handleMidiMessage = useCallback(({ data }) => {
    if (data[0] === 0xf0 && data[4] === 0x7e) {
      const slot = data[5];
      const values = data.slice(6, -1);
      const newParams = {};
      paramDefs.forEach((pd, idx) => {
        newParams[pd.key] = values[idx];
      });
      setParams(newParams);
      setCurrentSlot(slot);
    }
  }, []);

  const onMIDISuccess = useCallback(
    (access) => {
      let inPort = null,
        outPort = null;
      for (let input of access.inputs.values())
        if (input.name.includes("SDE-3000")) inPort = input;
      for (let output of access.outputs.values())
        if (output.name.includes("SDE-3000")) outPort = output;
      if (inPort && outPort) {
        setMidi({ access, input: inPort, output: outPort });
        setConnected(true);
        inPort.onmidimessage = handleMidiMessage;
      } else alert("SDE-3000 EVH device not found");
    },
    [handleMidiMessage],
  );

  useEffect(() => {
    navigator
      .requestMIDIAccess({ sysex: true })
      .then(onMIDISuccess)
      .catch((e) => alert("MIDI access failed: " + e));
  }, [onMIDISuccess]);

  function sendSysEx(bytes) {
    midi.output.send(bytes);
  }

  function writeParam(pd, value) {
    const syx = [0xf0, 0x41, 0x10, 0x11, pd.id, value, 0xf7];
    sendSysEx(syx);
    setParams((prev) => ({ ...prev, [pd.key]: value }));
  }

  function readSlot(slot) {
    const syx = [0xf0, 0x41, 0x10, 0x11, 0x7e, slot, 0xf7];
    sendSysEx(syx);
  }

  return (
    <div className="min-h-screen fade-in" style={{ padding: "2rem" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <header className="flex items-center justify-between mb-8">
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "800",
              background:
                "linear-gradient(135deg, var(--text-primary), var(--accent-blue), var(--accent-purple))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: "0",
            }}
          >
            SDE-3000 EVH Editor
          </h1>
          <button
            onClick={onBackToHome}
            className="btn-secondary"
            style={{
              marginTop: "1.5rem",
            }}
          >
            ← Back to Home
          </button>
        </header>

        {/* Connection Status */}
        {!connected && (
          <div
            className="glass-card"
            style={{
              marginTop: "1.5rem",
              marginBottom: "2rem",
              padding: "1.5rem",
              background: "var(--warning-bg)",
              border: "1px solid var(--warning-border)",
            }}
          >
            <p
              style={{
                fontWeight: "600",
                color: "var(--warning-text)",
                margin: "0 0 0.5rem 0",
              }}
            >
              🔍 Connecting to SDE-3000 EVH...
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                margin: "0",
              }}
            >
              Make sure your SDE-3000 EVH is connected via MIDI and powered on.
            </p>
          </div>
        )}

        {connected && (
          <div
            className="space-y-8 fade-in"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {/* Connection Success */}
            <div
              className="glass-card"
              style={{
                padding: "1.5rem",
                background: "var(--success-bg)",
                border: "1px solid var(--success-border)",
                marginTop: "1.5rem",
              }}
            >
              <p
                style={{
                  fontWeight: "600",
                  color: "var(--success-text)",
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>✅</span> Connected to SDE-3000 EVH
              </p>
            </div>

            {/* Memory Slots */}
            <div className="glass-card slide-in" style={{ padding: "2rem" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  marginBottom: "1.5rem",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>💾</span> Memory Slots
              </h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((slot) => (
                  <button
                    key={slot}
                    className={
                      currentSlot === slot ? "btn-primary" : "btn-secondary"
                    }
                    onClick={() => readSlot(slot)}
                    style={{ minWidth: "80px" }}
                  >
                    Slot {slot}
                  </button>
                ))}
              </div>
              <button
                className="btn-primary"
                onClick={() => readSlot(currentSlot)}
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-green), var(--accent-blue))",
                  boxShadow: "0 4px 16px rgba(16, 185, 129, 0.3)",
                }}
              >
                🔄 Refresh Slot {currentSlot}
              </button>
            </div>

            {/* Parameters */}
            <div
              className="glass-card slide-in"
              style={{ padding: "2rem", animationDelay: "0.2s" }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  marginBottom: "1.5rem",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>🎚️</span> Parameters
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {paramDefs.map((pd) => (
                  <div
                    key={pd.id}
                    className="glass-card"
                    style={{ padding: "1.5rem" }}
                  >
                    <label
                      style={{
                        display: "block",
                        marginBottom: "1rem",
                        fontWeight: "600",
                        color: "var(--text-primary)",
                        fontSize: "1.1rem",
                      }}
                    >
                      {pd.name}
                    </label>
                    <input
                      type="range"
                      min={pd.min}
                      max={pd.max}
                      value={params[pd.key]}
                      onChange={(e) =>
                        writeParam(pd, parseInt(e.target.value, 10))
                      }
                      style={{ marginBottom: "1rem" }}
                    />
                    <div
                      style={{
                        textAlign: "center",
                        fontWeight: "700",
                        fontSize: "1.5rem",
                        color: "var(--accent-blue)",
                        background: "rgba(59, 130, 246, 0.1)",
                        padding: "0.5rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                      }}
                    >
                      {params[pd.key]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div
              className="glass-card slide-in"
              style={{ padding: "2rem", animationDelay: "0.4s" }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  marginBottom: "1.5rem",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>⚡</span> Actions
              </h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <button
                  className="btn-primary"
                  onClick={() =>
                    paramDefs.forEach((pd) => writeParam(pd, params[pd.key]))
                  }
                  style={{
                    padding: "1rem 2rem",
                    fontSize: "1.1rem",
                  }}
                >
                  📤 Write All to Pedal
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => readSlot(currentSlot)}
                  style={{
                    padding: "1rem 2rem",
                    fontSize: "1.1rem",
                  }}
                >
                  📥 Read Current Slot
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MidiEditor;
