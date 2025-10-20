import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load cart from localStorage and listen for changes
  useEffect(() => {
    const loadCart = () => {
      // First check global cart state
      if (window.globalCart && Array.isArray(window.globalCart)) {
        setCartItems(window.globalCart);
        return;
      }

      // Fallback to localStorage
      const savedCart = localStorage.getItem("projectCart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
            window.globalCart = parsedCart;
          }
        } catch (error) {
          console.error("Error loading cart in header:", error);
        }
      }
    };

    loadCart();

    // Listen for storage changes (when cart is updated from other components)
    const handleStorageChange = (e) => {
      if (e.key === "projectCart") {
        loadCart();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events for same-tab updates
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    // Check if we're currently on the cart page
    if (window.location.hash === "#cart") {
      // If on cart page, navigate to home first, then scroll to section
      window.location.hash = "#";
      // Use setTimeout to ensure the page transition completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Normal behavior when not on cart page
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    {
      name: "Explore",
      id: "projects",
      isExternal: true,
      url: "https://arulaxweb.netlify.app/",
    },
    { name: "Custom Project", id: "custom-project" },
    { name: "Contact", id: "contact" },
    { name: "Offer", id: "projects" }, // Offer redirects to Projects
  ];

  return (
    <motion.header
      className={`navbar navbar-expand-lg fixed-top ${
        isScrolled ? "navbar-scrolled" : "navbar-transparent"
      }`}
      style={{
        background:
          "linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #00b09b 75%, #96c93d 100%)",
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container">
        <motion.div
          className="navbar-brand"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src="/arulaxlogo.png"
            alt="AruLax Logo"
            className="img-fluid"
            style={{
              height: "40px",
              width: "auto",
              objectFit: "contain",
              maxHeight: "40px",
              margin: "0 6px",
            }}
          />
          <span
            className="brand-text"
            style={{
              background:
                "linear-gradient(45deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              textShadow:
                "0 0 30px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 255, 0, 0.7), 0 0 50px rgba(0, 255, 0, 0.6), 0 0 60px rgba(0, 255, 255, 0.5), 0 0 70px rgba(0, 0, 255, 0.4), 0 0 80px rgba(255, 0, 255, 0.3)",
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
            }}
          >
            AruLax Web
          </span>
        </motion.div>

        {/* Cart Icon */}
        <motion.div
          className="cart-icon-container"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => (window.location.hash = "#cart")}
        >
          <FaShoppingCart className="cart-icon" />
          {cartItems.length > 0 && (
            <motion.span
              className="cart-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </motion.span>
          )}
        </motion.div>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.id}
                className="nav-item"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.isExternal ? (
                  <motion.a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`nav-link ${
                      item.name === "Offer" ? "offer-btn" : ""
                    }`}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow:
                        item.name === "Offer"
                          ? "0 10px 30px rgba(255, 107, 107, 0.4)"
                          : "0 5px 15px rgba(0, 123, 255, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.name}
                  </motion.a>
                ) : (
                  <motion.button
                    className={`nav-link ${
                      item.name === "Offer" ? "offer-btn" : ""
                    }`}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow:
                        item.name === "Offer"
                          ? "0 10px 30px rgba(255, 107, 107, 0.4)"
                          : "0 5px 15px rgba(0, 123, 255, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.name}
                  </motion.button>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
