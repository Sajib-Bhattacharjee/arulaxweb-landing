import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaCheckCircle,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const canvasRef = useRef(null);

  // Floating shapes animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 800;

    const shapes = [];
    const shapeCount = 20;

    // Create floating shapes
    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.5 ? "#667eea" : "#764ba2",
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.rotation += shape.rotationSpeed;

        if (shape.x < 0 || shape.x > canvas.width) shape.vx *= -1;
        if (shape.y < 0 || shape.y > canvas.height) shape.vy *= -1;

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.fillStyle = `${shape.color}${Math.floor(shape.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 800;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!values.name.trim()) {
      alert("Please enter your name");
      return false;
    }
    if (!values.email.trim()) {
      alert("Please enter your email");
      return false;
    }
    if (!values.email.includes("@")) {
      alert("Please enter a valid email address");
      return false;
    }
    if (!values.subject.trim()) {
      alert("Please enter a subject");
      return false;
    }
    if (!values.message.trim()) {
      alert("Please enter your message");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);

      const form = e.target;

      // Simulating API call
      try {
        // Use FormData for more reliable Formspree submission
        const formData = new FormData(form);

        const response = await fetch("https://submit-form.com/SKYUhHlmF", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });
        if (response.ok) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setShowSuccess(true);
          setValues({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });

          // Hide success message after 5 seconds
          setTimeout(() => {
            setShowSuccess(false);
          }, 5000);
        } else {
          alert("There was an error submitting the form. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("There was an error submitting the form. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email",
      info: "arulaxweb@gmail.com",
      link: "mailto:arulaxweb@gmail.com",
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      info: "+8801518465346",
      link: "tel:+8801518465346",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      info: "Khulna, Bangladesh",
      link: "#",
    },
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, url: "#", label: "LinkedIn" },
    { icon: <FaTwitter />, url: "#", label: "Twitter" },
    { icon: <FaGithub />, url: "#", label: "GitHub" },
  ];

  return (
    <section id="contact" className="contact-section py-5">
      <canvas ref={canvasRef} className="contact-canvas" />
      <div className="container">
        <motion.div
          className="text-center mb-5"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="section-title"
            animate={{
              textShadow: [
                "0 0 20px rgba(0, 123, 255, 0.3)",
                "0 0 30px rgba(0, 123, 255, 0.5)",
                "0 0 20px rgba(0, 123, 255, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Get In <span className="text-gradient">Touch</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Ready to start your project? Let's discuss your ideas
          </motion.p>
        </motion.div>

        <motion.div
          className="row"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="col-lg-8">
            <motion.div
              className="contact-form-container"
              variants={itemVariants}
            >
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={values.name}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={values.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={values.subject}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-4">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={values.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="form-control"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={isSubmitting}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 15px 35px rgba(0, 123, 255, 0.4)",
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={
                    isSubmitting
                      ? {
                          boxShadow: [
                            "0 0 20px rgba(0, 123, 255, 0.3)",
                            "0 0 30px rgba(0, 123, 255, 0.6)",
                            "0 0 20px rgba(0, 123, 255, 0.3)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1,
                    repeat: isSubmitting ? Infinity : 0,
                  }}
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <FaPaperPlane className="me-2" />
                      </motion.div>
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              {/* Success Message */}
              {showSuccess && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="success-icon"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <FaCheckCircle />
                  </motion.div>
                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Message Sent Successfully!
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Thank you for your message! We'll get back to you within 24
                    hours.
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          </div>

          <div className="col-lg-4">
            <motion.div className="contact-info" variants={itemVariants}>
              <h4>Contact Information</h4>
              <p>
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </p>

              <div className="contact-details">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="contact-item"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="contact-icon">{info.icon}</div>
                    <div className="contact-text">
                      <h6>{info.title}</h6>
                      <a href={info.link}>{info.info}</a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="social-links">
                <h6>Follow Us</h6>
                <div className="social-icons">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      className="social-icon"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
