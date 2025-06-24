import React, { useEffect, useState } from "react";
import { paramDefs } from "./sysexParams";
import "./App.css";

function App() {
    const [midi, setMidi] = useState({
        access: null,
        input: null,
        output: null,
    });
    const [connected, setConnected] = useState(false);
    const [params, setParams] = useState(
        Object.fromEntries(paramDefs.map((p) => [p.key, p.min]))
    );
    const [currentSlot, setCurrentSlot] = useState(1);

    useEffect(() => {
        navigator
            .requestMIDIAccess({ sysex: true })
            .then(onMIDISuccess)
            .catch((e) => alert("MIDI access failed: " + e));
    }, []);

    function onMIDISuccess(access) {
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
    }

    function handleMidiMessage({ data }) {
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
    }

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
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">SDE-3000 EVH Editor</h1>
            {!connected && <div>Connecting to SDE-3000 EVH...</div>}

            {connected && (
                <div className="space-y-8">
                    {/* Memory Slots */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Memory Slots
                        </h2>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5, 6].map((slot) => (
                                <button
                                    key={slot}
                                    className={`px-3 py-1 rounded shadow ${
                                        currentSlot === slot
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200"
                                    }`}
                                    onClick={() => readSlot(slot)}
                                >
                                    Slot {slot}
                                </button>
                            ))}
                        </div>
                        <button
                            className="mt-2 px-4 py-2 rounded bg-green-600 text-white"
                            onClick={() => readSlot(currentSlot)}
                        >
                            Refresh Slot {currentSlot}
                        </button>
                    </div>

                    {/* Parameters */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Parameters
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {paramDefs.map((pd) => (
                                <div key={pd.id} className="p-4 border rounded">
                                    <label className="block mb-1 font-medium">
                                        {pd.name}
                                    </label>
                                    <input
                                        type="range"
                                        min={pd.min}
                                        max={pd.max}
                                        value={params[pd.key]}
                                        onChange={(e) =>
                                            writeParam(
                                                pd,
                                                parseInt(e.target.value, 10)
                                            )
                                        }
                                        className="w-full"
                                    />
                                    <div className="mt-1 text-center">
                                        {params[pd.key]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-4">
                        <button
                            className="px-4 py-2 rounded bg-blue-600 text-white"
                            onClick={() =>
                                paramDefs.forEach((pd) =>
                                    writeParam(pd, params[pd.key])
                                )
                            }
                        >
                            Write All to Pedal
                        </button>
                        <button
                            className="px-4 py-2 rounded bg-gray-300"
                            onClick={() => readSlot(currentSlot)}
                        >
                            Read Slot
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;