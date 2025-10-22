import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      if (window.globalCart && Array.isArray(window.globalCart)) {
        setCartItems(window.globalCart);
        return;
      }

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

    const handleStorageChange = (e) => {
      if (e.key === "projectCart") {
        loadCart();
      }
    };

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    if (window.location.hash === "#cart") {
      window.location.hash = "#";
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
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
    { name: "Offer", id: "projects" },
  ];

  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 1000,
    background: isScrolled
      ? "linear-gradient(135deg, rgba(30, 60, 114, 0.98) 0%, rgba(42, 82, 152, 0.98) 25%, rgba(0, 176, 155, 0.98) 75%, rgba(150, 201, 61, 0.98) 100%)"
      : "linear-gradient(135deg, rgba(30, 60, 114, 0.95) 0%, rgba(42, 82, 152, 0.95) 25%, rgba(0, 176, 155, 0.95) 75%, rgba(150, 201, 61, 0.95) 100%)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: isScrolled
      ? "0 8px 32px rgba(0, 0, 0, 0.2)"
      : "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    padding: "0.8rem 0",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    position: "relative",
  };

  const brandContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flex: "0 0 auto",
    cursor: "pointer",
    zIndex: 1001,
  };

  const logoStyle = {
    height: "40px",
    width: "auto",
    objectFit: "contain",
    transition: "transform 0.3s ease",
  };

  const brandTextStyle = {
    background:
      "linear-gradient(45deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "1.5rem",
    fontWeight: "700",
    filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
    whiteSpace: "nowrap",
    userSelect: "none",
  };

  const controlsContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flex: "0 0 auto",
    zIndex: 1001,
  };

  const cartIconContainerStyle = {
    position: "relative",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const cartIconStyle = {
    color: "white",
    fontSize: "1.2rem",
  };

  const cartBadgeStyle = {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    background: "linear-gradient(135deg, #ff6b6b, #f9ca24)",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.65rem",
    fontWeight: "700",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
  };

  const togglerStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    color: "white",
    fontSize: "1.3rem",
    padding: "0.5rem 0.6rem",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    display: "none",
  };

  const navMenuStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    margin: 0,
    padding: 0,
    listStyle: "none",
    width: "auto",
    flex: "0 0 auto",
  };

  const navLinkStyle = {
    color: "white",
    fontWeight: "600",
    padding: "0.7rem 1.5rem",
    borderRadius: "25px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
    textDecoration: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
  };

  const offerBtnStyle = {
    color: "white",
    fontWeight: "600",
    padding: "0.7rem 1.5rem",
    borderRadius: "25px",
    background: "linear-gradient(135deg, #ff6b6b, #f9ca24)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
    textDecoration: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
    animation: "pulse 2s ease-in-out infinite",
  };

  // Responsive styles
  const mobileStyles = `
    @media (max-width: 991px) {
      .header-nav-menu {
        display: none !important;
      }
      
      .header-nav-menu.open {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #00b09b 75%, #96c93d 100%);
        backdrop-filter: blur(25px);
        border-radius: 0 0 20px 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        padding: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        margin-top: 0.5rem;
        gap: 0.5rem;
        animation: slideDown 0.3s ease-out;
      }
      
      .header-nav-menu.open .nav-link {
        width: 100%;
        text-align: center;
      }
      
      .mobile-toggler {
        display: block !important;
      }
    }
    
    @media (max-width: 768px) {
      .brand-text {
        font-size: 1.3rem !important;
      }
      
      .logo-img {
        height: 32px !important;
      }
      
      .cart-icon-wrapper {
        padding: 0.4rem !important;
      }
    }
    
    @media (max-width: 576px) {
      .brand-text {
        font-size: 1.1rem !important;
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .logo-img {
        height: 28px !important;
      }
      
      .cart-icon-wrapper {
        padding: 0.35rem !important;
      }
      
      .cart-icon {
        font-size: 1rem !important;
      }
      
      .cart-badge {
        width: 18px !important;
        height: 18px !important;
        font-size: 0.6rem !important;
      }
    }
    
    @media (max-width: 480px) {
      .brand-text {
        font-size: 1rem !important;
        max-width: 100px;
      }
      
      .logo-img {
        height: 26px !important;
      }
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
      }
      50% {
        box-shadow: 0 6px 25px rgba(255, 107, 107, 0.6);
      }
    }
  `;

  return (
    <>
      <style>{mobileStyles}</style>
      <motion.header
        style={headerStyle}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div style={containerStyle}>
          {/* Logo/Brand */}
          <motion.div
            style={brandContainerStyle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="/arulaxlogo.png"
              alt="AruLax Logo"
              className="logo-img"
              style={logoStyle}
            />
            <span className="brand-text" style={brandTextStyle}>
              AruLax Web
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <ul
            className={`header-nav-menu ${isMenuOpen ? "open" : ""}`}
            style={navMenuStyle}
          >
            {menuItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ listStyle: "none" }}
              >
                {item.isExternal ? (
                  <motion.a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                    style={item.name === "Offer" ? offerBtnStyle : navLinkStyle}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      background:
                        item.name === "Offer"
                          ? "linear-gradient(135deg, #ff5252, #f39c12)"
                          : "rgba(255, 255, 255, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.name}
                  </motion.a>
                ) : (
                  <motion.button
                    className="nav-link"
                    style={item.name === "Offer" ? offerBtnStyle : navLinkStyle}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      background:
                        item.name === "Offer"
                          ? "linear-gradient(135deg, #ff5252, #f39c12)"
                          : "rgba(255, 255, 255, 0.2)",
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

          {/* Right Controls */}
          <div style={controlsContainerStyle}>
            {/* Cart Icon */}
            <motion.div
              className="cart-icon-wrapper"
              style={cartIconContainerStyle}
              whileHover={{
                scale: 1.1,
                background: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => (window.location.hash = "#cart")}
            >
              <FaShoppingCart className="cart-icon" style={cartIconStyle} />
              {cartItems.length > 0 && (
                <motion.span
                  className="cart-badge"
                  style={cartBadgeStyle}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </motion.span>
              )}
            </motion.div>

            {/* Mobile Toggler */}
            <motion.button
              className="mobile-toggler"
              style={togglerStyle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{
                background: "rgba(255, 255, 255, 0.25)",
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 360, opacity: 1 }}
                  exit={{ rotate: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Spacer to prevent content from going under fixed header */}
      <div style={{ height: "80px" }} />
    </>
  );
};

export default Header;
