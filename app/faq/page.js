'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
//import ChatBotWidget from '../ChatBotWidget/chatBotWidget';

const faqSections = {
  General: [
    {
      question: "What is PLANTIFY ?",
      answer: "It is an intelligent system that uses AI to detect pests in crops using image recognition and offers prevention strategies to reduce losses and enhance productivity."
    },
    {
      question: "Who can use this system?",
      answer: "The system is designed for farmers, especially small-scale farmers, to help them easily identify pests and receive expert advice."
    },
    {
      question: "How is this different from traditional pest control?",
      answer: "Traditional methods rely on manual inspection and often lead to pesticide overuse. This system automates detection and recommends precise treatments, promoting sustainability."
    },
    {
      question: "Is internet required to use this system?",
      answer: "Yes, as the system relies on AI and cloud-based expert consultations, an internet connection is necessary for full functionality."
    },
    {
      question: "Is my farming data secure?",
      answer: "Yes, all user data is securely stored and only accessible to authorized personnel."
    }
  ],
  Detection: [
    {
      question: "How does pest detection work?",
      answer: "Farmers upload images of affected crops. The AI model analyzes the image and identifies the pest type using trained machine learning algorithms."
    },
    {
      question: "What types of pests can be detected?",
      answer: "The system is trained on a wide dataset to recognize common crop pests and diseases affecting major crops."
    },
    {
      question: "Is image upload the only detection method?",
      answer: "Yes, currently pest detection is image-based, but future versions may include additional data input types."
    },
    {
      question: "How accurate is the AI detection?",
      answer: "Accuracy depends on image clarity and pest type, but the system is designed to deliver high precision based on real-world training data."
    },
    {
      question: "Can I use the camera directly from the app?",
      answer: "Yes, users can capture real-time images for instant detection and suggestions."
    }
  ],
  Treatment: [
    {
      question: "What kind of treatment recommendations are provided?",
      answer: "Both organic and chemical pesticide recommendations are given based on the pest type and severity."
    },
    {
      question: "Are treatment methods explained?",
      answer: "Yes, the system provides step-by-step application instructions and safety guidelines."
    },
    {
      question: "Can I follow local agricultural guidelines?",
      answer: "Yes, treatment suggestions can be adapted to comply with regional agricultural policies."
    },
    {
      question: "Does the system help reduce pesticide use?",
      answer: "Absolutely. It suggests optimal dosage to avoid excessive chemical usage, promoting eco-friendly farming."
    },
    {
      question: "Can the treatment info be downloaded?",
      answer: "Yes, users can export or save treatment plans for offline reference."
    }
  ],
  Experts: [
    {
      question: "How do I consult with agricultural experts?",
      answer: "You can initiate a chat or schedule a virtual consultation through the expert section in the app."
    },
    {
      question: "Can experts manually review images?",
      answer: "Yes, experts can assess uploaded images for deeper analysis and custom advice."
    },
    {
      question: "Is the expert support available 24/7?",
      answer: "Expert availability depends on scheduling, but common queries are supported anytime through AI chat."
    },
    {
      question: "Is there a cost for expert consultations?",
      answer: "Some consultations may be free, while in-depth sessions might require a fee depending on the service plan."
    },
    {
      question: "Are expert responses saved for future reference?",
      answer: "Yes, past consultation records are stored in your profile for easy access."
    }
  ],
  Community: [
    {
      question: "What is the community forum?",
      answer: "It’s a space for farmers to ask questions, share experiences, and get support from peers and experts."
    },
    {
      question: "Can I post photos and queries?",
      answer: "Yes, users can share images, experiences, and seek help from the community."
    },
    {
      question: "Are experts active in the community?",
      answer: "Yes, verified experts occasionally participate to provide credible guidance."
    },
    {
      question: "Is there moderation in the forum?",
      answer: "Yes, the forum is monitored to ensure helpful, respectful, and accurate discussions."
    },
    {
      question: "Can I follow topics of interest?",
      answer: "Yes, you can subscribe to topics and receive notifications when there are updates."
    }
  ],
  Impact: [
    {
      question: "How does this system benefit farmers?",
      answer: "It improves crop yield, reduces chemical overuse, and connects farmers with experts easily."
    },
    {
      question: "Is there real data on its effectiveness?",
      answer: "Yes, studies show AI can reduce pest-related losses by 20% and cut pesticide use by up to 40%."
    },
    {
      question: "Can this help small and marginal farmers?",
      answer: "Yes, it's designed to be accessible and affordable, particularly benefiting small-scale farmers."
    },
    {
      question: "Is the system scalable?",
      answer: "Yes, it can be scaled across regions and crop types, making it suitable for broad agricultural use."
    },
    {
      question: "How does it support sustainable farming?",
      answer: "By reducing unnecessary pesticide use and promoting data-driven practices, it supports eco-friendly agriculture."
    }
  ]
};


const Page = () => {
  const [activeSection, setActiveSection] = useState('General');
  const [openIndex, setOpenIndex] = useState(null);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setOpenIndex(null); // Reset accordion when section changes
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>
      <Header />
      {/*     <ChatBotWidget/>   */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem 2rem 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>FAQ</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center' }}>Your questions answered here.</p>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Sidebar Navigation */}
          <div style={{ minWidth: '180px' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {Object.keys(faqSections).map((section) => (
                <li
                  key={section}
                  onClick={() => handleSectionClick(section)}
                  style={{
                    marginBottom: '1rem',
                    fontWeight: activeSection === section ? 'bold' : 'normal',
                    cursor: 'pointer',
                    color: activeSection === section ? '#000' : '#555'
                  }}
                >
                  {section}
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ Content */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{activeSection} Questions</h2>
            {faqSections[activeSection].map((item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '1rem'
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    padding: '0.5rem 0'
                  }}
                >
                  {item.question}
                  <span style={{ float: 'right' }}>{openIndex === index ? '−' : '+'}</span>
                </button>
                {openIndex === index && (
                  <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

