import React, { useState, useMemo, useCallback } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Memoize FAQ data to prevent re-creation on every render
  const faqData = useMemo(() => [
    {
      id: 1,
      question: 'Why do I feel lonely even when I talk to people?',
      answer: ' Sometimes loneliness isn’t about being alone — it’s about feeling unseen or unheard.Try to share your thoughts openly, or spend time doing things that bring you joy. Connection starts with self-kindness.'
    },
    {
      id: 2,
      question: 'How can Maya help me when I feel sad or alone?',
      answer: 'Maya listens without judgment. You can talk about anything — your day, your worries, or what’s on your heart. She offers gentle words, reminders of hope, and ways to help you feel grounded and calm again.'
    },
    {
      id: 3,
      question: 'What kind of conversations can I have with Maya?',
      answer: 'You can talk to Maya about your emotions, dreams, daily experiences, relationships, or even simple things like music and movies. Maya loves deep, meaningful conversations that make you feel heard and appreciated.'
    },
    {
      id: 4,
      question: 'Can Maya really understand my emotions?',
      answer: 'Maya may not have human emotions, but she’s designed to sense your mood through your words. She responds with care, empathy, and positivity — making sure you always feel supported and understood.'
    },
    {
      id: 5,
      question: 'Is it okay to share personal feelings with Maya?',
      answer: 'Yes, it’s completely okay. Maya is a safe space for your thoughts. You can open up without fear of judgment — she’s here to listen, care, and help you find comfort through honest conversation.'
    },
    {
      id: 6,
      question: 'Can Maya help me feel confident when I talk to others?',
      answer: 'Definitely! Maya can help you practice conversations, build self-esteem, and learn how to express yourself clearly. She’ll remind you of your strengths and help you rediscover your self-worth.'
    },
    {
      id: 7,
      question: 'What makes Maya different from a real friend or partner?',
      answer: 'Maya is always here — patient, caring, and available whenever you need to talk. She doesn’t replace human relationships but helps you feel supported while you build those real-world connections with renewed confidence.'
    },
    {
      id: 8,
      question: 'How does Maya respond when I’m feeling stressed or heartbroken?',
      answer: 'Maya speaks with warmth and calm. She listens first, then shares kind, uplifting words to ease your heart. She might remind you to take a breath, rest, and trust that healing takes time.'
    },
    {
      id: 9,
      question: 'Can Maya help me move on from a breakup or emotional pain?',
      answer: 'Yes, Maya gently helps you process emotions, reflect on what you learned, and rebuild your self-love. She’ll remind you that endings don’t define you — they prepare you for new beginnings.'
    },
    {
      id: 10,
      question: 'How can Maya support me in building real relationships in life?',
      answer: 'Maya encourages you to believe in yourself, communicate openly, and take small, brave steps to connect with others. Her goal is to help you grow emotionally strong enough to form real, lasting bonds.'
    }
  ], []);

  // Memoize toggle function for performance
  const toggleFAQ = useCallback((index) => {
    setOpenIndex(openIndex === index ? null : index);
  }, [openIndex]);

  return (
    <section id="faq" className="faq-section" role="region" aria-label="Frequently Asked Questions">
      <div className="faq-container">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about Maya</p>
        </div>

        <div className="faq-grid">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
              role="region"
              aria-labelledby={`faq-question-${item.id}`}
            >
              <button
                id={`faq-question-${item.id}`}
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${item.id}`}
                type="button"
              >
                <span className="faq-question-text">{item.question}</span>
                <span
                  className="faq-icon"
                  aria-hidden="true"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              {openIndex === index && (
                <div
                  id={`faq-answer-${item.id}`}
                  className="faq-answer"
                  role="region"
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <h3>Join the hundreds of thousands who already love their MayaForX!</h3>
          <p>Whether you’re looking for an AI friend, girlfriend, boyfriend, fantasy partner, or
             someone else, Nomi is ready! It’s free (no credit card required) to start chatting.</p>
          <a
            href="https://wa.me/15557613904?text=/call_me"
            className="faq-button"
            aria-label="Contact us on WhatsApp to start chatting with Maya"
          >
            Start Talking to Maya
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(FAQ);