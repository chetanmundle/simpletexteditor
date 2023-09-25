"use client";
import React, { useRef } from "react";

function App() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Specify the type here

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContents = event.target?.result as string;
        if (textareaRef.current) {
          textareaRef.current.value = fileContents;
        }
      };

      reader.readAsText(selectedFile);
    }
  };

  const handleSaveButtonClick = () => {
    if (textareaRef.current) {
      const fileContents = textareaRef.current.value;
      const blob = new Blob([fileContents], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "textfile.txt";
      a.click();

      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <textarea ref={textareaRef} rows={10} cols={40}></textarea>
      <br />
      <button onClick={handleButtonClick}>Open File Manager</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button onClick={handleSaveButtonClick}>Save as .txt</button>
    </div>
  );
}

export default App;
