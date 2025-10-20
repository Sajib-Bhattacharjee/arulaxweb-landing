import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaEye,
  FaSearch,
  FaShoppingCart,
  FaTag,
  FaCheckCircle,
  FaTrash,
} from "react-icons/fa";
import { projects } from "../data/projects";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      console.log("=== PROJECTS: LOADING CART ===");
      const savedCart = localStorage.getItem("projectCart");
      console.log("Projects - localStorage content:", savedCart);

      if (savedCart && savedCart !== "null" && savedCart !== "undefined") {
        try {
          const parsedCart = JSON.parse(savedCart);
          console.log("Projects - parsed cart:", parsedCart);
          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
            window.globalCart = parsedCart;
            console.log("Projects - cart loaded successfully:", parsedCart);
          } else {
            console.log("Projects - empty cart, setting empty array");
            setCartItems([]);
            window.globalCart = [];
          }
        } catch (error) {
          console.error("Projects - error parsing cart:", error);
          setCartItems([]);
          window.globalCart = [];
        }
      } else {
        console.log("Projects - no cart data, setting empty array");
        setCartItems([]);
        window.globalCart = [];
      }
    };

    loadCart();

    // Also load from global state if available
    if (window.globalCart && Array.isArray(window.globalCart)) {
      console.log("Projects - loading from global state:", window.globalCart);
      setCartItems(window.globalCart);
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    console.log("=== SAVING CART ===");
    console.log("Cart items to save:", cartItems);

    // Only save if cartItems is not empty or if it's intentionally being cleared
    if (cartItems.length > 0 || window.cartCleared) {
      localStorage.setItem("projectCart", JSON.stringify(cartItems));
      console.log("Cart saved to localStorage:", cartItems);
      window.cartCleared = false; // Reset flag
    } else {
      console.log(
        "Skipping save - cart is empty and not intentionally cleared"
      );
    }

    // Update global cart state
    window.globalCart = cartItems;
    console.log("Global cart updated:", window.globalCart);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("cartUpdated"));
    console.log("Cart update event dispatched");

    // Also dispatch a storage event manually for same-tab updates
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "projectCart",
        newValue: JSON.stringify(cartItems),
        storageArea: localStorage,
      })
    );
    console.log("Storage event dispatched");
  }, [cartItems]);

  const addToCart = (project) => {
    console.log("=== ADDING TO CART ===");
    console.log("Project to add:", project);
    console.log("Current cart items:", cartItems);

    const existingItem = cartItems.find((item) => item.id === project.id);
    let newCartItems;

    if (existingItem) {
      newCartItems = cartItems.map((item) =>
        item.id === project.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setNotificationMessage(`${project.title} quantity updated in cart!`);
    } else {
      newCartItems = [...cartItems, { ...project, quantity: 1 }];
      setNotificationMessage(`${project.title} added to cart successfully!`);
    }

    console.log("New cart items:", newCartItems);

    // Update state
    setCartItems(newCartItems);

    // Also store in global window object for immediate access
    window.globalCart = newCartItems;
    console.log("Global cart updated:", window.globalCart);

    // Force save to localStorage immediately
    localStorage.setItem("projectCart", JSON.stringify(newCartItems));
    console.log("Saved to localStorage:", localStorage.getItem("projectCart"));

    // Verify the save worked
    setTimeout(() => {
      const verifyCart = localStorage.getItem("projectCart");
      console.log("Verification - localStorage after save:", verifyCart);
      console.log(
        "Verification - parsed cart:",
        JSON.parse(verifyCart || "[]")
      );
    }, 100);

    // Show notification
    setShowNotification(true);

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const removeFromCart = (projectId) => {
    const itemToRemove = cartItems.find((item) => item.id === projectId);
    const newCartItems = cartItems.filter((item) => item.id !== projectId);
    setCartItems(newCartItems);
    // Update global cart state
    window.globalCart = newCartItems;
    setNotificationMessage(`${itemToRemove?.title} removed from cart!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const isInCart = (projectId) => {
    return cartItems.some((item) => item.id === projectId);
  };

  const categories = [
    "All",
    "Business",
    "Portfolio",
    "Admin",
    "Education",
    "eCommerce",
    "Restaurant",
    "Medical",
    "Coming Soon",
    "One Page",
    "Landing Page",
    "Corporate",
    "Agency",
    "Travel",
    "Hotel",
    "Events",
    "Photography",
    "Personal",
    "Resume / CV",
    "Real Estate",
    "Health",
    "Website Templates",
    "Construction",
    "Transportation",
    "Blog & Magazine",
    "Web Development",
    "SaaS Development",
    "Mobile Development",
    "Healthcare Tech",
    "EdTech",
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      },
    },
  };

  return (
    <section id="projects" className="projects-section py-5">
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
                <FaCheckCircle />
              </motion.div>
              <div className="notification-text">
                <h5>Success!</h5>
                <p>{notificationMessage}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container">
        <motion.div
          className="text-center mb-5"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="section-title">
            Our <span className="text-gradient">Work</span>
          </h2>
          <p className="section-subtitle">
            Explore our portfolio of successful projects and collaborations
          </p>
        </motion.div>

        <motion.div
          className="project-filters mb-5"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Search Input */}
          <div className="search-container mb-4">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search projects by title, description, or technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="filter-buttons">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`filter-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="row"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                className="col-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="no-results">
                  <FaSearch className="no-results-icon" />
                  <h4>No projects found</h4>
                  <p>Try adjusting your search terms or category filter</p>
                </div>
              </motion.div>
            ) : (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="col-lg-4 col-md-6 mb-4"
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="project-card"
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="project-image-container">
                      {/* 50% Off Badge */}
                      <motion.div
                        className="discount-badge"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <FaTag className="badge-icon" />
                        <span className="badge-text">50% OFF</span>
                      </motion.div>

                      {/* In Cart Badge */}
                      {isInCart(project.id) && (
                        <motion.div
                          className="in-cart-badge"
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.3,
                            type: "spring",
                            stiffness: 200,
                          }}
                          whileHover={{ scale: 1.1, rotate: -5 }}
                        >
                          <FaShoppingCart className="badge-icon" />
                          <span className="badge-text">IN CART</span>
                        </motion.div>
                      )}

                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-image"
                      />
                      <div
                        className={`project-overlay ${
                          hoveredProject === project.id ? "active" : ""
                        }`}
                      >
                        <div className="project-actions">
                          <motion.a
                            href={project.liveUrl}
                            className="action-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaExternalLinkAlt />
                          </motion.a>
                          <motion.a
                            href={project.githubUrl}
                            className="action-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaGithub />
                          </motion.a>
                          <motion.button
                            className="action-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaEye />
                          </motion.button>
                        </div>
                      </div>
                      <div className="project-category">{project.category}</div>
                    </div>

                    <div className="project-content">
                      <h4 className="project-title">{project.title}</h4>
                      <p className="project-description">
                        {project.description}
                      </p>

                      <div className="project-technologies">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Cart Action Button */}
                      {isInCart(project.id) ? (
                        <motion.button
                          className="remove-from-cart-btn"
                          onClick={() => removeFromCart(project.id)}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 8px 25px rgba(255, 107, 107, 0.4)",
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <FaTrash />
                          </motion.span>
                          Remove from Cart
                        </motion.button>
                      ) : (
                        <motion.button
                          className="add-to-cart-btn"
                          onClick={() => addToCart(project)}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 8px 25px rgba(255, 107, 107, 0.4)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          animate={{
                            boxShadow: [
                              "0 4px 15px rgba(255, 107, 107, 0.2)",
                              "0 6px 20px rgba(255, 107, 107, 0.3)",
                              "0 4px 15px rgba(255, 107, 107, 0.2)",
                            ],
                          }}
                          transition={{
                            boxShadow: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                        >
                          <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <FaShoppingCart />
                          </motion.span>
                          Add to Cart
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
