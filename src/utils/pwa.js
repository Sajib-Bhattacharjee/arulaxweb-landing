// PWA Utility Functions for AruLax Web
// Advanced PWA features including install prompts, offline detection, and service worker management

class PWAUtils {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.isOnline = navigator.onLine;
    this.swRegistration = null;

    this.init();
  }

  init() {
    this.setupInstallPrompt();
    this.setupServiceWorker();
    this.setupOnlineStatus();
    this.setupPerformanceMonitoring();
  }

  // Service Worker Registration and Management
  async setupServiceWorker() {
    // Only register service worker in production (HTTPS)
    if (
      "serviceWorker" in navigator &&
      (window.location.protocol === "https:" ||
        window.location.hostname === "localhost")
    ) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        this.swRegistration = registration;

        console.log(
          "[PWA] Service Worker registered successfully:",
          registration.scope
        );

        // Handle updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                this.showUpdateNotification();
              }
            });
          }
        });

        // Handle service worker messages
        navigator.serviceWorker.addEventListener("message", (event) => {
          this.handleServiceWorkerMessage(event.data);
        });
      } catch (error) {
        console.warn("[PWA] Service Worker registration failed:", error);
        // Don't throw error, just log it
      }
    } else {
      console.log(
        "[PWA] Service Worker not supported or not in secure context"
      );
    }
  }

  // Install Prompt Management
  setupInstallPrompt() {
    // Check if already installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    ) {
      this.isInstalled = true;
    }

    // Listen for beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallBanner();
    });

    // Listen for app installed event
    window.addEventListener("appinstalled", () => {
      this.isInstalled = true;
      this.deferredPrompt = null;
      this.hideInstallBanner();
      this.showInstallSuccessMessage();
    });
  }

  // Show Install Banner
  showInstallBanner() {
    if (this.isInstalled) return;

    const banner = document.createElement("div");
    banner.id = "pwa-install-banner";
    banner.innerHTML = `
      <div class="pwa-install-banner">
        <div class="install-content">
          <img src="/arulaxlogo.png" alt="AruLax Logo" class="install-logo">
          <div class="install-text">
            <h4>Install AruLax Web</h4>
            <p>Get quick access and enjoy offline functionality</p>
          </div>
        </div>
        <div class="install-actions">
          <button id="pwa-install-btn" class="install-btn">Install</button>
          <button id="pwa-dismiss-btn" class="dismiss-btn">×</button>
        </div>
      </div>
    `;

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
      .pwa-install-banner {
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(30, 60, 114, 0.95), rgba(42, 82, 152, 0.95));
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideUp 0.3s ease-out;
      }
      
      .install-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }
      
      .install-logo {
        width: 40px;
        height: 40px;
        border-radius: 8px;
      }
      
      .install-text h4 {
        margin: 0;
        font-size: 16px;
        color: white;
        font-weight: 600;
      }
      
      .install-text p {
        margin: 0;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
      }
      
      .install-actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .install-btn {
        background: linear-gradient(135deg, #007bff, #00b09b);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .install-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 123, 255, 0.4);
      }
      
      .dismiss-btn {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        font-size: 24px;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
      }
      
      .dismiss-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }
      
      @keyframes slideUp {
        from {
          transform: translateY(100px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      @media (max-width: 768px) {
        .pwa-install-banner {
          left: 10px;
          right: 10px;
          bottom: 10px;
          padding: 12px;
        }
        
        .install-content {
          gap: 10px;
        }
        
        .install-logo {
          width: 35px;
          height: 35px;
        }
        
        .install-text h4 {
          font-size: 15px;
        }
        
        .install-text p {
          font-size: 13px;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Add event listeners
    document.getElementById("pwa-install-btn").addEventListener("click", () => {
      this.installApp();
    });

    document.getElementById("pwa-dismiss-btn").addEventListener("click", () => {
      this.hideInstallBanner();
    });

    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (document.getElementById("pwa-install-banner")) {
        this.hideInstallBanner();
      }
    }, 10000);
  }

  // Hide Install Banner
  hideInstallBanner() {
    const banner = document.getElementById("pwa-install-banner");
    if (banner) {
      banner.style.animation = "slideDown 0.3s ease-out forwards";
      setTimeout(() => {
        banner.remove();
      }, 300);
    }
  }

  // Install App
  async installApp() {
    if (!this.deferredPrompt) return;

    try {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("[PWA] User accepted the install prompt");
      } else {
        console.log("[PWA] User dismissed the install prompt");
      }

      this.deferredPrompt = null;
      this.hideInstallBanner();
    } catch (error) {
      console.error("[PWA] Error during app installation:", error);
    }
  }

  // Show Install Success Message
  showInstallSuccessMessage() {
    const message = document.createElement("div");
    message.className = "pwa-success-message";
    message.innerHTML = `
      <div class="success-content">
        <span class="success-icon">✓</span>
        <span>App installed successfully!</span>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      .pwa-success-message {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4ade80, #22c55e);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(74, 222, 128, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
      }
      
      .success-content {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
      }
      
      .success-icon {
        font-size: 20px;
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(100px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(message);

    setTimeout(() => {
      message.style.animation = "slideOutRight 0.3s ease-out forwards";
      setTimeout(() => {
        message.remove();
      }, 300);
    }, 3000);
  }

  // Show Update Notification
  showUpdateNotification() {
    const notification = document.createElement("div");
    notification.className = "pwa-update-notification";
    notification.innerHTML = `
      <div class="update-content">
        <span class="update-icon">🔄</span>
        <div class="update-text">
          <h4>Update Available</h4>
          <p>New version is ready to install</p>
        </div>
      </div>
      <button id="pwa-update-btn" class="update-btn">Update</button>
    `;

    const style = document.createElement("style");
    style.textContent = `
      .pwa-update-notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, rgba(255, 165, 0, 0.95), rgba(255, 140, 0, 0.95));
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideDown 0.3s ease-out;
        max-width: 400px;
        width: calc(100% - 40px);
      }
      
      .update-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }
      
      .update-icon {
        font-size: 24px;
      }
      
      .update-text h4 {
        margin: 0;
        font-size: 16px;
        color: white;
        font-weight: 600;
      }
      
      .update-text p {
        margin: 0;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.9);
      }
      
      .update-btn {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .update-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
      }
      
      @keyframes slideDown {
        from {
          transform: translate(-50%, -100px);
          opacity: 0;
        }
        to {
          transform: translate(-50%, 0);
          opacity: 1;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(notification);

    document.getElementById("pwa-update-btn").addEventListener("click", () => {
      this.updateApp();
    });
  }

  // Update App
  updateApp() {
    if (this.swRegistration && this.swRegistration.waiting) {
      this.swRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  }

  // Online Status Management
  setupOnlineStatus() {
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.showOnlineStatus("You are back online!");
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
      this.showOnlineStatus("You are offline. Some features may be limited.");
    });
  }

  // Show Online Status
  showOnlineStatus(message) {
    const status = document.createElement("div");
    status.className = `online-status ${this.isOnline ? "online" : "offline"}`;
    status.textContent = message;

    const style = document.createElement("style");
    style.textContent = `
      .online-status {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 10px;
        text-align: center;
        font-weight: 600;
        z-index: 10001;
        animation: slideDown 0.3s ease-out;
      }
      
      .online-status.online {
        background: linear-gradient(135deg, #4ade80, #22c55e);
        color: white;
      }
      
      .online-status.offline {
        background: linear-gradient(135deg, #f87171, #ef4444);
        color: white;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(status);

    setTimeout(() => {
      status.style.animation = "slideUp 0.3s ease-out forwards";
      setTimeout(() => {
        status.remove();
      }, 300);
    }, 3000);
  }

  // Performance Monitoring
  setupPerformanceMonitoring() {
    if ("performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType("navigation")[0];
          console.log("[PWA] Performance metrics:", {
            loadTime: perfData.loadEventEnd - perfData.loadEventStart,
            domContentLoaded:
              perfData.domContentLoadedEventEnd -
              perfData.domContentLoadedEventStart,
            firstPaint: performance
              .getEntriesByType("paint")
              .find((entry) => entry.name === "first-paint")?.startTime,
            firstContentfulPaint: performance
              .getEntriesByType("paint")
              .find((entry) => entry.name === "first-contentful-paint")
              ?.startTime,
          });
        }, 0);
      });
    }
  }

  // Handle Service Worker Messages
  handleServiceWorkerMessage(data) {
    switch (data.type) {
      case "CACHE_UPDATED":
        console.log("[PWA] Cache updated");
        break;
      case "OFFLINE_MODE":
        this.showOnlineStatus("Running in offline mode");
        break;
      default:
        console.log("[PWA] Unknown message from service worker:", data);
    }
  }

  // Get PWA Status
  getPWAStatus() {
    return {
      isInstalled: this.isInstalled,
      isOnline: this.isOnline,
      canInstall: !!this.deferredPrompt,
      hasServiceWorker: !!this.swRegistration,
    };
  }

  // Clear All Caches
  async clearAllCaches() {
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
      console.log("[PWA] All caches cleared");
    }
  }
}

// Export singleton instance
const pwaUtils = new PWAUtils();
export default pwaUtils;
