"use client"

import { useState, useEffect, useRef } from "react"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import axios from "axios"
import Lottie from "lottie-react"
import codeIcon from "./assets/code-icon.json"
import codingAnimation from "./assets/coding-animation.json"
import reviewAnimation from "./assets/review-animation.json"
import securityAnimation from "./assets/security-animation.json"
import performanceAnimation from "./assets/performance-animation.json"
import "highlight.js/styles/github-dark.css"
import "prismjs/themes/prism-tomorrow.css"
import "./App.css"

export default function App() {
  const [code, setCode] = useState(`function greet() {\n  return 'Hello, World!';\n}`)
  const [review, setReview] = useState("")
  const [darkMode, setDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showReviewer, setShowReviewer] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [typingText, setTypingText] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)

  const typingPhrases = [
    "Elevate Your Code Quality with AI-Powered Reviews",
    "Transform Your Development Workflow with Intelligent Feedback",
    "Catch Bugs Before They Reach Production",
    "Learn Best Practices While You Code",
  ]

  const typingRef = useRef(null)
  const phraseIndex = useRef(0)
  const charIndex = useRef(0)
  const isDeleting = useRef(false)
  const typingSpeed = useRef(100)
  const pauseDuration = 2000

  useEffect(() => {
    prism.highlightAll()
  }, [code])

  useEffect(() => {
    function typeText() {
      const currentPhrase = typingPhrases[phraseIndex.current]

      if (isDeleting.current) {
        charIndex.current--
        typingSpeed.current = 50
      } else {
        charIndex.current++
        typingSpeed.current = 100
      }

      setTypingText(currentPhrase.substring(0, charIndex.current))

      if (!isDeleting.current && charIndex.current === currentPhrase.length) {
        // Pause at the end of typing
        isDeleting.current = true
        typingSpeed.current = pauseDuration
      } else if (isDeleting.current && charIndex.current === 0) {
        isDeleting.current = false
        phraseIndex.current = (phraseIndex.current + 1) % typingPhrases.length
      }
    }

    const timer = setTimeout(typeText, typingSpeed.current)
    return () => clearTimeout(timer)
  }, [typingText])

  async function reviewCode() {
    setIsLoading(true)
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code })
      setReview(response.data)
    } catch (error) {
      console.error("Error reviewing code:", error)
      setReview("Error reviewing code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTheme = () => setDarkMode(!darkMode)

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openCodeReviewer = () => {
    setShowReviewer(true)
    // Scroll to top when opening reviewer
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const closeCodeReviewer = () => {
    setShowReviewer(false)
  }

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <div className="background-gradient"></div>

      {showReviewer ? (
        // Code Reviewer Section
        <>
          <header className="header reviewer-header">
            <div className="logo-container">
              <div className="logo-animation">
                <Lottie animationData={codeIcon} loop={true} />
              </div>
              <h1>Code Reviewer</h1>
            </div>
            <div className="header-buttons">
              <button className="review-button" onClick={reviewCode} disabled={isLoading}>
                {isLoading ? "Analyzing..." : "🚀 Review My Code"}
              </button>
              <button className="theme-button" onClick={toggleTheme}>
                {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
              </button>
              <button className="back-button" onClick={closeCodeReviewer}>
                Back to Home
              </button>
            </div>
          </header>

          <main className="main">
            <div className="editor-container">
              <h2>Your Code</h2>
              <div className="editor">
                <Editor
                  value={code}
                  onValueChange={(code) => setCode(code)}
                  highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
                  padding={16}
                  style={{
                    fontFamily: "Fira Code, monospace",
                    fontSize: 16,
                    backgroundColor: darkMode ? "#1a2e23" : "#f8f9fa",
                    color: darkMode ? "#f8f9fa" : "#1a2e23",
                    borderRadius: "10px",
                    minHeight: "300px",
                    width: "100%",
                    boxShadow: darkMode ? "0 4px 20px rgba(0, 0, 0, 0.3)" : "0 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
            </div>

            <div className="review-container">
              <h2>AI Review</h2>
              <div className="review">
                {isLoading ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Analyzing your code...</p>
                  </div>
                ) : review ? (
                  <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
                ) : (
                  <div className="empty-review">
                    <p>Click "Review My Code" to get AI feedback on your code.</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </>
      ) : (
        // Landing Page
        <>
          <nav className="navbar">
            <div className="logo-container">
              <div className="logo-animation">
                <Lottie animationData={codeIcon} loop={true} />
              </div>
              <h2>CodeReviewer AI</h2>
            </div>
            <div className="nav-links">
              <button className={activeSection === "home" ? "active" : ""} onClick={() => scrollToSection("home")}>
                Home
              </button>
              <button
                className={activeSection === "features" ? "active" : ""}
                onClick={() => scrollToSection("features")}
              >
                Features
              </button>
              <button className={activeSection === "about" ? "active" : ""} onClick={() => scrollToSection("about")}>
                About
              </button>
              <button className="theme-toggle" onClick={toggleTheme}>
                {darkMode ? "🌞" : "🌙"}
              </button>
            </div>
            <button className="cta-button" onClick={openCodeReviewer}>
              Try Code Reviewer
            </button>
          </nav>

          <section id="home" className="hero-section">
            <div className="hero-content">
              <h1 className="typing-effect">
                {typingText}
                <span className="cursor">|</span>
              </h1>
              <p>
                Get instant, intelligent feedback on your code to improve performance, readability, and best practices.
              </p>
              <button className="cta-button-large" onClick={openCodeReviewer}>
                Start Reviewing Your Code
              </button>
            </div>
            <div className="hero-animation">
              <Lottie animationData={codingAnimation} loop={true} />
            </div>
          </section>

          <section className="stats-section">
            <div className="stat-card">
              <h2 className="counter">150+</h2>
              <p>Code Reviews Completed</p>
            </div>
            <div className="stat-card">
              <h2 className="counter">98%</h2>
              <p>User Satisfaction</p>
            </div>
            <div className="stat-card">
              <h2 className="counter">24/7</h2>
              <p>Availability</p>
            </div>
            <div className="stat-card">
              <h2 className="counter">10+</h2>
              <p>Languages Supported</p>
            </div>
          </section>

          <section id="features" className="features-section">
            <h2 className="section-title">Powerful Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-animation">
                  <Lottie animationData={reviewAnimation} loop={true} />
                </div>
                <h3>Intelligent Code Analysis</h3>
                <p>Our AI analyzes your code for bugs, performance issues, and adherence to best practices.</p>
              </div>
              <div className="feature-card">
                <div className="feature-animation">
                  <Lottie animationData={securityAnimation} loop={true} />
                </div>
                <h3>Security Vulnerability Detection</h3>
                <p>Identify potential security risks and vulnerabilities in your code before deployment.</p>
              </div>
              <div className="feature-card">
                <div className="feature-animation">
                <Lottie animationData={codingAnimation} loop={true} />

                </div>
                <h3>Code Style Recommendations</h3>
                <p>Get suggestions to improve code readability and maintain consistent coding standards.</p>
              </div>
              <div className="feature-card">
                <div className="feature-animation">
                <Lottie animationData={performanceAnimation} loop={true} />
                </div>
                <h3>Performance Optimization</h3>
                <p>Receive tips to optimize your code for better performance and efficiency.</p>
              </div>
            </div>
          </section>

          <section id="about" className="about-section">
            <div className="about-content">
              <h2 className="section-title">About CodeReviewer AI</h2>
              <p>
                CodeReviewer AI is an intelligent code analysis tool designed to help developers write better, cleaner,
                and more efficient code. Our platform uses advanced AI algorithms to analyze your code and provide
                actionable feedback.
              </p>
              <p>
                Whether you're a beginner learning to code or an experienced developer looking to improve your skills,
                CodeReviewer AI is your trusted companion for code quality assurance.
              </p>
              <button className="cta-button" onClick={openCodeReviewer}>
                Try It Now
              </button>
            </div>
            <div className="about-animation">
              <Lottie animationData={reviewAnimation} loop={true} />
            </div>
          </section>

          <section className="testimonial-section">
            <h2 className="section-title">What Developers Say</h2>
            <div className="testimonials">
              <div className="testimonial-card">
                <div className="quote">
                  "CodeReviewer AI has significantly improved my coding skills. The instant feedback is invaluable!"
                </div>
                <div className="author">- Sarah Johnson, Frontend Developer</div>
              </div>
              <div className="testimonial-card">
                <div className="quote">
                  "I use this tool daily to check my code before submitting PRs. It catches issues I would have missed."
                </div>
                <div className="author">- Michael Chen, Full Stack Engineer</div>
              </div>
              <div className="testimonial-card">
                <div className="quote">
                  "As a coding instructor, I recommend CodeReviewer AI to all my students. It's like having a mentor
                  available 24/7."
                </div>
                <div className="author">- Dr. Alex Rivera, CS Professor</div>
              </div>
            </div>
          </section>
        </>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-animation small">
              <Lottie animationData={codeIcon} loop={true} />
            </div>
            <h3>CodeReviewer AI</h3>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Documentation</a>
              <a href="#">Updates</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Community</a>
              <a href="#">Help Center</a>
              <a href="#">Support</a>
              <a href="#">API</a>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 CodeReviewer AI. All rights reserved.</p>
          <div className="social-links">
            <a href="https://github.com/prince2619" aria-label="GitHub">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

