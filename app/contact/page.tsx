"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { FaPaperPlane } from "react-icons/fa";
import WaveDivider from "@/components/WaveDivider";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    propertyType: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "24px"
  };

  const mapCenter = {
    lat: 26.5755,
    lng: 81.2533
  };

  const locations = [
    {
      id: "main",
      name: "Main Office - Vrindavan",
      address: "V-21, Chatikara Road, Vrindavan, Uttar Pradesh - 281504",
      lat: 27.5755,
      lng: 77.2533,
      phone: "+91 7858992627"
    },
    {
      id: "branch",
      name: "Branch Office - Patna",
      address: "Hanuman Nagar, Kankarbagh, Patna - 800020",
      lat: 25.5951,
      lng: 85.1872,
      phone: "+91 7858992627"
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service type";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // TODO: Implement actual form submission to backend API
    // This is currently a demo implementation
    setTimeout(() => {
      setSubmitMessage("Thank you for your inquiry! We'll get back to you within 24 hours.");
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        propertyType: "",
        message: ""
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitMessage(""), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="gradient-mesh section-padding particles relative min-h-[60vh] flex items-center">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-400/20 rounded-full blur-2xl float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary-400/20 rounded-full blur-3xl float-delayed"></div>
        <div className="container-custom text-center relative z-10">
          <h1 className="heading-xl mb-6 animate-fade-in"><span className="text-gradient">Get In Touch</span></h1>
          <p className="text-body max-w-3xl mx-auto animate-fade-in-delay">
            Have questions about our services? Ready to schedule a consultation? 
            We&apos;re here to help you on your journey to a harmonious space.
          </p>
        </div>
      </section>


       {/* Alternative Contact Methods Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Other Ways to <span className="text-gradient">Connect</span></h2>
            <p className="text-body max-w-2xl mx-auto">
              Choose your preferred method of communication
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="card glass card-hover-3d text-center">
                <div className="text-5xl mb-4 float">{method.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-gradient">{method.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                <a href={method.link} className="text-primary-500 hover:text-primary-600 font-semibold text-sm">
                  {method.action} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Hours Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Consultation <span className="text-gradient">Hours</span></h2>
            <p className="text-body max-w-2xl mx-auto">
              We&apos;re available to serve you at convenient times throughout the week
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {consultationHours.map((schedule, index) => (
              <div key={index} className="card glass card-hover-glow text-center">
                <div className="text-4xl mb-4 float">{schedule.icon}</div>
                <h3 className="font-bold text-lg mb-3 text-gradient">{schedule.title}</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-semibold">{schedule.days}</p>
                  <p>{schedule.hours}</p>
                </div>
                {schedule.note && (
                  <p className="mt-3 text-xs text-primary-600 font-medium">{schedule.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="gray" flip />

      {/* What to Expect Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">What to <span className="text-gradient">Expect</span></h2>
            <p className="text-body max-w-2xl mx-auto">
              Your consultation journey from first contact to implementation
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {consultationProcess.map((step, index) => (
              <div key={index} className="card glass card-hover-expand flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-2 text-gradient">{step.title}</h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.details.map((detail, idx) => (
                      <span key={idx} className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 text-3xl float">{step.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="white" />

      {/* Preparation Guidelines Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Preparation <span className="text-gradient">Guidelines</span></h2>
            <p className="text-body max-w-2xl mx-auto">
              Get the most out of your consultation by preparing these items
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card glass card-hover-glow">
              <h3 className="font-bold text-xl mb-4 text-gradient flex items-center gap-3">
                <span className="text-3xl">📋</span>
                Required Information
              </h3>
              <ul className="space-y-3">
                {requiredInfo.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-800">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card glass card-hover-glow">
              <h3 className="font-bold text-xl mb-4 text-gradient flex items-center gap-3">
                <span className="text-3xl">💡</span>
                Helpful Tips
              </h3>
              <ul className="space-y-3">
                {helpfulTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-800">{tip.title}</div>
                      <div className="text-sm text-gray-600">{tip.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      {/* <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12"> */}
            {/* Contact Form */}
            {/* <div className="lg:col-span-3">
              <div className="card glass hover-lift animate-fade-in">
                <h2 className="heading-md mb-6"><span className="text-gradient">Send Us a Message</span></h2>
                
                {submitMessage && (
                  <div className="mb-6 p-4 bg-secondary-50 border border-secondary-200 text-secondary-800 rounded-lg">
                    {submitMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+91 7858992627"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Type *
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        required
                        value={formData.serviceType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                          errors.serviceType ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a service</option>
                        <option value="residential">Residential Vastu</option>
                        <option value="commercial">Commercial Vastu</option>
                        <option value="pre-construction">Pre-Construction</option>
                        <option value="remedies">Vastu Remedies</option>
                        <option value="site-analysis">Site Analysis</option>
                        <option value="corporate">Corporate Consulting</option>
                      </select>
                      {errors.serviceType && (
                        <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-semibold text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select property type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">Independent House</option>
                      <option value="villa">Villa</option>
                      <option value="office">Office</option>
                      <option value="retail">Retail Space</option>
                      <option value="factory">Factory/Warehouse</option>
                      <option value="plot">Plot/Land</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tell us about your project and requirements..."
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary shimmer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity inline-flex items-center justify-center gap-2"
                  >
                    <FaPaperPlane className="w-4 h-4" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div> */}

            {/* Contact Information */}
            {/* <div className="lg:col-span-2 space-y-6 animate-fade-in-delay">
              <div className="card glass hover-lift">
                <h3 className="text-xl font-bold mb-4 text-gradient">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Our Offices</h4>
                      <div className="space-y-3">
                        <div className="border-l-2 border-primary-500 pl-3">
                          <p className="font-semibold text-sm text-primary-600 mb-1">Main Office</p>
                          <p className="text-gray-600 text-sm">V-21, Chatikara Road, Vrindavan</p>
                          <p className="text-gray-600 text-sm">Uttar Pradesh - 281504, India</p>
                        </div>
                        <div className="border-l-2 border-secondary-400 pl-3">
                          <p className="font-semibold text-sm text-secondary-600 mb-1">Branch Office</p>
                          <p className="text-gray-600 text-sm">Hanuman Nagar, Kankarbagh </p>
                          <p className="text-gray-600 text-sm">Patna - 800020, India</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <p className="text-gray-600 text-sm">+91 7858992627</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-gray-600 text-sm">support@vastuinside.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Office Hours</h4>
                      <p className="text-gray-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 text-sm">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-600 text-sm">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200">
                <div className="mb-4">
                  <img 
                    src="/images/consultation.jpg" 
                    alt="Vastu Consultation" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Schedule a Free Consultation</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  Not sure where to start? Book a complimentary 15-minute consultation 
                  to discuss your needs and get personalized recommendations.
                </p>
                <a href="tel:+917858992627" className="btn-primary w-full text-center block">
                  Call Now
                </a>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold mb-3">Follow Us</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Stay updated with Vastu tips, success stories, and special offers.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div> */}
          {/* </div>
        </div>
      </section> */}

      {/* Map Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="heading-lg mb-4">Visit Our <span className="text-gradient">Offices</span></h2>
            <p className="text-body max-w-2xl mx-auto">
              Located in Vrindavan and Patna to serve you better
            </p>
          </div>
          
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={5}
              options={{
                styles: [
                  {
                    featureType: "all",
                    elementType: "geometry",
                    stylers: [{ color: "#f5f5f5" }]
                  },
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#e0f2f1" }]
                  },
                  {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{ color: "#ffffff" }]
                  }
                ]
              }}
            >
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={{ lat: location.lat, lng: location.lng }}
                  onClick={() => setSelectedMarker(location.id)}
                  icon={{
                    path: "M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z",
                    fillColor: "#e88a00",
                    fillOpacity: 1,
                    strokeColor: "#fff",
                    strokeWeight: 2,
                    scale: 2
                  }}
                >
                  {selectedMarker === location.id && (
                    <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                      <div className="p-4 bg-white rounded-lg shadow-lg max-w-xs">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{location.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{location.address}</p>
                        <a href={`tel:${location.phone}`} className="text-primary-600 font-semibold text-sm hover:underline">
                          {location.phone}
                        </a>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
            </GoogleMap>
          </LoadScript>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {locations.map((location) => (
              <div key={location.id} className="card glass hover-lift">
                <h3 className="font-bold text-xl mb-3 text-gradient">{location.name}</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold mt-0.5">📍</span>
                    {location.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary-500 font-bold">📞</span>
                    <a href={`tel:${location.phone}`} className="text-primary-600 hover:underline font-semibold">
                      {location.phone}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const consultationHours = [
  {
    icon: "📅",
    title: "Weekdays",
    days: "Monday - Friday",
    hours: "9:00 AM - 6:00 PM",
    note: "Same day appointments available"
  },
  {
    icon: "🌅",
    title: "Weekends",
    days: "Saturday - Sunday",
    hours: "10:00 AM - 4:00 PM",
    note: "By appointment only"
  },
  {
    icon: "🌙",
    title: "Emergency",
    days: "24/7 Available",
    hours: "Contact via WhatsApp",
    note: "For urgent consultations"
  }
];

const consultationProcess = [
  {
    icon: "📞",
    title: "Initial Contact",
    description: "Reach out via form, phone, or WhatsApp. We'll respond within 2-4 hours during business hours.",
    details: ["Quick response", "Friendly team", "Initial assessment"]
  },
  {
    icon: "🗓️",
    title: "Schedule Consultation",
    description: "Book a convenient time for your consultation. We offer both in-person and virtual options.",
    details: ["Flexible timing", "Online/offline options", "Calendar integration"]
  },
  {
    icon: "🔍",
    title: "Information Gathering",
    description: "We'll collect necessary details about your space, concerns, and goals before the consultation.",
    details: ["Property details", "Floor plans", "Current issues"]
  },
  {
    icon: "💬",
    title: "Consultation Session",
    description: "Detailed discussion of your space, requirements, and Vastu analysis with our expert consultant.",
    details: ["45-60 minutes", "Expert guidance", "Q&A session"]
  },
  {
    icon: "📊",
    title: "Detailed Report",
    description: "Receive a comprehensive written report with analysis, recommendations, and implementation guide.",
    details: ["PDF report", "Diagrams included", "Action plan"]
  },
  {
    icon: "🤝",
    title: "Follow-up Support",
    description: "Ongoing support during implementation with follow-up consultations as needed.",
    details: ["Email support", "Phone guidance", "Progress check-ins"]
  }
];

const requiredInfo = [
  {
    title: "Property Address & Direction",
    description: "Complete address and the direction your property/entrance faces"
  },
  {
    title: "Floor Plan or Layout",
    description: "Sketches, blueprints, or photos showing room arrangements"
  },
  {
    title: "Property Age & Construction Details",
    description: "When it was built and any major renovations"
  },
  {
    title: "Current Concerns",
    description: "Specific issues you're experiencing (health, finance, relationships, etc.)"
  },
  {
    title: "Family/Business Information",
    description: "Number of occupants, professions, and specific requirements"
  }
];

const helpfulTips = [
  {
    title: "Take Photos",
    description: "Capture current state of all rooms, entrance, and surroundings"
  },
  {
    title: "Note Problem Areas",
    description: "List specific rooms or areas where you feel uncomfortable"
  },
  {
    title: "Budget Planning",
    description: "Have a rough idea of your budget for recommended changes"
  },
  {
    title: "Be Open-Minded",
    description: "Some recommendations may seem unconventional but are based on proven principles"
  },
  {
    title: "Ask Questions",
    description: "Write down any questions beforehand - no question is too small"
  }
];

const contactMethods = [
  {
    icon: "📱",
    title: "WhatsApp",
    description: "Quick responses and easy file sharing",
    link: "https://wa.me/917858992627",
    action: "Chat Now"
  },
  {
    icon: "📧",
    title: "Email",
    description: "Detailed inquiries and document sharing",
    link: "mailto:support@vastuinside.com",
    action: "Send Email"
  },
  {
    icon: "☎️",
    title: "Phone Call",
    description: "Direct conversation with our team",
    link: "tel:+919876543210",
    action: "Call Us"
  },
  {
    icon: "💬",
    title: "Live Chat",
    description: "Instant messaging during business hours",
    link: "#",
    action: "Start Chat"
  }
];

