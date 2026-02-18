"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ url, isFullScreen }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    const video = videoRef.current;
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    }

    // handleFullScreen();

    return () => {
      if (hls) hls.destroy();
    };
  }, [url]);

  useEffect(() => {
    if (isFullScreen) {
      setTimeout(() => {
        handleFullScreen();
      }, 1000);
    }
  }, [isFullScreen]);

  const handleFullScreen = () => {
    const container = containerRef.current;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        maxWidth: "900px",
      }}
    >
      <video
        ref={videoRef}
        controls
        autoPlay
        style={{
          width: "100%",
          borderRadius: "12px",
        }}
      />

      {/* <button
        onClick={handleFullScreen}
        style={{
          position: "absolute",
          bottom: "15px",
          right: "15px",
          padding: "8px 12px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Full Screen
      </button> */}
    </div>
  );
}
