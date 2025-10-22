import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaRocket, FaFire } from "react-icons/fa";

const OfferTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const canvasRef = useRef(null);
  const backgroundRef = useRef(null);
  const controls = useAnimation();

  // Advanced particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Responsive canvas sizing
    const updateCanvasSize = () => {
      const width = window.innerWidth;
      const isMobile = width <= 768;
      canvas.width = width;
      canvas.height = isMobile
        ? Math.min(width * 0.8, 500)
        : Math.min(width * 0.5, 600);
    };

    updateCanvasSize();

    const particles = [];
    // Responsive particle count based on screen size
    const particleCount = window.innerWidth <= 768 ? 40 : 80;

    // Create advanced particles with different types
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.5 ? "#ff6b6b" : "#f9ca24",
        type: Math.random() > 0.7 ? "star" : "circle",
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        particle.pulse += 0.05;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;
        const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.2;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, pulseOpacity));

        if (particle.type === "star") {
          // Draw star
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5;
            const x = Math.cos(angle) * pulseSize;
            const y = Math.sin(angle) * pulseSize;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fillStyle = particle.color;
          ctx.fill();
        } else {
          // Draw circle
          ctx.beginPath();
          ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
      // Recreate particles on resize to match new dimensions
      particles.forEach((particle) => {
        if (particle.x > canvas.width) particle.x = canvas.width - 10;
        if (particle.y > canvas.height) particle.y = canvas.height - 10;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Advanced background animation
  useEffect(() => {
    const startAnimation = () => {
      controls.start({
        background: [
          "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #ff6b6b 50%, #f9ca24 100%)",
          "linear-gradient(135deg, #ff6b6b 0%, #f9ca24 25%, #667eea 50%, #764ba2 100%)",
          "linear-gradient(135deg, #764ba2 0%, #667eea 25%, #f9ca24 50%, #ff6b6b 100%)",
          "linear-gradient(135deg, #f9ca24 0%, #ff6b6b 25%, #764ba2 50%, #667eea 100%)",
          "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #ff6b6b 50%, #f9ca24 100%)",
        ],
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        },
      });
    };

    startAnimation();
  }, [controls]);

  useEffect(() => {
    // Set target date (7 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      className="offer-timer-section"
      ref={backgroundRef}
      animate={controls}
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <canvas ref={canvasRef} className="particle-canvas" />

      {/* Advanced background overlay */}
      <motion.div
        className="background-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="gradient-orb orb-1"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="gradient-orb orb-2"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="gradient-orb orb-3"
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      <div className="container">
        {/* Animated circular image at top center */}
        {/* <motion.div
          className="animated-logo"
          initial={{ opacity: 0, scale: 0, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="logo-container">
            <img
              src="/arulaxlogo.png"
              alt="AruLax Web Logo"
              className="logo-image"
            />
          </div>
        </motion.div> */}

        <div className="offer-timer-content">
          <motion.div
            className="offer-badge"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaRocket className="badge-icon" />
            </motion.div>
            <span
              style={{
                background:
                  "linear-gradient(45deg, #ff6b6b, #f9ca24, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                fontSize: "clamp(0.85rem, 2.5vw, 1.2rem)",
                textShadow:
                  "0 0 20px rgba(255, 107, 107, 0.8), 0 0 40px rgba(249, 202, 36, 0.6), 0 0 60px rgba(102, 126, 234, 0.4)",
                filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
                zIndex: "100",
                position: "relative",
                whiteSpace: "nowrap",
              }}
            >
              Limited Time Offer
            </span>
          </motion.div>

          <motion.h2
            className="offer-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <span
              style={{
                color: "#ffffff",
                display: "block",
                fontSize: "clamp(1.5rem, 5vw, 3rem)",
                fontWeight: "900",
                textShadow:
                  "3px 3px 6px rgba(0, 0, 0, 1), 0 0 15px rgba(0, 0, 0, 1)",
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 1))",
                zIndex: "100",
                position: "relative",
                marginBottom: "0.5rem",
              }}
            >
              Get Your Project Done
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(1.5rem, 5vw, 3rem)",
                fontWeight: "900",
                zIndex: "100",
                position: "relative",
                marginTop: "0.5rem",
              }}
            >
              {["5", "0", "%", " ", "O", "f", "f"].map((char, index) => {
                const gradients = [
                  "linear-gradient(45deg, #ff0000, #ff4444)",
                  "linear-gradient(45deg, #ffff00, #ffff44)",
                  "linear-gradient(45deg, #0066ff, #4488ff)",
                  "linear-gradient(45deg, #8800ff, #aa44ff)",
                  "linear-gradient(45deg, #ff0000, #ff4444)",
                  "linear-gradient(45deg, #ffff00, #ffff44)",
                  "linear-gradient(45deg, #0066ff, #4488ff)",
                ];
                return (
                  <motion.span
                    key={index}
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(255, 0, 0, 1)",
                        "0 0 20px rgba(255, 255, 0, 1)",
                        "0 0 20px rgba(0, 102, 255, 1)",
                        "0 0 20px rgba(136, 0, 255, 1)",
                        "0 0 20px rgba(255, 0, 0, 1)",
                        "0 0 20px rgba(255, 255, 0, 1)",
                        "0 0 20px rgba(0, 102, 255, 1)",
                      ][index],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.1,
                    }}
                    style={{
                      background: gradients[index],
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitTextFillColor: "transparent",
                      display: "inline-block",
                      textShadow:
                        "4px 4px 8px rgba(0, 0, 0, 1), 0 0 20px rgba(0, 0, 0, 1), 0 0 30px rgba(0, 0, 0, 1)",
                      filter:
                        "drop-shadow(0 6px 12px rgba(0, 0, 0, 1)) drop-shadow(0 0 20px rgba(0, 0, 0, 0.8))",
                      marginRight: char === " " ? "0.2em" : "0.1em",
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          </motion.h2>

          <motion.p
            className="offer-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: "clamp(0.9rem, 3vw, 1.3rem)",
                fontWeight: "600",
                textShadow:
                  "2px 2px 4px rgba(0, 0, 0, 1), 0 0 10px rgba(0, 0, 0, 1)",
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 1))",
                zIndex: "100",
                position: "relative",
                display: "block",
                maxWidth: "90%",
                margin: "0 auto",
              }}
            >
              Professional web development services at an unbeatable price
            </span>
          </motion.p>

          <motion.div
            className="countdown-timer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="timer-grid">
              <motion.div
                className="timer-unit"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="unit-value"
                  key={timeLeft.days}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {timeLeft.days}
                </motion.div>
                <div className="unit-label">Days</div>
              </motion.div>
              <motion.div
                className="timer-unit"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="unit-value"
                  key={timeLeft.hours}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {timeLeft.hours}
                </motion.div>
                <div className="unit-label">Hours</div>
              </motion.div>
              <motion.div
                className="timer-unit"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="unit-value"
                  key={timeLeft.minutes}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {timeLeft.minutes}
                </motion.div>
                <div className="unit-label">Minutes</div>
              </motion.div>
              <motion.div
                className="timer-unit"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="unit-value"
                  key={timeLeft.seconds}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {timeLeft.seconds}
                </motion.div>
                <div className="unit-label">Seconds</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.button
            className="offer-cta-btn"
            onClick={scrollToProjects}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              background: [
                "linear-gradient(135deg, #ff6b6b, #f9ca24)",
                "linear-gradient(135deg, #f9ca24, #ff6b6b)",
                "linear-gradient(135deg, #ff6b6b, #f9ca24)",
              ],
              boxShadow: [
                "0 10px 30px rgba(255, 107, 107, 0.4)",
                "0 15px 40px rgba(249, 202, 36, 0.6)",
                "0 10px 30px rgba(255, 107, 107, 0.4)",
              ],
            }}
            transition={{
              opacity: { delay: 1.1 },
              y: { delay: 1.1 },
              background: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: [
                "0 20px 50px rgba(255, 107, 107, 0.5)",
                "0 30px 70px rgba(249, 202, 36, 0.7)",
                "0 20px 50px rgba(255, 107, 107, 0.5)",
              ],
              y: -5,
              background: [
                "linear-gradient(135deg, #ff6b6b, #f9ca24)",
                "linear-gradient(135deg, #f9ca24, #ff6b6b)",
                "linear-gradient(135deg, #ff6b6b, #f9ca24)",
              ],
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaFire className="btn-icon" />
            </motion.div>
            <motion.span
              animate={{
                textShadow: [
                  "0 0 10px rgba(255, 255, 255, 0.5)",
                  "0 0 20px rgba(255, 255, 255, 0.8)",
                  "0 0 10px rgba(255, 255, 255, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Claim This Offer
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default OfferTimer;
