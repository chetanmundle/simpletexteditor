"use client";

import React, { useRef } from "react";
import { useState } from "react";
import "./editorcss.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Editor = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [textbox, setTextbox] = useState({
    text: "",
    filename: "",
  });

  const clearbox = () => {
    setTextbox((prevTextbox) => ({
      ...prevTextbox,
      text: "",
    }));
  };

  const handleButtonClickOpenFile = () => {
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
        // setFileData(fileContent);
        setTextbox((prevTextbox) => ({
          ...prevTextbox,
          text: fileContent,
        }));
      };

      reader.readAsText(selectedFile);
    }
  };

  const handalinputchange = (event: any) => {
    setTextbox((prevTextbox) => ({
      ...prevTextbox,
      text: event.target.value,
    }));
  };

  const handalfilenamechange = (event: any) => {
    setTextbox((prevTextbox) => ({
      ...prevTextbox,
      filename: event.target.value,
    }));
    // console.log(textbox.filename);
  };

  // save file
  const handleSaveToFile = () => {
    if (textbox.filename) {
      const blob = new Blob([textbox.text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      // a.download = "textarea-content.txt";
      a.download = textbox.filename + ".txt";
      a.click();

      URL.revokeObjectURL(url);

      setTextbox((prevTextbox) => ({
        filename: "",
        text: "",
      }));

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire("Please Enter the FileName !!");
    }
  };

  return (
    <div className="border border-blue-400 ml-28 mr-28 mt-4 pb-4">
      <div className="my-2 grid grid-cols-8">
        <button
          onClick={handleButtonClickOpenFile}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-4 border border-blue-500 hover:border-transparent rounded h-10 w-28 ml-2 "
        >
          Open File
        </button>

        <label htmlFor="filename" className="mt-2 ">
          Enter File Name :
        </label>
        <input
          type="text"
          name="filename"
          id="filename"
          value={textbox.filename}
          onChange={handalfilenamechange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline col-start-3 col-end-5 border-gray-700"
        />
      </div>

      <div className="">
        <textarea
          cols={117}
          rows={18}
          value={textbox.text} // bind the value to state
          onChange={handalinputchange}
          className=" border-black border-2 border-solid box-border unstretchable-textarea p-2"
        />
      </div>

      <div className="grid  grid-cols-2 h-12">
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded h-12 w-20 ml-48 "
          onClick={clearbox}
        >
          Clear
        </button>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded h-12 w-28 ml-48"
          onClick={handleSaveToFile}
        >
          Save File
        </button>
      </div>
      <input
        type="file"
        style={{display:"none"}}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".txt" // Accept only .txt files
      />
    </div>
  );
};

export default Editor;
