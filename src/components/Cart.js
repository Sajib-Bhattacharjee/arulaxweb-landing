import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaGithub,
  FaEye,
  FaSync,
  FaStore,
  FaBox,
  FaBook,
  FaRocket,
  FaBolt,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

// âœ… EMAILJS CONFIGURED - READY TO USE
const EMAILJS_CONFIG = {
  serviceId: "service_nxfft8o", // Your EmailJS Service ID
  templateId: "template_7wbakmm", // Your EmailJS Template ID
  publicKey: "KIuUNSFAOq0IwhtWK", // Your EmailJS Public Key
  adminTemplateId: "", // (Optional) For admin notifications - add if needed
  adminEmail: "", // (Optional) Your email to receive order notifications
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      console.log("=== LOADING CART ===");
      console.log("Current URL:", window.location.href);
      console.log("Current Hash:", window.location.hash);

      // Check global cart state first
      if (
        window.globalCart &&
        Array.isArray(window.globalCart) &&
        window.globalCart.length > 0
      ) {
        console.log("Loading cart from global state:", window.globalCart);
        setCartItems(window.globalCart);
        return;
      }

      // Check localStorage
      const savedCart = localStorage.getItem("projectCart");
      console.log("localStorage content:", savedCart);

      if (savedCart && savedCart !== "null" && savedCart !== "undefined") {
        try {
          const parsedCart = JSON.parse(savedCart);
          console.log("Parsed cart:", parsedCart);

          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
            window.globalCart = parsedCart;
            console.log(
              "Cart loaded successfully from localStorage:",
              parsedCart
            );
          } else {
            console.log("Cart is not an array, setting empty cart");
            setCartItems([]);
            window.globalCart = [];
          }
        } catch (error) {
          console.error("Error parsing cart data:", error);
          setCartItems([]);
          window.globalCart = [];
        }
      } else {
        console.log("No valid cart data found, adding sample items");

        // Add sample items to demonstrate the cart functionality
        const sampleItems = [
          {
            id: 1,
            title: "Business Management System",
            description:
              "Complete business management solution with CRM, inventory, and financial tracking.",
            image:
              "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            category: "Business",
            liveUrl: "#",
            githubUrl: "#",
            price: 2999,
            quantity: 1,
          },
          {
            id: 2,
            title: "Corporate Website",
            description:
              "Professional corporate website with modern design and advanced features.",
            image:
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            technologies: [
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
            ],
            category: "Corporate",
            liveUrl: "#",
            githubUrl: "#",
            price: 2499,
            quantity: 2,
          },
        ];

        setCartItems(sampleItems);
        window.globalCart = sampleItems;
        localStorage.setItem("projectCart", JSON.stringify(sampleItems));
      }
    };

    // Load cart immediately
    loadCart();

    // Load cart with multiple attempts
    const timeouts = [
      setTimeout(loadCart, 100),
      setTimeout(loadCart, 300),
      setTimeout(loadCart, 600),
      setTimeout(loadCart, 1000),
    ];

    // Listen for all possible events
    const handleStorageChange = (e) => {
      console.log("Storage change event:", e.key);
      if (e.key === "projectCart") {
        loadCart();
      }
    };

    const handleCartUpdate = () => {
      console.log("Cart update event received");
      loadCart();
    };

    const handleHashChange = () => {
      console.log("Hash change event:", window.location.hash);
      if (window.location.hash === "#cart") {
        loadCart();
      }
    };

    const handleFocus = () => {
      console.log("Window focus event");
      loadCart();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("Page visibility change - visible");
        loadCart();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Additional useEffect to ensure cart loads when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("Page became visible, reloading cart");
        const savedCart = localStorage.getItem("projectCart");
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            setCartItems(parsedCart);
          } catch (error) {
            console.error(
              "Error parsing cart data on visibility change:",
              error
            );
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Force reload cart when component mounts (for debugging)
  useEffect(() => {
    console.log("=== CART COMPONENT MOUNTED ===");
    console.log(
      "Force reload - localStorage content:",
      localStorage.getItem("projectCart")
    );
    console.log("Force reload - global cart:", window.globalCart);

    const forceLoadCart = () => {
      const savedCart = localStorage.getItem("projectCart");
      console.log("Force reload - localStorage content:", savedCart);

      if (savedCart && savedCart !== "null" && savedCart !== "undefined") {
        try {
          const parsedCart = JSON.parse(savedCart);
          console.log("Force reload - parsed cart:", parsedCart);
          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
            window.globalCart = parsedCart;
            console.log("Force reload - cart loaded successfully:", parsedCart);
          } else {
            setCartItems([]);
            window.globalCart = [];
          }
        } catch (error) {
          console.error("Error in force reload:", error);
          setCartItems([]);
          window.globalCart = [];
        }
      } else {
        setCartItems([]);
        window.globalCart = [];
      }
    };

    // Force load multiple times
    forceLoadCart();
    setTimeout(forceLoadCart, 100);
    setTimeout(forceLoadCart, 500);
    setTimeout(forceLoadCart, 1000);
  }, []);

  // Additional effect to reload cart when the page becomes visible
  useEffect(() => {
    const handlePageShow = () => {
      console.log("Page shown, reloading cart");
      const savedCart = localStorage.getItem("projectCart");
      if (savedCart && savedCart !== "null" && savedCart !== "undefined") {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
          }
        } catch (error) {
          console.error("Error reloading cart on page show:", error);
        }
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    // Only save if cartItems is not empty or if it's intentionally being cleared
    if (cartItems.length > 0 || window.cartCleared) {
      localStorage.setItem("projectCart", JSON.stringify(cartItems));
      console.log("Cart component - Cart saved to localStorage:", cartItems);
      window.cartCleared = false; // Reset flag
    } else {
      console.log(
        "Cart component - Skipping save - cart is empty and not intentionally cleared"
      );
    }

    // Update global cart state
    window.globalCart = cartItems;
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("cartUpdated"));
    // Also dispatch a storage event manually for same-tab updates
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "projectCart",
        newValue: JSON.stringify(cartItems),
        storageArea: localStorage,
      })
    );
  }, [cartItems]);

  const updateQuantity = (projectId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(projectId);
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item.id === projectId ? { ...item, quantity: newQuantity } : item
      )
    );
    setNotificationMessage("Cart updated successfully!");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const removeFromCart = (projectId) => {
    const itemToRemove = cartItems.find((item) => item.id === projectId);
    setCartItems(cartItems.filter((item) => item.id !== projectId));
    setNotificationMessage(`${itemToRemove?.title} removed from cart!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const clearCart = () => {
    window.cartCleared = true; // Set flag to allow saving empty cart
    setCartItems([]);
    window.globalCart = [];
    setNotificationMessage("Cart cleared successfully!");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const goBack = () => {
    window.history.back();
  };

  // Generate unique order ID
  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ARX-${timestamp}-${random}`;
  };

  // Send order directly to your Gmail
  const sendOrderEmail = async () => {
    console.log("=== ORDER NOW CLICKED ===");
    console.log("EmailJS Config:", EMAILJS_CONFIG);
    console.log("Cart Items:", cartItems);

    setIsSendingEmail(true);

    try {
      const orderId = generateOrderId();
      console.log("Generated Order ID:", orderId);
      const orderDate = new Date().toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      });

      // Format order items for email
      const orderItemsText = cartItems
        .map(
          (item, index) =>
            `${index + 1}. ${item.title}\n   Category: ${
              item.category
            }\n   Quantity: ${item.quantity}\n   Price: $${(
              item.price * 0.5
            ).toFixed(2)} each\n   Subtotal: $${(
              item.price *
              0.5 *
              item.quantity
            ).toFixed(2)}\n`
        )
        .join("\n");

      const subtotal = totalPrice.toFixed(2);
      const discount = (totalPrice * 0.5).toFixed(2);
      const totalAmount = (totalPrice * 0.5).toFixed(2);
      const youSaved = discount;

      // Email template parameters - sends directly to your Gmail
      const templateParams = {
        customer_name: "New Website Order",
        customer_email: "orders@arulaxweb.com",
        order_id: orderId,
        order_date: orderDate,
        total_items: totalItems,
        order_items: orderItemsText,
        subtotal: subtotal,
        discount: discount,
        total_amount: totalAmount,
        you_saved: youSaved,
      };

      // Send order details directly to your Gmail
      console.log("Sending email with params:", templateParams);

      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      console.log("Email sent successfully:", result);

      // Success - show confirmation
      setNotificationMessage("Your order has been placed successfully!");
      setShowNotification(true);

      // Clear cart and navigate home after delay
      setTimeout(() => {
        setShowNotification(false);
        clearCart();
        window.location.hash = "#"; // Navigate to home
      }, 3000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setNotificationMessage(
        "âŒ Failed to place order. Please try again or contact us directly."
      );
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const totalItems = safeCartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );
  const totalPrice = safeCartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="cart-section py-5">
      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="cart-notification"
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.5,
            }}
          >
            <motion.div
              className="notification-content"
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="notification-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              >
                <FaShoppingCart />
              </motion.div>
              <div className="notification-text">
                <h5>Cart Updated!</h5>
                <p>{notificationMessage}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container">
        {/* Header */}
        <motion.div
          className="cart-header mb-5"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <motion.button
                className="back-btn"
                onClick={goBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowLeft />
              </motion.button>
              <div>
                <h1 className="cart-title">
                  Shopping <span className="text-gradient">Cart</span>
                </h1>
                <p className="cart-subtitle">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in your
                  cart
                </p>
              </div>
            </div>
            <div className="cart-header-actions">
              <motion.button
                className="refresh-cart-btn"
                onClick={() => {
                  const savedCart = localStorage.getItem("projectCart");
                  if (savedCart) {
                    try {
                      const parsedCart = JSON.parse(savedCart);
                      setCartItems(parsedCart);
                      setNotificationMessage("Cart refreshed!");
                      setShowNotification(true);
                      setTimeout(() => setShowNotification(false), 2000);
                    } catch (error) {
                      console.error("Error refreshing cart:", error);
                    }
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FaSync />
                Refresh Cart
              </motion.button>
              <motion.button
                className="continue-shopping-btn"
                onClick={() => (window.location.href = "#projects")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#007bff",
                  color: "white",
                }}
              >
                <FaStore />
                Continue Shopping
              </motion.button>
              {cartItems.length > 0 && (
                <motion.button
                  className="clear-cart-btn"
                  onClick={clearCart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <FaTrash />
                  Clear Cart
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Cart Content */}
        {safeCartItems.length === 0 ? (
          <motion.div
            className="empty-cart"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="empty-cart-icon"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaShoppingCart />
            </motion.div>
            <h3>Your Cart is empty</h3>
            <p>Add some amazing projects to get started!</p>
            <div className="empty-cart-actions">
              <motion.button
                className="continue-shopping-btn"
                onClick={() => (window.location.href = "#projects")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaStore />
                Continue Shopping
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div>
            <motion.div
              className="row"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Product Details - Left Side */}
              <div className="col-lg-8">
                <motion.div
                  className="product-details-container"
                  variants={itemVariants}
                >
                  <h3 className="section-title">Selected Products</h3>
                  <div className="products-list">
                    <AnimatePresence>
                      {safeCartItems
                        .filter((item) => item && typeof item === "object")
                        .map((item, index) => (
                          <motion.div
                            key={item.id ?? index}
                            className="product-detail-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {/* Product Image Section */}
                            <div className="product-image-section">
                              <img
                                src={
                                  item.image ||
                                  "https://via.placeholder.com/640x360?text=Project"
                                }
                                alt={item.title || "Project"}
                              />
                              <div className="product-category">
                                {item.category || "General"}
                              </div>
                            </div>

                            {/* Product Information Section */}
                            <div className="product-info-section">
                              <h4 className="product-title">
                                {item.title || "Untitled Project"}
                              </h4>
                              <p className="product-description">
                                {item.description ||
                                  "No description available."}
                              </p>

                              {/* Product Details Grid */}
                              <div className="product-details-grid">
                                <div className="detail-item">
                                  <span className="detail-label">
                                    Project ID:
                                  </span>
                                  <span className="detail-value">
                                    #{item.id}
                                  </span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">
                                    Category:
                                  </span>
                                  <span className="detail-value category-badge">
                                    {item.category || "General"}
                                  </span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">
                                    Original Price:
                                  </span>
                                  <span className="detail-value original-price">
                                    ${item.price?.toFixed(2) || "0.00"}
                                  </span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">
                                    Discount:
                                  </span>
                                  <span className="detail-value discount-badge">
                                    50% OFF
                                  </span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">
                                    Final Price:
                                  </span>
                                  <span className="detail-value final-price">
                                    ${((item.price || 0) * 0.5).toFixed(2)}
                                  </span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">
                                    Quantity:
                                  </span>
                                  <span className="detail-value quantity-display">
                                    {item.quantity}
                                  </span>
                                </div>
                              </div>

                              {/* Technologies Section */}
                              <div className="technologies-section">
                                <span className="section-label">
                                  Technologies:
                                </span>
                                <div className="tech-tags">
                                  {(item.technologies || []).map(
                                    (tech, techIndex) => (
                                      <span
                                        key={techIndex}
                                        className="tech-tag"
                                      >
                                        {tech}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>

                              {/* Features Section */}
                              <div className="features-section">
                                <span className="section-label">Features:</span>
                                <ul className="features-list">
                                  <li>âœ… Responsive Design</li>
                                  <li>âœ… Modern UI/UX</li>
                                  <li>âœ… Cross-browser Compatible</li>
                                  <li>âœ… SEO Optimized</li>
                                  <li>âœ… Fast Loading</li>
                                  <li>âœ… Mobile Friendly</li>
                                </ul>
                              </div>

                              {/* Product Actions */}
                              <div className="product-actions">
                                <motion.a
                                  href={item.liveUrl}
                                  className="action-btn live-demo"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <FaExternalLinkAlt />
                                  Live Demo
                                </motion.a>
                                <motion.a
                                  href={item.githubUrl}
                                  className="action-btn source-code d-md-none"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <FaGithub />
                                  Source Code
                                </motion.a>
                                <motion.button
                                  className="action-btn preview d-md-none"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <FaEye />
                                  Preview
                                </motion.button>
                              </div>
                            </div>

                            {/* Product Controls */}
                            <div className="product-controls">
                              <div className="quantity-controls">
                                <motion.button
                                  className="quantity-btn decrease"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <FaMinus />
                                </motion.button>
                                <span className="quantity">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  className="quantity-btn increase"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <FaPlus />
                                </motion.button>
                              </div>

                              <div className="item-total">
                                <span>
                                  Item Total: $
                                  {(
                                    (item.price || 0) *
                                    0.5 *
                                    item.quantity
                                  ).toFixed(2)}
                                </span>
                              </div>

                              <motion.button
                                className="remove-btn"
                                onClick={() => removeFromCart(item.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <FaTrash />
                                Remove
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* Order Summary - Right Side */}
              <div className="col-lg-4">
                <motion.div
                  className="order-summary-container"
                  variants={itemVariants}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="section-title">Order Summary</h3>
                  <div className="summary-card">
                    <div className="summary-header">
                      <h4>Your Order</h4>
                      <span className="item-count">
                        {totalItems} {totalItems === 1 ? "item" : "items"}
                      </span>
                    </div>

                    <div className="summary-details">
                      <div className="summary-row">
                        <span>Subtotal:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="summary-row discount">
                        <span>Discount (50% Off):</span>
                        <span>-${(totalPrice * 0.5).toFixed(2)}</span>
                      </div>
                      <div className="summary-row total">
                        <span>Total:</span>
                        <span>${(totalPrice * 0.5).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="savings-info">
                      <span className="savings-text">
                        You save: ${(totalPrice * 0.5).toFixed(2)}
                      </span>
                    </div>

                    <motion.button
                      className="order-now-btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={sendOrderEmail}
                      disabled={isSendingEmail}
                    >
                      <FaShoppingCart />
                      {isSendingEmail ? "Placing Order..." : "Order Now"}
                    </motion.button>

                    <div className="order-benefits">
                      <h5>What's Included:</h5>
                      <ul>
                        <li>
                          <FaBox className="benefit-icon" />
                          <span>Complete Source Code</span>
                        </li>
                        <li>
                          <FaBook className="benefit-icon" />
                          <span>Documentation</span>
                        </li>
                        <li>
                          <FaRocket className="benefit-icon" />
                          <span>Lifetime Support</span>
                        </li>
                        <li>
                          <FaBolt className="benefit-icon" />
                          <span>Instant Download</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
