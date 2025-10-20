import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowUp,
  FaPaperPlane,
  FaCheckCircle,
  FaHeart,
  FaStar,
  FaRocket,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="footer">
      {/* Enhanced Background Effects */}
      <div className="footer-bg-effects">
        <div className="footer-particles"></div>
        <div className="footer-gradient-overlay"></div>
      </div>

      <div className="container">
        <motion.div
          className="footer-main"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="row align-items-center">
            {/* Enhanced Brand Section */}
            <div className="col-lg-4 col-md-6 mb-4">
              <motion.div
                className="footer-brand-section"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="footer-brand">
                  <motion.div
                    className="logo-container"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src="/arulaxlogo.png"
                      alt="AruLax Logo"
                      className="footer-logo"
                    />
                  </motion.div>
                  <motion.h5
                    className="brand-name"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(255, 255, 255, 0.3)",
                        "0 0 30px rgba(0, 123, 255, 0.4)",
                        "0 0 20px rgba(255, 255, 255, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    AruLax Web
                  </motion.h5>
                </div>
                <p className="brand-description">
                  We build digital dreams into reality. Your trusted partner in
                  creating exceptional web experiences, mobile apps, and digital
                  solutions that drive business growth.
                </p>
              </motion.div>
            </div>

            {/* Newsletter Section */}
            <div className="col-lg-4 col-md-6 mb-4">
              <motion.div
                className="newsletter-section"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="newsletter-card"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h6 className="newsletter-title">
                    <FaStar className="title-icon" />
                    Subscribe to Newsletter
                  </h6>
                  <p className="newsletter-description">
                    Stay updated with our latest projects and offers
                  </p>
                  <form
                    onSubmit={handleNewsletterSubmit}
                    className="newsletter-form"
                  >
                    <div className="newsletter-input-group">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="newsletter-input"
                        required
                      />
                      <motion.button
                        type="submit"
                        className="newsletter-btn"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isSubscribed ? <FaCheckCircle /> : <FaRocket />}
                      </motion.button>
                    </div>
                    {isSubscribed && (
                      <motion.div
                        className="newsletter-success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <FaHeart className="success-icon" />
                        Thank you for subscribing!
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              </motion.div>
            </div>

            {/* Action Section */}
            <div className="col-lg-4 col-md-12 mb-4">
              <motion.div
                className="footer-actions"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="https://arulaxweb.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vip-explore-btn"
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 15px 30px rgba(255, 215, 0, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 8px 20px rgba(255, 215, 0, 0.2)",
                      "0 12px 25px rgba(255, 215, 0, 0.3)",
                      "0 8px 20px rgba(255, 215, 0, 0.2)",
                    ],
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <motion.span
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ⭐
                  </motion.span>
                  Explore More
                </motion.a>

                <motion.button
                  className="back-to-top"
                  onClick={scrollToTop}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 5px 15px rgba(255, 255, 255, 0.1)",
                      "0 8px 20px rgba(255, 255, 255, 0.2)",
                      "0 5px 15px rgba(255, 255, 255, 0.1)",
                    ],
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  aria-label="Back to Top"
                >
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FaArrowUp />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="copyright"
            whileHover={{
              scale: 1.05,
              color: "#00b09b",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            © 2025 AruLax Web. Made with <FaHeart className="heart-icon" /> for
            you.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
