import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import OfferTimer from "./components/OfferTimer";
import Projects from "./components/Projects";
import CustomProject from "./components/CustomProject";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import pwaUtils from "./utils/pwa";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#cart") {
        setCurrentPage("cart");
      } else {
        setCurrentPage("home");
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // PWA Initialization
  useEffect(() => {
    // Initialize PWA features
    const initPWA = async () => {
      try {
        // Check if service worker is supported and ready
        if ("serviceWorker" in navigator) {
          const registration = await navigator.serviceWorker.ready;
          console.log("[App] Service Worker ready:", registration);
        }

        // Get PWA status
        const pwaStatus = pwaUtils.getPWAStatus();
        console.log("[App] PWA Status:", pwaStatus);

        // Set loading to false after PWA initialization
        setIsLoading(false);

        // Preload critical resources
        preloadCriticalResources();
      } catch (error) {
        console.error("[App] PWA initialization error:", error);
        setIsLoading(false);
      }
    };

    initPWA();
  }, []);

  // Preload critical resources for better performance
  const preloadCriticalResources = () => {
    // Preload images
    const criticalImages = ["/arulaxlogo.png", "/logo192.png", "/logo512.png"];

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Preload fonts
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        console.log("[App] Fonts loaded");
      });
    }
  };

  // Handle app visibility changes for PWA
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // App is hidden, pause non-essential operations
        console.log("[App] App hidden, pausing operations");
      } else {
        // App is visible, resume operations
        console.log("[App] App visible, resuming operations");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Show loading screen while PWA initializes
  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">
            <h3>AruLax Web</h3>
            <p>Loading your digital experience...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      {currentPage === "cart" ? (
        <Cart />
      ) : (
        <>
          <OfferTimer />
          <Projects />
          <CustomProject />
          <Contact />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
