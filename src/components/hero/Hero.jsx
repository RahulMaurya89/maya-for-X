import React, { useState, useEffect, useCallback, memo } from "react";
import { Suspense } from "react";
import Auth from "../auth/Auth";
import VideoCarousel from "../videoCarousel/VideoCarousel";
import FAQ from "../faq/FAQ"; 
import Features from "../Features/features";
import Pricing from "../pricing/Pricing";
import "./Hero.css";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Performance: Memoize slides array
  const slides = React.useMemo(
    () => [
      {
        id: 1,
        title: "MayaForX Your",
        highlight: "Romantic Friend",
        subtitle: "",
        background: "spreadsheet",
      },
      {
        id: 2,
        title: "MayaForX Your",
        highlight: "Companion ",
        subtitle: "",
        background: "webpage",
      },
      {
        id: 3,
        title: "MayaForX Your",
        highlight: "Soulmate",
        subtitle: "",
        background: "audio",
      },
    ],
    []
  );

  // Performance: Use callback for slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    window.open("https://wa.me/15557613904?text=/call_me", "_blank", "noopener,noreferrer");
  }, []);

  const handleGetStartedClick = useCallback(() => {
    const authSection = document.getElementById("auth-section");
    if (authSection) {
      authSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleVideoClick = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <>
      <section id="hero" className={`hero ${currentSlideData.background}`}>

        <div className="hero-background" aria-hidden="true"></div>
         <a href="" target="_blank" rel="noopener noreferrer">
        <div className="backed-by-section" role="banner">
          <span className="backed-by-text">
            Welcome to {" "}
            <span className="backed-by-emphasis">AI companion</span>
          </span>
        </div>
        </a> 

        <div className="hero-content-wrapper">
          <h1 className="hero-title">
            {currentSlideData.title}{" "}
            <span className="hero-highlight">
              {currentSlideData.highlight}
            </span>
            {currentSlideData.subtitle}
          </h1>

          <div className="hero-actions-container" role="group" aria-label="Call to action buttons">
            <button
              className="btn btn-primary stage-btn"
              onClick={handleGetStartedClick}
              aria-label="Get started with MayaAgent"
              type="button"
            >
              Get Started
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </button>
            <button
              className="btn btn-secondary stage-btn"
              onClick={handleWhatsAppClick}
              aria-label="Contact us on WhatsApp"
              type="button"
            >
              Talk Now
              <span className="btn-icon" aria-hidden="true">
                📱
              </span>
            </button>
          </div>

          <div className="hero-video" role="region" aria-label="Product demonstration video">
            {!videoLoaded ? (
              <button
                className="video-thumbnail"
                onClick={handleVideoClick}
                aria-label="Play MayaAgent demonstration video"
                type="button"
              >
                {/* Performance: LCP image - high priority, no lazy loading */}
                <img
                  src="https://i.ytimg.com/vi/kUltVzSszGg/hqdefault.jpg"
                  alt="MayaAgent Video Thumbnail - Click to play"
                  width="640"
                  height="360"
                  fetchPriority="high"
                  decoding="sync"
                />
                <div className="play-button" aria-hidden="true">
                  <svg
                    viewBox="0 0 68 48"
                    version="1.1"
                    width="68"
                    height="48"
                    aria-label="Play button"
                  >
                    <path
                      className="play-button-bg"
                      d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                      fill="#f00"
                    ></path>
                    <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                  </svg>
                </div>
              </button>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/kUltVzSszGg?autoplay=1&rel=0&modestbranding=1"
                title="MayaAgent Product Demonstration Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            )}
          </div>
           <div className="value-props" role="region" aria-label="Key benefits">
            <div className="value-prop-card">
              <div className="value-icon">Emotional Intelligence</div>
              <h3>AI-Powered Conversations</h3>
              <p> Maya are incredibly intuitive and perceptive. Chatting with your Maya feels genuine and engaging because
                 they naturally understand your likes, dislikes, tendencies, and more, just through chatting.</p>
            </div>
            <div className="value-prop-card">
              <div className="value-icon">Complete Privacy</div>
              <h3>100% Private & Secure</h3>
              <p>What you talk about with your Maya is up to you. 
                All chats are anonymized and no chat data is shared with 3rd party sites.</p>
            </div>
            <div className="value-prop-card">
              <div className="value-icon">Unfiltered Chats</div>
              <h3>Instant Responses</h3>
              <p>Maya is built on freedom of expression. The only way AI can live up to 
                its potential is to remain unfiltered and uncensored.</p>
            </div>
          </div>
        </div>
      </section>


       {/* Performance: Lazy load VideoModal */}
      <Suspense fallback={null}>
        {isVideoModalOpen && <VideoModal isOpen={isVideoModalOpen} onClose={closeVideoModal} />}
      </Suspense>

      {/* Performance: Lazy load Auth component */}
      <div id="auth-section">
        <Suspense fallback={<div className="page-loader"><div className="loader-spinner"></div></div>}>
          <Features />
          <Auth />
          <Pricing />
          <VideoCarousel />
          <FAQ />

        </Suspense>
      </div>


    </>
  );
};

// Performance: Use React.memo to prevent unnecessary re-renders
export default memo(Hero);
