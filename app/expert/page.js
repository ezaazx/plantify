
import React from "react";
import "./page.css";
import Header from '../components/Header';
import { FaPhone, FaWhatsapp } from "react-icons/fa";

export default function ExpertCards() {
  const experts = [
    {
      name: "Dr. Sarah Johnson",
      type: "Plant Pathologist",
      specialty: "Fungal Disease Management",
      rating: 4.9,
      reviews: 1250,
      experience: 12,
      phone: "+91 9101176215",
      email: "luishbrahmacr7@gmail.com",
      location: "New York, NY",
      image: "/assets/1.jpeg"
    },
    {
      name: "Dr. Michael Chen",
      type: "Plant Consultant",
      specialty: "General Plant Health",
      rating: 4.8,
      reviews: 900,
      experience: 8,
      phone: "+1 (555) 234-5678",
      email: "michael.chen@clinic.com",
      location: "Los Angeles, CA",
      image: "/assets/2.jpeg"
    },
    {
      name: "Dr. Emily Rodriguez",
      type: "Plant Pathologist",
      specialty: "Viral & Bacterial Infections",
      rating: 4.9,
      reviews: 780,
      experience: 15,
      phone: "+1 (555) 345-6789",
      email: "emily.rodriguez@medical.com",
      location: "Chicago, IL",
      image: "/assets/3.jpeg"
    },
    {
      name: "Dr. James Wilson",
      type: "Agri Emergency Specialist",
      specialty: "Rapid Crop Disease Response",
      rating: 4.7,
      reviews: 2100,
      experience: 6,
      phone: "+1 (555) 458-7890",
      email: "james.wilson@emergency.com",
      location: "Houston, TX",
      image: "/assets/4.jpeg"
    },
    {
      name: "Dr. Robert Thompson",
      type: "Agronomist",
      specialty: "Soil-borne Disease Control",
      rating: 4.9,
      reviews: 650,
      experience: 20,
      phone: "+1 (555) 567-8901",
      email: "robert.thompson@surgery.com",
      location: "Miami, FL",
      image: "/assets/5.jpeg"
    },
    {
      name: "Dr. Lisa Anderson",
      type: "Horticulture Expert",
      specialty: "Plant Nutrition & Recovery",
      rating: 4.8,
      reviews: 1400,
      experience: 10,
      phone: "+1 (555) 678-9012",
      email: "lisa.anderson@pediatric.com",
      location: "Seattle, WA",
      image: "/assets/6.jpeg"
    }
  ];

  return (
    
    <section className="expert-section mx-w-4xl mx-auto py-8 px-4">
    <Header />
      <h2 className="section-title ">Plant Expert Suggestions</h2>
      
      <p className="section-subtitle">
        Connect with qualified healthcare professionals for personalized medical advice and treatment
      </p>

      <div className="cards-grid">
        {experts.map((expert, index) => {
          const cleanPhone = expert.phone.replace(/[^+\d]/g, "");

          return (
            <div key={index} className="expert-card">
              {/* Profile Image */}
              {expert.image && (
                <div className="expert-photo-container">
                  <img src={expert.image} alt={expert.name} className="expert-photo" />
                </div>
              )}

              <div className="card-header">
                <div>
                  <h3 className="expert-name">{expert.name}</h3>
                  <span className="expert-type">{expert.type}</span>
                </div>
                <div className="expert-rating">{expert.rating} ★</div>
              </div>

              {expert.specialty && (
                <p className="expert-specialty">{expert.specialty}</p>
              )}

              <p className="expert-info">
                {expert.reviews} reviews • {expert.experience} yrs experience
              </p>

              <div className="expert-contacts">
                <p><span>Phone:</span> {expert.phone}</p>
                <p><span>Email:</span> {expert.email}</p>
                <p><span>Location:</span> {expert.location}</p>
              </div>

              <div className="expert-actions">
                <a href={`tel:${cleanPhone}`} className="call-btn">
                  <FaPhone /> Call
                </a>
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="message-btn"
                >
                  <FaWhatsapp /> Message
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}