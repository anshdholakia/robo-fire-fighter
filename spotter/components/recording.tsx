import React, { useState, useRef } from "react";
import styled from "styled-components";

const Button = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    // Add more languages as needed
  ];

  const handleButtonClick = () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      // Start recording
      startRecording();
      setIsRecording(true);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.addEventListener("dataavailable", event => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        sendAudioToBackend(audioBlob);
      });

      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setIsRecording(false);
    }
  };

  const sendAudioToBackend = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");
    formData.append("language", selectedLanguage); // Include selected language

    try {
      const response = await fetch("http://localhost:5001/audio-input", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Audio uploaded successfully");
      } else {
        console.error("Failed to upload audio");
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <StyledWrapper>
      <div className="controls">
        <button className="button" onClick={handleButtonClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            viewBox="0 0 24 24"
            height="24"
            fill="none"
            className="svg-icon"
          >
            <g strokeWidth={2} strokeLinecap="round" stroke="#ff342b">
              <rect y="3" x="9" width="6" rx="3" height="11" />
              <path d="m12 18v3" />
              <path d="m8 21h8" />
              <path d="m19 11c0 3.866-3.134 7-7 7-3.86599 0-7-3.134-7-7" />
            </g>
          </svg>
          <span className="label">{isRecording ? "Recording" : "Record"}</span>
        </button>
        <label>Translate to:</label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="language-select"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .controls {
    display: flex;
    align-items: center;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 12px;
    gap: 8px;
    height: 40px;
    border: none;
    background: #1b1b1cde;
    border-radius: 20px;
    cursor: pointer;
  }

  .label {
    line-height: 20px;
    font-size: 17px;
    color: #ff342b;
    font-family: sans-serif;
    letter-spacing: 1px;
  }

  .button:hover {
    background: #1b1b1c;
  }

  .button:hover .svg-icon {
    animation: scale 1s linear infinite;
  }

  .language-select {
    margin-left: 10px;
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: #fff;
    font-size: 16px;
    font-family: sans-serif;
    color: #333;
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.05) rotate(10deg);
    }

    100% {
      transform: scale(1);
    }
  }
`;

export default Button;
