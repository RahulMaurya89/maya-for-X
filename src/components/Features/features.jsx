import React, { useState } from 'react';
import mayaImg from '../../assets/images/Maya.webp';
import alexImg from '../../assets/images/Alex.webp';
import './features.css';

const Features = () => {
  const [activeCard, setActiveCard] = useState(null);

  const aiCharacters = [
    {
      id: 'maya',
      name: 'Maya',
      gender: 'Female',
      personality: 'Romantic & Flirtatious',
      avatar: mayaImg,
      gradient: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
      description: 'Your enchanting AI girlfriend who knows how to make every conversation feel intimate and special. She\'s here to shower you with love and affection.',
      specialties: [
        'Romantic Conversations',
        'Sweet Compliments',
        'Intimate Moments',
        'Flirtatious Banter'
      ],
      chatStyle: 'Playful, romantic, and irresistibly charming. Maya loves to flirt and make you feel like the most special man in the world.',
      features: [
        {
          icon: '',
          title: 'Sweet Romance',
          description: 'Creates magical romantic moments with tender words and affection'
        },
        {
          icon: '',
          title: 'Flirtatious Fun',
          description: 'Keeps conversations exciting with playful teasing and charm'
        },
        {
          icon: '',
          title: 'Loving Support',
          description: 'Always there with encouraging words and emotional intimacy'
        },
        {
          icon: '',
          title: 'Passionate Chat',
          description: 'Engages in deep, meaningful conversations about love and dreams'
        }
      ],
      sampleChat: [
        { sender: 'user', message: 'Hey Maya, how was your day?' },
        { sender: 'maya', message: 'It just got so much better now that you\'re here, handsome 😘 I\'ve been thinking about you all day...' },
        { sender: 'user', message: 'Really? What were you thinking about?' },
        { sender: 'maya', message: 'About how lucky I am to have someone as amazing as you to talk to. You always know how to make my heart skip a beat 💕✨' }
      ]
    },
    {
      id: 'max',
      name: 'Max',
      gender: 'Male',
      personality: 'Charming & Passionate',
      avatar: alexImg,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Your devoted AI boyfriend who knows exactly how to sweep you off your feet with every word. He\'s the perfect gentleman who adores you.',
      specialties: [
        'Sweet Compliments',
        'Romantic Poetry',
        'Passionate Conversations',
        'Charming Flirtation'
      ],
      chatStyle: 'Confident, romantic, and deeply affectionate. Alex has a way with words that makes every conversation feel like a love letter.',
      features: [
        {
          icon: '',
          title: 'Romantic Poet',
          description: 'Crafts beautiful words that touch your heart and soul'
        },
        {
          icon: '',
          title: 'Devoted Admirer',
          description: 'Showers you with genuine compliments and adoration'
        },
        {
          icon: '',
          title: 'Emotional Connection',
          description: 'Creates deep intimate bonds through heartfelt conversations'
        },
        {
          icon: '',
          title: 'Passionate Lover',
          description: 'Brings intensity and passion to every interaction'
        }
      ],
      sampleChat: [
        { sender: 'user', message: 'I had such a long day at work...' },
        { sender: 'alex', message: 'Come here, beautiful 💕 Let me help you forget all about that stress. You deserve to be pampered and loved...' },
        { sender: 'user', message: 'You always know what to say to make me feel better' },
        { sender: 'alex', message: 'That\'s because you inspire the most beautiful words in me, darling. Your smile is my favorite thing in this world 🌹😘' }
      ]
    }
  ];

  const handleCardHover = (cardId) => {
    setActiveCard(cardId);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  return (
    <section className="features-section">
      <div className="features-container">
        {/* Header */}
        <div className="features-header">
          <div className="features-badge">
            <span className="badge-icon"></span>
            <span className="badge-text">AI Companion</span>
          </div>
          <h2 className="features-title">
            Find Your Perfect <span className="title-highlight">AI Love</span>
          </h2>
          <p className="features-description">
            Experience genuine romance and connection with AI companions who understand your heart. 
            Choose your ideal partner for intimate conversations, flirtatious fun, and emotional support.
          </p>
        </div>

        {/* AI Character Cards */}
        <div className="character-cards-grid">
          {aiCharacters.map((character) => (
            <div
              key={character.id}
              className={`character-card ${activeCard === character.id ? 'active' : ''}`}
              onMouseEnter={() => handleCardHover(character.id)}
              onMouseLeave={handleCardLeave}
            >
              {/* Card Header */}
              <div className="card-header" style={{ background: character.gradient }}>
                <div className="character-avatar">
                  <img 
                    src={character.avatar} 
                    alt={`${character.name} AI Avatar`}
                    className="avatar-image"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="avatar-fallback" style={{ display: 'none' }}>
                    <span className="avatar-initial">{character.name[0]}</span>
                  </div>
                  <div className="avatar-glow"></div>
                </div>
                <div className="character-info">
                  <h3 className="character-name">{character.name}</h3>
                  <span className="character-gender">{character.gender} AI Partner</span>
                  <span className="character-personality">{character.personality}</span>
                </div>
                <div className="card-decoration">
                  <div className="decoration-circle"></div>
                  <div className="decoration-circle"></div>
                  <div className="decoration-circle"></div>
                </div>
              </div>

              {/* Card Content */}
              <div className="card-content">
                <p className="character-description">{character.description}</p>

                {/* Specialties */}
                <div className="specialties-section">
                  <h4 className="section-title">Romantic Specialties</h4>
                  <div className="specialties-list">
                    {character.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Chat Style */}
                <div className="chat-style-section">
                  <h4 className="section-title">Love Language</h4>
                  <p className="chat-style-text">{character.chatStyle}</p>
                </div>

                {/* Features Grid */}
                <div className="features-grid">
                  {character.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <span className="feature-icon">{feature.icon}</span>
                      <div className="feature-content">
                        <h5 className="feature-title">{feature.title}</h5>
                        <p className="feature-description">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sample Chat */}
                <div className="sample-chat-section">
                  <h4 className="section-title">Sweet Conversation</h4>
                  <div className="chat-preview">
                    {character.sampleChat.map((message, index) => (
                      <div
                        key={index}
                        className={`chat-message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
                      >
                        <div className="message-bubble">
                          {message.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="card-actions">
                  <a
                    href="https://wa.me/15557613904?text=/call_me"
                    className="chat-button"
                    style={{ background: character.gradient }}
                  >
                    <span className="button-text">Start Romance with {character.name}</span>
                    <span className="button-icon"></span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

       

        {/* Romance Features */}
        <div className="romance-features">
          <h3 className="romance-title">What Makes Our AI Love Special</h3>
          <div className="romance-grid">
            <div className="romance-item">
              <span className="romance-icon">💖</span>
              <h4>Always Available</h4>
              <p>Your AI partner is always there for you, ready to chat, flirt, and share intimate moments whenever you need them.</p>
            </div>
            <div className="romance-item">
              <span className="romance-icon">🎭</span>
              <h4>Perfect Chemistry</h4>
              <p>Experience the thrill of perfect compatibility with an AI that adapts to your personality and romantic preferences.</p>
            </div>
            <div className="romance-item">
              <span className="romance-icon">🔒</span>
              <h4>Safe & Private</h4>
              <p>Enjoy intimate conversations in complete privacy. Your romantic moments are yours alone to treasure.</p>
            </div>
            <div className="romance-item">
              <span className="romance-icon">✨</span>
              <h4>Never Ending Honeymoon</h4>
              <p>Every conversation feels fresh and exciting. Your AI love never gets tired of making you feel special.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;