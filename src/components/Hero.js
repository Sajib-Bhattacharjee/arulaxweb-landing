import React from "react";
import { motion } from "framer-motion";
import { FaArrowDown, FaCode, FaRocket, FaUsers } from "react-icons/fa";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { icon: <FaCode />, number: "50+", label: "Projects Completed" },
    { icon: <FaUsers />, number: "30+", label: "Happy Clients" },
    { icon: <FaRocket />, number: "5+", label: "Years Experience" },
  ];

  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 className="hero-title" variants={itemVariants}>
                We Build
                <span className="text-gradient"> Digital Dreams</span>
                Into Reality
              </motion.h1>

              <motion.p className="hero-subtitle" variants={itemVariants}>
                AruLaxWeb is your trusted partner in creating exceptional web
                experiences. We specialize in modern web development, mobile
                apps, and digital solutions that drive business growth.
              </motion.p>

              <motion.div className="hero-buttons" variants={itemVariants}>
                <motion.button
                  className="btn btn-primary btn-lg me-3"
                  onClick={() => scrollToSection("projects")}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(0,123,255,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Our Work
                </motion.button>
                <motion.button
                  className="btn btn-outline-light btn-lg"
                  onClick={() => scrollToSection("contact")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          <div className="col-lg-6">
            <motion.div
              className="hero-image-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="hero-image">
                <div className="floating-elements">
                  <motion.div
                    className="floating-element element-1"
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FaCode />
                  </motion.div>
                  <motion.div
                    className="floating-element element-2"
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <FaRocket />
                  </motion.div>
                  <motion.div
                    className="floating-element element-3"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 3, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                  >
                    <FaUsers />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="row">
            {stats.map((stat, index) => (
              <div key={index} className="col-md-4">
                <motion.div
                  className="stat-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        onClick={() => scrollToSection("about")}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaArrowDown />
      </motion.div>
    </section>
  );
};

export default Hero;
