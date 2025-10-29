import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./VideoCarousel.css";
import thumbnail1 from "../../assets/images/11.jpg";
import video1 from "../../assets/videos/1.mp4";
import thumbnail2 from "../../assets/images/22.jpg";
import video2 from "../../assets/videos/2.mp4";
import thumbnail3 from "../../assets/images/33.jpg";
import video3 from "../../assets/videos/3.mp4";
import thumbnail4 from "../../assets/images/44.jpg";
import video4 from "../../assets/videos/4.mp4";
import thumbnail5 from "../../assets/images/55.jpg";
import video5 from "../../assets/videos/5.mp4";
import thumbnail6 from "../../assets/images/66.jpg";
import video6 from "../../assets/videos/6.mp4";

const VideoCarousel = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCard, setActiveCard] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRefs = useRef({});
  const categoriesRef = useRef(null);
  const marqueeContentRef = useRef(null);
  const marqueeRowRef = useRef(null); // Add a ref for the container
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const videoData = [
    { id: 1, title: "Maya Voice AI Demo", category: "demo", thumbnail: thumbnail1, videoSrc: video1 },
    { id: 2, title: "Calendar Integration Tutorial", category: "tutorial", thumbnail: thumbnail2, videoSrc: video2 },
    { id: 3, title: "Email Automation Guide", category: "tutorial", thumbnail: thumbnail3, videoSrc: video3 },
    { id: 4, title: "WhatsApp Messaging Feature", category: "feature", thumbnail: thumbnail4, videoSrc: video4 },
    { id: 5, title: "Web Search Integration", category: "feature", thumbnail: thumbnail5, videoSrc: video5 },
    { id: 6, title: "Multi-Language Support", category: "feature", thumbnail: thumbnail6, videoSrc: video6 },
  ];

  const categories = [
    { id: "all", name: "All Videos" },
    { id: "demo", name: "Demos" },
    { id: "tutorial", name: "Tutorials" },
  ];

  const filteredVideos =
    activeCategory === "all"
      ? videoData
      : videoData.filter((video) => video.category === activeCategory);

  // Create a DUAL list for the CSS animation to work correctly.
  // NO LONGER NEEDED: We will use the single list for a back-and-forth animation.
  // const circularVideos = [...filteredVideos, ...filteredVideos];

  const scrollToActiveCard = (cardKey) => {
    setTimeout(() => {
      const activeElement = document.querySelector(
        `.marquee-track [data-card-key="${cardKey}"]`
      );
      if (activeElement) {
        const container = activeElement.closest(".marquee-content");
        if (container) {
          const elementCenter =
            activeElement.offsetLeft + activeElement.offsetWidth / 2;
          const containerCenter = container.clientWidth / 2;
          const scrollLeft = elementCenter - containerCenter;
          container.scrollLeft = scrollLeft;
        }
      }
    }, 0);
  };

  const checkForScroll = () => {
    const el = categoriesRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const el = categoriesRef.current;
    if (el) {
      checkForScroll();
      el.addEventListener("scroll", checkForScroll);
      window.addEventListener("resize", checkForScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkForScroll);
        window.removeEventListener("resize", checkForScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!activeCard) return;
    const player = videoRefs.current[activeCard.key];
    if (player) {
      player.currentTime = 0;
      const attempt = player.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
      scrollToActiveCard(activeCard.key);
    }
  }, [activeCard]);

  // This effect calculates the precise scroll distance and sets it as a CSS variable.
  useLayoutEffect(() => {
    const calculateScrollDistance = () => {
      const row = marqueeRowRef.current;
      const content = marqueeContentRef.current;

      if (row && content) {
        const scrollDistance = content.scrollWidth - row.clientWidth;
        // Ensure we only scroll if the content is wider than the container
        if (scrollDistance > 0) {
          content.style.setProperty('--scroll-distance', `-${scrollDistance}px`);
        } else {
          // If content is not overflowing, there's nowhere to scroll.
          content.style.setProperty('--scroll-distance', '0px');
        }
      }
    };

    // Calculate on initial render and when the filtered videos change.
    calculateScrollDistance();

    // Recalculate when the window is resized.
    window.addEventListener('resize', calculateScrollDistance);
    return () => window.removeEventListener('resize', calculateScrollDistance);
  }, [filteredVideos]);

  const scroll = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = categoriesRef.current.clientWidth * 0.8;
      categoriesRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleVideoClick = (video, cardKey) => {
    if (activeCard && activeCard.key !== cardKey) {
      const previous = videoRefs.current[activeCard.key];
      if (previous) {
        previous.pause();
        previous.currentTime = 0;
      }
    }
    setActiveCard({ key: cardKey, video });
    setIsVideoPlaying(true);
    scrollToActiveCard(cardKey);
  };

  const handleVideoEnded = (cardKey) => {
    if (activeCard?.key === cardKey) {
      setActiveCard(null);
      setIsVideoPlaying(false);
    }
  };

  const handleVideoPause = (cardKey) => {
    if (activeCard?.key === cardKey) {
      setIsVideoPlaying(false);
    }
  };

  const handleVideoPlay = (cardKey) => {
    if (activeCard?.key === cardKey) {
      setIsVideoPlaying(true);
    }
  };

  return (
    <section id="videos" className="video-carousel">
      <div className="video-carousel-container">
        {/* Header */}
        <div className="video-header">
          <div className="video-intro">
            <h2 className="video-title">
              Learn Maya in
              <span className="title-highlight">Action</span>
            </h2>
            <p className="video-description">
              Watch our comprehensive video tutorials and demos to master every
              feature of Maya. From getting started to advanced automation,
              we've got you covered.
            </p>
          </div>

          <div className="video-stats">
            <div className="stat-item">
              <span className="stat-number">{videoData.length}</span>
              <span className="stat-label">Total Videos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2+</span>
              <span className="stat-label">Minutes of Content</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="video-categories-wrapper">
          {canScrollLeft && (
            <button className="scroll-btn left" onClick={() => scroll("left")}>
              &#x2039;
            </button>
          )}
          <div className="video-categories" ref={categoriesRef}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${
                  activeCategory === category.id ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
          {canScrollRight && (
            <button
              className="scroll-btn right"
              onClick={() => scroll("right")}
            >
              &#x203A;
            </button>
          )}
        </div>

        {/* Circular Infinite Marquee */}
        <div className="marquee-wrapper">
          <div className="marquee-row" ref={marqueeRowRef}> {/* Attach the new ref here */}
            <div
              className={`marquee-content${isVideoPlaying ? " paused" : ""}`}
              ref={marqueeContentRef}
            >
              <div className="marquee-track">
                {/* Use the original filteredVideos list, not the duplicated one */}
                {filteredVideos.map((video, index) => {
                  const cardKey = `video-${index}`;
                  const isActive = activeCard?.key === cardKey;
                  return (
                    <div key={cardKey} className="video-card-carousel" data-card-key={cardKey}>
                      {isActive ? (
                        <div className="video-card-link is-playing" role="group">
                          <div className="video-thumbnail-wrapper playing">
                            <video
                              ref={(el) => {
                                if (el) {
                                  videoRefs.current[cardKey] = el;
                                } else {
                                  delete videoRefs.current[cardKey];
                                }
                              }}
                              className="video-inline-player"
                              controls
                              autoPlay
                              playsInline
                              controlsList="nodownload noremoteplayback noplaybackrate"
                              disablePictureInPicture
                              onContextMenu={(e) => e.preventDefault()}
                              poster={video.thumbnail}
                              onPlay={() => handleVideoPlay(cardKey)}
                              onPause={() => handleVideoPause(cardKey)}
                              onEnded={() => handleVideoEnded(cardKey)}
                            >
                              <source src={video.videoSrc} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </div>
                      ) : (
                        <button
                          className="video-card-link"
                          onClick={() => handleVideoClick(video, cardKey)}
                          aria-label={`Play video: ${video.title}`}
                          type="button"
                        >
                          <div className="video-thumbnail-wrapper">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="video-thumbnail"
                              loading="lazy"
                            />
                            <div className="video-overlay">
                              <div className="play-button">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(VideoCarousel);