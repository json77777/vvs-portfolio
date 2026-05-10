"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

export default function LoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  // Only show loader on first visit per session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("lupin-visited");
    if (hasVisited) {
      setIsLoading(false);
      setShowLoader(false);
    }
  }, []);

  const handleComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("lupin-visited", "true");
    // Remove loader from DOM after curtain animation completes
    setTimeout(() => setShowLoader(false), 200);
  };

  return (
    <>
      {showLoader && <Loader onComplete={handleComplete} />}
      <div
        style={{
          visibility: isLoading ? "hidden" : "visible",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
