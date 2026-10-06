"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FaChevronDown, FaCalendarAlt } from "react-icons/fa";
import WaveDivider from "@/components/WaveDivider";
import ScrollAnimation from "@/components/ScrollAnimations";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="gradient-mesh section-padding particles relative min-h-[60vh] flex items-center">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-400/20 rounded-full blur-2xl float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary-400/20 rounded-full blur-3xl float-delayed"></div>
        <div className="container-custom text-center relative z-10">
          <h1 className="heading-xl mb-6 animate-fade-in">Frequently Asked <span className="text-gradient">Questions</span></h1>
          <p className="text-body max-w-3xl mx-auto animate-fade-in-delay">
            Find answers to common questions about Vastu Shastra and our consultation services
          </p>
        </div>
      </section>

      <WaveDivider color="white" />

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollAnimation key={index} animation="fade-up" delay={index * 50}>
                <div className="glass rounded-xl overflow-hidden card-hover-glow">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-primary-50/50 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">
                        {index + 1}
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 pr-4">{faq.question}</h3>
                    </div>
                    <FaChevronDown 
                      className={`flex-shrink-0 w-5 h-5 text-primary-500 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-5 pl-18">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="gray" flip />

      {/* Categories Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">FAQ <span className="text-gradient">Categories</span></h2>
            <p className="text-body max-w-2xl mx-auto">
              Browse questions by category
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <ScrollAnimation key={index} animation="scale" delay={index * 100}>
                <div className="card card-hover-glow text-center">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gradient">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="text-primary-500 font-semibold">{category.count} Questions</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="white" />

      {/* Still Have Questions Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="heading-lg mb-4 text-white">Still Have Questions?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Can&apos;t find the answer you&apos;re looking for? Our team is here to help you with personalized guidance.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-primary-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              <FaCalendarAlt className="w-5 h-5" />
              Schedule a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const faqs = [
  {
    question: "What is Vastu Shastra and how does it work?",
    answer: "Vastu Shastra is an ancient Indian science of architecture and design that focuses on creating harmony between human dwellings and natural forces. It works by aligning the five elements (earth, water, fire, air, and space) and directional energies to create positive and balanced environments that promote health, wealth, and happiness."
  },
  {
    question: "Do I need to make major structural changes to my property?",
    answer: "Not necessarily. While some Vastu corrections may involve structural changes, many can be achieved through simple adjustments like repositioning furniture, changing colors, adding plants, or using specific remedies. Our consultants focus on practical solutions that work within your existing space and budget constraints."
  },
  {
    question: "How long does a Vastu consultation take?",
    answer: "A typical consultation takes 1-2 hours for residential properties and 2-3 hours for commercial spaces. This includes site inspection, measurements, directional analysis, and initial recommendations. You'll receive a detailed written report within 3-5 business days with comprehensive analysis and actionable remedies."
  },
  {
    question: "Can Vastu help with specific problems like health or financial issues?",
    answer: "Vastu principles can help address various life aspects by creating harmonious energy flow in your space. While we cannot guarantee specific outcomes, many clients report improvements in health, relationships, and prosperity after implementing Vastu recommendations. Our approach combines ancient wisdom with practical modern solutions."
  },
  {
    question: "Is Vastu consultation available for both residential and commercial properties?",
    answer: "Yes, we provide Vastu consultation services for all types of properties including homes, apartments, offices, retail stores, factories, and commercial buildings. Each consultation is customized based on the property type, usage, and your specific goals."
  },
  {
    question: "What information do I need to provide for a consultation?",
    answer: "You'll need to provide floor plans, property dimensions, compass directions, photos of key areas, and information about any specific concerns or goals. For pre-construction consultations, architectural drawings and site details are required. Don't worry - we'll guide you through the entire process."
  },
  {
    question: "How much does a Vastu consultation cost?",
    answer: "Our consultation fees vary based on property size and complexity. Residential consultations start at $299, commercial spaces at $499, and pre-construction planning at $399. We also offer package deals and ongoing support options. Schedule a free 15-minute initial consultation to discuss your needs and get a detailed quote."
  },
  {
    question: "Can Vastu be applied to apartments or rented properties?",
    answer: "Absolutely! Vastu principles can be applied to any living or working space, including apartments and rented properties. We focus on non-structural remedies like furniture placement, color schemes, decor items, and energy corrections that don't require permanent modifications."
  },
  {
    question: "How is Vastu different from Feng Shui?",
    answer: "While both systems aim to create harmonious spaces, Vastu Shastra is based on Indian Vedic traditions and emphasizes cardinal directions and the five elements. Feng Shui is Chinese and focuses on chi energy flow. Vastu uses specific mathematical calculations and directional principles, while Feng Shui relies more on intuitive energy mapping."
  },
  {
    question: "What is the success rate of Vastu remedies?",
    answer: "Our clients report a 98% satisfaction rate, with many experiencing positive changes within 3-6 months of implementing recommendations. Success depends on proper implementation, the extent of corrections possible, and individual circumstances. We provide ongoing support to ensure you get the best results."
  },
  {
    question: "Do you offer follow-up consultations?",
    answer: "Yes, we provide follow-up support to ensure successful implementation. Your initial consultation includes one free follow-up session within 30 days. Additional follow-up consultations are available at discounted rates. We're committed to your long-term success and satisfaction."
  },
  {
    question: "Can Vastu consultation be done remotely?",
    answer: "Yes, we offer comprehensive remote consultations using floor plans, photos, videos, and virtual tours. Our remote consultations are just as detailed and effective as in-person visits. This allows us to serve clients worldwide while maintaining the same high-quality standards."
  }
];

const categories = [
  {
    icon: "🏠",
    title: "General Vastu",
    description: "Basic concepts and fundamental principles of Vastu Shastra",
    count: 4
  },
  {
    icon: "💼",
    title: "Consultation Process",
    description: "Information about our services and how we work",
    count: 5
  },
  {
    icon: "🔧",
    title: "Implementation",
    description: "Practical questions about applying Vastu remedies",
    count: 3
  }
];
