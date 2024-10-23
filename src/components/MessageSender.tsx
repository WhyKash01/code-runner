import React, { useEffect, useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useSocket } from './SocketComponent';
import * as monacoEditor from 'monaco-editor'; // Import Monaco types

const CollaborativeEditor = () => {
    const { socket, isConnected } = useSocket();
    const [room, setRoom] = useState("");
    const [code, setCode] = useState("");

    // Properly typed ref for Monaco Editor instance
    const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

    // Handle joining the room
    const handleJoinRoom = () => {
        
        if (room) {
            socket.emit("join-room", room);
            console.log(`Joined room: ${room}`);
        }
    };

    // Handle code change in Monaco Editor and emit updated code
    const handleCodeChange = (newCode: string | undefined) => {
        if (newCode !== undefined) {
            setCode(newCode);
            if (room) {
                socket.emit("update-code", { code: newCode, room });
            }
        }
    };

    // Sync code updates from other participants
    useEffect(() => {
        if (socket && isConnected) {
            const handleCodeUpdated = (updatedCode: string) => {
                setCode(updatedCode); // Sync code with received update
                if (editorRef.current) {
                    editorRef.current.setValue(updatedCode); // Update Monaco editor with latest code
                }
            };

            socket.on("code-updated", handleCodeUpdated);

            // Clean up on unmount
            return () => {
                socket.off("code-updated");
            };
        }
    }, [socket, isConnected]);

    // On mount, set the editor ref
    const onMount = (editor: monacoEditor.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
        editor.focus();
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Room input */}
            <div>
                <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Enter room name..."
                />
                <button onClick={handleJoinRoom}>Join Room</button>
            </div>

            {/* Monaco Code Editor */}
            {isConnected && (
                <Editor
                    theme="vs-dark"
                    height="75vh"
                    language="javascript"  // Set language here
                    value={code}  // Controlled editor value
                    onMount={onMount}
                    onChange={(newValue) => handleCodeChange(newValue ?? "")}  // Handle code change
                />
            )}
        </div>
    );
};

export default CollaborativeEditor;
