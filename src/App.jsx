import { useState, useCallback, useEffect, useRef } from "react";
import "remixicon/fonts/remixicon.css"; // Importing Remix Icon CSS

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(""); // State to hold GitHub profile image URL

  const passwordRef = useRef(null);

  // Fetch GitHub profile data
  useEffect(() => {
    fetch("https://api.github.com/users/Sugatraj")
      .then((response) => response.json())
      .then((data) => {
        setProfileImageUrl(data.avatar_url); // Set the profile image URL from GitHub data
      })
      .catch((error) => {
        console.error("Error fetching GitHub profile:", error);
      });
  }, []);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (symbolsAllowed) str += "#$%&'()*+,-./:;<=>?@[]^_`{|}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, symbolsAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    document.execCommand("copy");

    // Show toast notification when password is copied
    // setShowToast(true);

    // Hide the toast after 2 seconds
    // setTimeout(() => {
    //   setShowToast(false);
    // }, 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, symbolsAllowed, passwordGenerator]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="scale-110 w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-5 my-8 bg-gray-800 bg-opacity-50 backdrop-blur-md backdrop-brightness-75 relative">
        <h1 className="text-center text-2xl font-bold mb-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-gray-700 bg-opacity-40 backdrop-blur-sm">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-transparent text-white"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="mr-2">
              Length: {length}
            </label>
            <input
              type="range"
              min={8}
              max={16}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="mr-2">
              Include Numbers
            </label>
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="symbolInput" className="mr-2">
              Include Symbols
            </label>
            <input
              type="checkbox"
              checked={symbolsAllowed}
              id="symbolInput"
              onChange={() => setSymbolsAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Animated and Styled Toast Notification at the Top */}
        {/* 
        {showToast && (
          <div
            className={`${
              showToast ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300 ease-in-out transform ${
              showToast ? 'translate-y-0' : '-translate-y-4'
            } fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-4 py-2 rounded flex items-center space-x-2 shadow-lg`}>
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.003 5.884l8 4.8a1 1 0 001.002 0l8-4.8A1 1 0 0019 5H1a1 1 0 001.003.884z" />
              <path d="M10 12.228l-7.428-4.453L1 8.5V14a2 2 0 002 2h14a2 2 0 002-2V8.5l-1.572.275L10 12.228z" />
            </svg>
            <span>Password copied to clipboard!</span>
          </div>
        )}
        */}
      </div>

      {/* Credit Section with GitHub, Instagram, and LinkedIn Links */}
      <footer className="mt-8 flex flex-col items-center">
        {/* Reserve space for the image to prevent CLS */}
        <div className="w-16 h-16 rounded-full mb-2 bg-transparent">
          {profileImageUrl && (
            <img
              src={profileImageUrl}
              alt="GitHub Profile"
              className="w-16 h-16 rounded-full"
              onLoad={() => setLoading(false)} // Hide loader when image loads
            />
          )}
        </div>
        <p className="text-sm text-gray-400">
          Created by{" "}
          <a
            href="https://github.com/Sugatraj"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sugatraj
          </a>
        </p>
        <div className="flex space-x-4 mt-2">
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/rajx_sarwade/" // Replace with your Instagram URL
            className="text-pink-500 hover:text-pink-400"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="ri-instagram-fill text-2xl"></i>
          </a>
          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/sugatraj-sarwade-7ab158190/" // Replace with your LinkedIn URL
            className="text-blue-700 hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="ri-linkedin-box-fill text-2xl"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
