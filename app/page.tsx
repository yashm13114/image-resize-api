"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [resizedUrl, setResizedUrl] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Helper to validate positive integer or empty string (allow clearing input)
  const isValidDimension = (value: string) => {
    if (value === "") return true;
    const num = Number(value);
    return Number.isInteger(num) && num > 0;
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isValidDimension(val)) {
      setWidth(val);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isValidDimension(val)) {
      setHeight(val);
    }
  };

  const handleResize = () => {
    if (!url) return;
    const params = new URLSearchParams({
      url: url,
      width: width || "",
      height: height || "",
    });

    setResizedUrl(`/api/resize?${params.toString()}`);
    setLoaded(false);
  };

  const isResizeDisabled =
    !url ||
    (width !== "" && !isValidDimension(width)) ||
    (height !== "" && !isValidDimension(height));

  return (
    <>
      <style>{`
        /* Background Gradient Animation */
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        body, html, #__next {
          height: 100%;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .animated-bg {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(270deg, #4f46e5, #3b82f6, #06b6d4, #14b8a6);
          background-size: 800% 800%;
          animation: gradientBG 15s ease infinite;
          z-index: -1;
        }

        .glass-form {
          background: rgba(255 255 255 / 0.15);
          backdrop-filter: blur(12px);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          border: 1px solid rgba(255 255 255 / 0.18);
          color: #111827; /* dark text */
          max-width: 420px;
          width: 100%;
          transition: opacity 0.8s ease;
        }

        .fade-in {
          opacity: 1;
        }

        .fade-out {
          opacity: 0;
        }

        input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          margin-bottom: 1rem;
          font-size: 1rem;
          border-radius: 6px;
          border: 1.5px solid #ccc;
          background-color: rgba(255,255,255,0.8);
          color: #111827;
          transition: border-color 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: #3b82f6;
          background-color: white;
          box-shadow: 0 0 8px #3b82f6;
        }

        button {
          width: 100%;
          padding: 0.75rem;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }

        button:not(:disabled) {
          background-color: #3b82f6;
          color: white;
        }

        button:not(:disabled):hover {
          background-color: #2563eb;
        }

        img {
          max-width: 100%;
          border-radius: 12px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.25);
          transition: opacity 1s ease;
          opacity: 0;
        }

        img.loaded {
          opacity: 1;
        }
      `}</style>

      <div className="animated-bg" />

      <main className="flex min-h-screen flex-col items-center justify-center p-8 space-y-8">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
          Image Resizer
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleResize();
          }}
          className="glass-form fade-in"
        >
          <input
            type="text"
            placeholder="Enter image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <input
            type="number"
            placeholder="Width (px)"
            value={width}
            onChange={handleWidthChange}
            min={1}
          />
          <input
            type="number"
            placeholder="Height (px)"
            value={height}
            onChange={handleHeightChange}
            min={1}
          />

          <button type="submit" disabled={isResizeDisabled}>
            Resize Image
          </button>
        </form>

        {resizedUrl && (
          <div className="w-full max-w-md mt-6">
            <h2 className="text-white text-2xl font-semibold mb-3 drop-shadow-md">
              Resized Image:
            </h2>
            <img
              src={resizedUrl}
              alt="Resized"
              onLoad={() => setLoaded(true)}
              className={loaded ? "loaded" : ""}
              draggable={false}
            />
          </div>
        )}
      </main>
    </>
  );
}
