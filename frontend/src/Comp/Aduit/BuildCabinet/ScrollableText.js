import React, { useRef, useEffect, useState } from "react";

const ScrollableText = ({ text }) => {
  const containerRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (container.scrollWidth > container.clientWidth) {
      setShouldScroll(true);
    } else {
      setShouldScroll(false);
    }
  }, [text]);

  const containerStyle = {
    width: "9rem", // Fixed width of 8rem
    overflow: "hidden", // Hide scrollbar
    whiteSpace: "nowrap", // Prevent text wrapping
    position: "relative",
    display: "flex",
    alignItems: "center",
    backgroundColor: "white", // Optional: to better visualize the text area
  };

  const textStyle = {
    display: "inline-block",
    animation: shouldScroll ? "scroll-left 3s linear infinite" : "none", // Apply animation if needed
  };

  const keyframes = `
    @keyframes scroll-left {
      0% {
        transform: translateX(0%); /* Start position off-screen */
      }
        50% {
        transform: translateX(0%); /* Start position off-screen */ 
        }
      100% {
        transform: translateX(-50%); /* End position off-screen */
      }
    }
  `;

  return (
    <div ref={containerRef} style={containerStyle}>
      <div style={textStyle}>
        {text}
        <style>{keyframes}</style> {/* Inject the keyframes directly into the component */}
      </div>
    </div>
  );
};

export default ScrollableText;
