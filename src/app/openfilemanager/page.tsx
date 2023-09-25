"use client";
import React, { useRef, useState } from "react";

function Filemanger() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      // Trigger a click event on the file input element when the button is clicked
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        setFileData(fileContent);
      };

      reader.readAsText(selectedFile);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Open File Manager</button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".txt" // Accept only .txt files
      />
      <div>
        <span>{fileData}</span>
      </div>
      <button id="savebutton">savebutton</button>
    </div>
  );
}

export default Filemanger;


