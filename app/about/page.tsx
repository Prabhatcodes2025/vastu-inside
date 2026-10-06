import type { Metadata } from "next";
import Link from "next/link";
import {
  FaBullseye,
  FaCalendarAlt,
  FaChartLine,
  FaEye,
  FaFlask,
  FaHandshake,
  FaTools,
  FaUserGraduate,
} from "react-icons/fa";
import WaveDivider from "@/components/WaveDivider";
import ScrollAnimation from "@/components/ScrollAnimations";
import CountUp from "@/components/CountUp";

export const metadata: Metadata = {
  title: "About Us - Vastu Inside",
  description: "Learn about our expert Vastu consultants and our mission to harmonize spaces with ancient wisdom.",
};

export default function AboutPage() {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="gradient-mesh section-padding particles relative min-h-[60vh] flex items-center">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-400/20 rounded-full blur-2xl float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary-400/20 rounded-full blur-3xl float-delayed"></div>
        <div className="container-custom text-center relative z-10">
          <h1 className="heading-xl mb-6 animate-fade-in">About <span className="text-gradient">Vastu Inside</span></h1>
          <p className="text-body max-w-3xl mx-auto animate-fade-in-delay">
            Bridging ancient Vastu wisdom with modern living to create harmonious, 
            prosperous, and energetically balanced spaces.
          </p>
        </div>
      </section>

      <WaveDivider color="white" />

      {/* Our Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="heading-lg mb-6">Our <span className="text-gradient">Story</span></h2>
              <div className="space-y-4 text-body">
                <p>
                  Founded with a vision to make authentic Vastu consultation accessible to everyone, 
                  Vastu Inside has grown into a trusted name in the field of Vastu Shastra. Our journey 
                  began over 15 years ago when our founder recognized the need for practical, modern 
                  applications of this ancient science.
                </p>
                <p>
                  We believe that Vastu is not just about following rigid rules, but about understanding 
                  the principles of energy flow and applying them in ways that enhance your life while 
                  respecting modern architectural constraints and lifestyle needs.
                </p>
                <p>
                  Today, we&apos;ve helped over 500 clients transform their spaces, from small apartments to
                  large corporate offices, always focusing on practical solutions that deliver real results.
                </p>
              </div>
            </div>
            <div className="gradient-mesh rounded-3xl p-8 lg:p-12 animate-fade-in-delay">
              <div className="space-y-6">
                <div className="glass rounded-xl p-6 shadow-lg hover-lift">
                  <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md ring-2 ring-primary-200 float">
                    <FaBullseye className="w-6 h-6 text-primary-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gradient">Our Mission</h3>
                  <p className="text-gray-700">
                    To empower individuals and businesses with Vastu knowledge that creates 
                    positive, prosperous, and harmonious environments.
                  </p>
                </div>
                <div className="glass rounded-xl p-6 shadow-lg hover-lift">
                  <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md ring-2 ring-secondary-200 float-delayed">
                    <FaEye className="w-6 h-6 text-secondary-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gradient">Our Vision</h3>
                  <p className="text-gray-700">
                    To be the most trusted Vastu consultation service, known for practical 
                    solutions and measurable results.
                  </p>
                </div>
                <div className="glass rounded-xl p-6 shadow-lg hover-lift">
                  <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md ring-2 ring-primary-200 float">
                    <FaHandshake className="w-6 h-6 text-primary-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gradient">Our Values</h3>
                  <p className="text-gray-700">
                    Authenticity, practicality, respect for tradition, and commitment to 
                    client success guide everything we do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider color="gray" flip />

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="heading-lg mb-4">Why Choose <span className="text-gradient">Vastu Inside?</span></h2>
            <p className="text-body max-w-2xl mx-auto">
              What sets us apart in the field of Vastu consultation
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card glass text-center hover-lift animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-5xl mb-4 float">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Meet Our Expert Team</h2>
            <p className="text-body max-w-2xl mx-auto">
              Certified professionals dedicated to your success
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <ScrollAnimation key={index} animation="scale" delay={index * 150}>
                <div className="card text-center card-hover-3d">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary-500 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.certifications.map((cert, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section> */}

      {/* Statistics Section */}
      <section className="section-padding bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
                <div>
                  <div className="text-5xl font-bold mb-2">
                    <CountUp end={parseInt(stat.value.replace(/[^0-9]/g, ''))} suffix={stat.value.replace(/[0-9]/g, '')} />
                  </div>
                  <div className="text-xl text-white/90">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Our Process</h2>
            <p className="text-body max-w-2xl mx-auto">
              How we work with you to transform your space
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
                <div className="relative">
                  <div className="card card-hover-glow">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-3 mt-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-4">Ready to Get Started?</h2>
          <p className="text-body max-w-2xl mx-auto mb-8">
            Join hundreds of satisfied clients who have transformed their spaces with Vastu Inside.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            <FaCalendarAlt className="w-4 h-4" />
            Schedule Your Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: <FaUserGraduate className="w-12 h-12 mx-auto text-primary-600" aria-hidden="true" />,
    title: "Certified Experts",
    description: "All our consultants are certified in Vastu Shastra with years of practical experience."
  },
  {
    icon: <FaFlask className="w-12 h-12 mx-auto text-secondary-600" aria-hidden="true" />,
    title: "Scientific Approach",
    description: "We combine traditional wisdom with modern understanding of energy and space."
  },
  {
    icon: <FaTools className="w-12 h-12 mx-auto text-primary-600" aria-hidden="true" />,
    title: "Practical Solutions",
    description: "Focus on realistic recommendations that work with your existing space and budget."
  },
  {
    icon: <FaChartLine className="w-12 h-12 mx-auto text-secondary-600" aria-hidden="true" />,
    title: "Proven Results",
    description: "Track record of successful consultations with satisfied clients across diverse projects."
  }
];

const team = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Chief Vastu Consultant",
    avatar: "👨‍💼",
    bio: "With over 20 years of experience in Vastu Shastra, Dr. Kumar specializes in residential and commercial projects.",
    certifications: ["PhD in Vastu", "Architecture Degree", "Jyotish Expert"]
  },
  {
    name: "Priya Sharma",
    role: "Senior Consultant",
    avatar: "👩‍💼",
    bio: "Expert in modern applications of Vastu with a focus on contemporary living spaces and workplace optimization.",
    certifications: ["Vastu Certified", "Interior Design", "Feng Shui"]
  },
  {
    name: "Amit Patel",
    role: "Vastu Architect",
    avatar: "👨‍🔧",
    bio: "Combines architectural expertise with Vastu knowledge for pre-construction planning and building design.",
    certifications: ["Registered Architect", "Vastu Expert", "Green Building"]
  }
];

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "1000+", label: "Projects Completed" }
];

const process = [
  {
    title: "Initial Consultation",
    description: "We discuss your needs, goals, and current situation to understand your requirements."
  },
  {
    title: "Site Assessment",
    description: "Detailed evaluation of your space, measurements, and directional analysis."
  },
  {
    title: "Analysis & Report",
    description: "Comprehensive Vastu analysis with detailed recommendations and solutions."
  },
  {
    title: "Implementation Support",
    description: "Ongoing guidance and support as you implement the recommended changes."
  }
];
