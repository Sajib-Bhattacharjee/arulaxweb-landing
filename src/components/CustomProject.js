import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaRocket,
  FaCode,
  FaPalette,
  FaLightbulb,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

const CustomProject = () => {
  const canvasRef = useRef(null);
  const backgroundRef = useRef(null);
  const controls = useAnimation();

  const scrollToQuote = () => {
    window.open(
      "https://arulaxweb.netlify.app/#/quote",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Advanced particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 600;

    const particles = [];
    const particleCount = 100;

    // Create advanced particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.5 ? "#ff6b6b" : "#f9ca24",
        type: Math.random() > 0.6 ? "star" : "circle",
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
      canvas.width = window.innerWidth;
      canvas.height = 600;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Advanced background animation
  useEffect(() => {
    const startAnimation = () => {
      controls.start({
        background: [
          "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #ff6b6b 100%)",
          "linear-gradient(135deg, #f093fb 0%, #ff6b6b 25%, #667eea 50%, #764ba2 100%)",
          "linear-gradient(135deg, #764ba2 0%, #f093fb 25%, #ff6b6b 50%, #667eea 100%)",
          "linear-gradient(135deg, #ff6b6b 0%, #667eea 25%, #764ba2 50%, #f093fb 100%)",
          "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #ff6b6b 100%)",
        ],
        transition: {
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        },
      });
    };

    startAnimation();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const features = [
    {
      icon: <FaRocket />,
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising quality",
    },
    {
      icon: <FaCode />,
      title: "Custom Development",
      description: "Tailored solutions built specifically for your needs",
    },
    {
      icon: <FaPalette />,
      title: "Unique Design",
      description: "Creative and modern designs that stand out",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "Cutting-edge technologies and latest trends",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime guarantee",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Round-the-clock assistance and maintenance support",
    },
  ];

  return (
    <motion.section
      id="custom-project"
      className="custom-project-section"
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
            duration: 8,
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
            duration: 10,
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
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      <div className="container">
        <motion.div
          className="custom-project-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="custom-project-header" variants={itemVariants}>
            <motion.h2
              className="custom-project-title"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              You Need a{" "}
              <span
                style={{
                  background:
                    "linear-gradient(45deg, #ff6b6b, #f9ca24, #667eea, #764ba2)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 30px rgba(255, 107, 107, 0.5)",
                }}
              >
                Custom Project?
              </span>
            </motion.h2>

            <motion.p
              className="custom-project-subtitle"
              variants={itemVariants}
            >
              Let's bring your unique vision to life with our expert development
              team
            </motion.p>
          </motion.div>

          <motion.div className="features-grid" variants={itemVariants}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="feature-icon"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="cta-section" variants={itemVariants}>
            <motion.button
              className="custom-project-btn"
              onClick={scrollToQuote}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 107, 107, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 30px rgba(255, 107, 107, 0.3)",
                  "0 15px 35px rgba(249, 202, 36, 0.4)",
                  "0 10px 30px rgba(255, 107, 107, 0.3)",
                ],
              }}
              transition={{
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
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
                <FaRocket />
              </motion.span>
              Get Your Custom Quote
            </motion.button>

            <motion.p
              className="cta-note"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              ✨ Free consultation • No hidden fees • 24/7 support
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CustomProject;
