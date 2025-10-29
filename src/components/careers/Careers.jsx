import React, { useState, useEffect } from 'react'
import './Careers.css'

const Careers = () => {
  const [selectedRole, setSelectedRole] = useState(null);
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openPositions = [
    {
      id: 1,
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      icon: "🤖",
      description: "Build and optimize AI models for voice processing and natural language understanding."
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Remote / New York",
      type: "Full-time",
      icon: "📋",
      description: "Drive product strategy and roadmap for our AI assistant platform."
    },
    {
      id: 3,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote / Noida",
      type: "Full-time",
      icon: "💻",
      description: "Create beautiful and responsive user interfaces for our web applications."
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote / Noida",
      type: "Full-time",
      icon: "⚙️",
      description: "Scale our infrastructure to handle millions of AI requests daily."
    }
  ]

  const benefits = [
    {
      icon: "🏠",
      title: "Remote First",
      description: "Work from anywhere in the world"
    },
    {
      icon: "💰",
      title: "Competitive Salary",
      description: "Market-leading compensation packages"
    },
    {
      icon: "🏥",
      title: "Health Benefits",
      description: "Comprehensive health, dental, and vision"
    },
    {
      icon: "📚",
      title: "Learning Budget",
      description: "$2,000 annual learning and development"
    },
    {
      icon: "🌴",
      title: "Unlimited PTO",
      description: "Take time off when you need it"
    },
    {
      icon: "💻",
      title: "Equipment",
      description: "Latest MacBook and home office setup"
    }
  ]

  return (
    <div className="careers">
      <div className="careers-container">
        {/* Header */}
        <div className="careers-header">
          <div className="careers-intro">
            <h1 className="careers-title">
              Join Our <span className="title-highlight">Team</span>
            </h1>
            <p className="careers-subtitle">
              Help us build the future of AI-powered productivity. We're looking for passionate 
              individuals who want to make a meaningful impact.
            </p>
          </div>

          <div className="careers-visual">
            <div className="careers-icon">🚀</div>
            <div className="team-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Team Members</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Countries</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Remote</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Join Us */}
        <div className="why-join-section">
          <h2 className="section-title">Why Join MayaAgent?</h2>
          <div className="why-join-grid">
            <div className="why-join-item">
              <div className="why-icon">🌟</div>
              <h3>Innovation First</h3>
              <p>Work on cutting-edge AI technology that's changing how people interact with digital tools.</p>
            </div>
            <div className="why-join-item">
              <div className="why-icon">🌍</div>
              <h3>Global Impact</h3>
              <p>Your work will help millions of users worldwide be more productive and efficient.</p>
            </div>
            <div className="why-join-item">
              <div className="why-icon">🎯</div>
              <h3>Meaningful Work</h3>
              <p>Every line of code, every design, every decision makes a real difference to our users.</p>
            </div>
            <div className="why-join-item">
              <div className="why-icon">🤝</div>
              <h3>Collaborative Culture</h3>
              <p>Work with talented, passionate people who support each other's growth.</p>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="positions-section">
          <h2 className="section-title">Open Positions</h2>
          <div className="positions-grid">
            {openPositions.map((position) => (
              <div 
                key={position.id} 
                className={`position-card ${selectedRole === position.id ? 'active' : ''}`}
                onClick={() => setSelectedRole(selectedRole === position.id ? null : position.id)}
              >
                <div className="position-header">
                  <div className="position-icon">{position.icon}</div>
                  <div className="position-info">
                    <h3 className="position-title">{position.title}</h3>
                    <div className="position-meta">
                      <span className="department">{position.department}</span>
                      <span className="location">{position.location}</span>
                      <span className="type">{position.type}</span>
                    </div>
                  </div>
                </div>
                
                {selectedRole === position.id && (
                  <div className="position-details">
                    <p className="position-description">{position.description}</p>
                    <button className="apply-btn">
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="benefits-section">
          <h2 className="section-title">Benefits & Perks</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="application-section">
          <h2 className="section-title">How to Apply</h2>
          <div className="application-content">
            <div className="application-steps">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Prepare Your Resume</h3>
                  <p>Update your resume with your latest experience and projects</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Send Your Application</h3>
                  <p>Email your resume and cover letter to our team</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Interview Process</h3>
                  <p>We'll review your application and schedule interviews</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Join Our Team</h3>
                  <p>Welcome to MayaAgent! Let's build the future together</p>
                </div>
              </div>
            </div>

            <div className="application-cta">
              <div className="cta-content">
                <h3>Ready to Apply?</h3>
                <p>
                  Those who want to apply to MayaAgent.ai can send their resume to <strong>mayaagent.ai</strong>
                </p>
                <div className="cta-actions">
                  <a 
                    href="mailto:careers@mayaagent.ai" 
                    className="btn btn-primary"
                  >
                    📧 Send Resume
                  </a>
                  <button className="btn btn-secondary">
                    💬 Ask Questions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Culture Section */}
        <div className="culture-section">
          <div className="culture-content">
            <h2 className="section-title">Our Culture</h2>
            <div className="culture-values">
              <div className="value-item">
                <span className="value-emoji">🎯</span>
                <span className="value-text">Results-driven</span>
              </div>
              <div className="value-item">
                <span className="value-emoji">🤝</span>
                <span className="value-text">Collaborative</span>
              </div>
              <div className="value-item">
                <span className="value-emoji">🌟</span>
                <span className="value-text">Innovative</span>
              </div>
              <div className="value-item">
                <span className="value-emoji">📈</span>
                <span className="value-text">Growth-minded</span>
              </div>
              <div className="value-item">
                <span className="value-emoji">🌍</span>
                <span className="value-text">Inclusive</span>
              </div>
              <div className="value-item">
                <span className="value-emoji">⚡</span>
                <span className="value-text">Fast-paced</span>
              </div>
            </div>
            <p className="culture-description">
              We believe in building a diverse, inclusive team where everyone can do their best work. 
              Our remote-first culture means you can work from anywhere while staying connected with your team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Careers