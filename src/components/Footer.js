import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaArrowUp,
  FaCheckCircle,
  FaHeart,
  FaStar,
  FaRocket,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices to disable problematic animations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Motion variants for animations
  const fadeInUp = (delay = 0) => ({
    initial: isMobile ? { opacity: 1 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: isMobile
      ? { duration: 0 }
      : { duration: 0.8, delay, ease: "easeOut" },
    viewport: { once: true, margin: "0px" },
  });

  const fadeInSide = (delay = 0, fromLeft = true) => ({
    initial: isMobile
      ? { opacity: 1, x: 0 }
      : { opacity: 0, x: fromLeft ? -20 : 20 },
    whileInView: { opacity: 1, x: 0 },
    transition: isMobile ? { duration: 0 } : { duration: 0.6, delay },
    viewport: { once: true, margin: "0px" },
  });

  const hoverScale = (scale = 1.05) =>
    isMobile ? {} : { scale, transition: { type: "spring", stiffness: 300 } };

  const glowAnimation = (colors) =>
    isMobile
      ? {}
      : {
          boxShadow: colors,
          transition: {
            boxShadow: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          },
        };

  const rotateAnimation = (from, to) =>
    isMobile
      ? {}
      : {
          rotate: [from, to],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        };

  return (
    <footer className="footer" style={{ touchAction: "pan-y pinch-zoom" }}>
      {/* Enhanced Background Effects */}
      <div className="footer-bg-effects">
        <div className="footer-particles"></div>
        <div className="footer-gradient-overlay"></div>
      </div>

      <div className="container" style={{ maxWidth: "100%" }}>
        <motion.div className="footer-main" {...fadeInUp()}>
          <div className="row align-items-center">
            {/* Enhanced Brand Section */}
            <div className="col-lg-4 col-md-6 mb-4">
              <motion.div
                className="footer-brand-section"
                {...fadeInSide(0.1, true)}
              >
                <div className="footer-brand">
                  <motion.div
                    className="logo-container"
                    whileHover={hoverScale(1.1)}
                  >
                    <img
                      src="/arulaxlogo.png"
                      alt="AruLax Logo"
                      className="footer-logo"
                    />
                  </motion.div>
                  <h5 className="brand-name">AruLax Web</h5>
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
                {...fadeInSide(0.2, false)}
              >
                <motion.div
                  className="newsletter-card"
                  whileHover={hoverScale(1.02)}
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
                        whileHover={hoverScale(1.1)}
                        whileTap={isMobile ? {} : { scale: 0.9 }}
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
              <motion.div className="footer-actions" {...fadeInUp(0.3)}>
                <motion.a
                  href="https://arulaxweb.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vip-explore-btn"
                  whileHover={
                    isMobile
                      ? {}
                      : {
                          scale: 1.1,
                          y: -5,
                          boxShadow: "0 15px 30px rgba(255, 215, 0, 0.3)",
                        }
                  }
                  whileTap={isMobile ? {} : { scale: 0.95 }}
                  animate={glowAnimation([
                    "0 8px 20px rgba(255, 215, 0, 0.2)",
                    "0 12px 25px rgba(255, 215, 0, 0.3)",
                    "0 8px 20px rgba(255, 215, 0, 0.2)",
                  ])}
                >
                  <motion.span animate={rotateAnimation(0, 5)}>⭐</motion.span>
                  Explore More
                </motion.a>

                <motion.button
                  className="back-to-top"
                  onClick={scrollToTop}
                  whileHover={
                    isMobile
                      ? {}
                      : {
                          scale: 1.1,
                          y: -5,
                          boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)",
                        }
                  }
                  whileTap={isMobile ? {} : { scale: 0.95 }}
                  animate={glowAnimation([
                    "0 5px 15px rgba(255, 255, 255, 0.1)",
                    "0 8px 20px rgba(255, 255, 255, 0.2)",
                    "0 5px 15px rgba(255, 255, 255, 0.1)",
                  ])}
                  aria-label="Back to Top"
                >
                  <motion.div
                    animate={isMobile ? {} : { y: [0, -2, 0] }}
                    transition={
                      isMobile
                        ? {}
                        : {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                  >
                    <FaArrowUp />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div className="footer-bottom" {...fadeInUp(0.4)}>
          <motion.p
            className="copyright"
            whileHover={
              isMobile
                ? {}
                : {
                    scale: 1.05,
                    color: "#00b09b",
                  }
            }
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
