"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowRight, FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import ConsultationModal from "./ConsultationModal";
import FreeVastuCheck from "./FreeVastuCheck";
import IndiaPresence from "./IndiaPresence";
import VastuAssistant from "./VastuAssistant";
import styles from "./HomePage.module.css";

const services = [
  {
    index: "01",
    title: "Vastu",
    description:
      "Directional insight for homes and workplaces, translated into practical recommendations for modern life.",
    image: "/images/gallery/project-4.jpg",
    href: "/services#vastu",
  },
  {
    index: "02",
    title: "Interiors",
    description:
      "Interiors shaped around use, proportion and feeling—where Vastu principles sit naturally within the design.",
    image: "/images/consultation.jpg",
    href: "/services#interior",
  },
  {
    index: "03",
    title: "Construction",
    description:
      "Thoughtful planning from the earliest decisions, connecting the direction of a site with the way it will be built.",
    image: "/images/gallery/project-8.jpg",
    href: "/services#construction",
  },
];

const directions = [
  { key: "N", name: "North", note: "A clear point of orientation." },
  { key: "NE", name: "North-East", note: "Where light and intention can meet." },
  { key: "E", name: "East", note: "The beginning of a daily rhythm." },
  { key: "SE", name: "South-East", note: "A zone shaped by activity." },
  { key: "S", name: "South", note: "A sense of grounding and structure." },
  { key: "SW", name: "South-West", note: "A quiet expression of stability." },
  { key: "W", name: "West", note: "A place for pause and reflection." },
  { key: "NW", name: "North-West", note: "Movement, exchange and transition." },
];

const processSteps = [
  {
    number: "01",
    title: "Observe",
    text: "We begin with the way your space is used, felt and experienced—not a one-size-fits-all checklist.",
    image: "/images/gallery/project-4.jpg",
  },
  {
    number: "02",
    title: "Align",
    text: "Directions, plan and practical constraints are studied together to find the clearest opportunities.",
    image: "/images/gallery/project-7.jpg",
  },
  {
    number: "03",
    title: "Design",
    text: "Recommendations are translated into a coherent spatial response that still feels contemporary and personal.",
    image: "/images/consultation.jpg",
  },
  {
    number: "04",
    title: "Transform",
    text: "You receive a path forward that can be understood, implemented and supported beyond the consultation.",
    image: "/images/gallery/project-8.jpg",
  },
];

const reasons = [
  ["Personal, not prescriptive", "Every recommendation begins with your space, routines and real constraints."],
  ["Tradition, made practical", "Vastu wisdom is interpreted for contemporary homes, workplaces and lifestyles."],
  ["Clarity beyond the visit", "Detailed recommendations help turn a consultation into considered next steps."],
  ["Support through change", "Guidance continues as the recommendations move from idea to implementation."],
];

const testimonials = [
  {
    quote:
      "The Vastu consultation transformed our home. We've experienced better harmony and prosperity since implementing the recommendations.",
    name: "Rajesh Kumar",
    role: "Homeowner",
    image: "/images/testimonial-1.jpg",
  },
  {
    quote:
      "Professional, knowledgeable, and practical advice. Our office productivity has significantly improved after the Vastu corrections.",
    name: "Priya Sharma",
    role: "Business Owner",
    image: "/images/testimonial-2.jpg",
  },
  {
    quote:
      "Excellent service! The detailed report and ongoing support made the entire process smooth and effective.",
    name: "Amit Patel",
    role: "Architect",
    image: "/images/testimonial-3.jpg",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const [activeDirection, setActiveDirection] = useState(1);
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const openConsultation = useCallback(() => setIsModalOpen(true), []);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("vastu-inside-intro-seen");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasSeenLoader && !reduceMotion) {
      setShowPreloader(true);
      sessionStorage.setItem("vastu-inside-intro-seen", "true");
      const timer = window.setTimeout(() => setShowPreloader(false), 1550);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add(styles.motionReady);
    const items = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("vastu-inside-consultation-dismissed")) return;
    let engaged = false;
    const timer = window.setTimeout(() => {
      if (engaged) setIsModalOpen(true);
    }, 18000);
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      engaged = scrollable > 0 && window.scrollY / scrollable > 0.52;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeConsultation = useCallback(() => {
    setIsModalOpen(false);
    sessionStorage.setItem("vastu-inside-consultation-dismissed", "true");
  }, []);

  return (
    <div className={styles.page} ref={rootRef}>
      <div className={styles.scrollProgress} ref={progressRef} aria-hidden="true" />
      {showPreloader && (
        <div className={styles.preloader} aria-hidden="true">
          <div className={styles.preloaderGrid} />
          <div className={styles.preloaderMark}>
            <Image src="/images/logo.png" alt="" width={3528} height={1037} priority />
            <span>Space · Direction · Balance</span>
          </div>
        </div>
      )}

      <div>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroArchitecture} aria-hidden="true">
            <Image src="/images/consultation.jpg" alt="" fill priority sizes="100vw" className={styles.coverImage} />
          </div>
          <div className={styles.heroWash} />
          <div className={styles.vastuGrid} aria-hidden="true"><span /><span /><span /></div>
          <div className={styles.heroContent}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Welcome to Vastu Inside</p>
              <h1 id="hero-title">Spaces that feel<em>as good as they look.</em></h1>
              <p className={styles.heroLead}>Traditional Vastu wisdom, thoughtfully interpreted for the way we live, work and build today.</p>
              <p className={styles.heroDisciplines}>Vastu <i /> Interiors <i /> Construction</p>
              <div className={styles.heroActions}>
                <button className={styles.primaryButton} onClick={openConsultation}>Book a consultation <FaArrowRight aria-hidden="true" /></button>
                <a className={styles.textLink} href="#free-vastu-check">Start free Vastu check <Arrow /></a>
              </div>
            </div>
            <div
              className={styles.heroPortrait}
              data-reveal
              onPointerMove={(event) => {
                if (event.pointerType !== "mouse") return;
                const bounds = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                event.currentTarget.style.setProperty("--tilt-x", `${y * -3}deg`);
                event.currentTarget.style.setProperty("--tilt-y", `${x * 4}deg`);
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty("--tilt-x", "0deg");
                event.currentTarget.style.setProperty("--tilt-y", "0deg");
              }}
            >
              <div className={styles.portraitFrame}>
                <Image src="/images/acharya-vikash-kumar.jpg" alt="Acharya Vikash Kumar, Vastu consultant" fill priority sizes="(max-width: 800px) 82vw, 42vw" className={styles.portraitImage} />
              </div>
              <div className={styles.expertPlate}><span>Principal consultant</span><strong>Acharya Vikash Kumar</strong></div>
              <div className={styles.heroCompass} aria-hidden="true"><span>N</span><i /></div>
            </div>
          </div>
          <a href="#manifesto" className={styles.scrollCue} aria-label="Scroll to discover"><span>Scroll to discover</span><i /></a>
        </section>

        <section className={styles.manifesto} id="manifesto">
          <div className={styles.sectionIndex}>01 / Philosophy</div>
          <div className={styles.manifestoInner}>
            <p className={styles.eyebrow} data-reveal>Beyond walls and directions</p>
            <h2 data-reveal>A space is not only seen.<span>It is sensed.</span></h2>
            <p className={styles.manifestoCopy} data-reveal>The way light enters, movement flows and rooms relate can quietly shape everyday life. Vastu Inside brings direction, architecture and human experience into one considered conversation.</p>
            <div className={styles.manifestoWords} aria-label="Space, energy, direction, balance">
              {["Space", "Energy", "Direction", "Balance"].map((word, index) => (
                <span key={word} data-reveal style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>{word}</span>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.expert} aria-labelledby="expert-title">
          <div className={styles.expertImageWrap} data-reveal>
            <div className={styles.expertImageMain}><Image src="/images/acharya-vikash-kumar.jpg" alt="Acharya Vikash Kumar outdoors" fill sizes="(max-width: 800px) 100vw, 54vw" className={styles.expertImage} /></div>
            <div className={styles.expertDetailImage}><Image src="/images/gallery/project-4.jpg" alt="Architectural planning detail" fill sizes="280px" className={styles.coverImage} /></div>
          </div>
          <div className={styles.expertCopy}>
            <span className={styles.verticalLabel}>Meet the expert</span>
            <p className={styles.eyebrow} data-reveal>Acharya Vikash Kumar</p>
            <h2 id="expert-title" data-reveal>Ancient understanding. A contemporary point of view.</h2>
            <blockquote data-reveal>“A considered space should support the life unfolding within it.”</blockquote>
            <p data-reveal>Vastu Inside brings Acharya Vikash Kumar&apos;s consultation together with interior thinking and construction planning—so guidance can remain connected from first observation to final space.</p>
            <Link className={styles.textLinkDark} href="/about">Know the expert <Arrow /></Link>
            <div className={styles.expertSocials} aria-label="Acharya Vikash Kumar on social media">
              <a href="https://www.instagram.com/acharya.vikash_27/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.youtube.com/@Acharayavikashkumar" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://www.facebook.com/profile.php?id=61581478106818" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            </div>
          </div>
        </section>

        <section className={styles.services} aria-labelledby="services-title">
          <div className={styles.servicesHeader}>
            <div><p className={styles.eyebrow}>What we shape</p><h2 id="services-title">One vision, from direction to detail.</h2></div>
            <p>Select a discipline to explore how Vastu Inside connects spatial wisdom with real-world design decisions.</p>
          </div>
          <div className={styles.servicesExperience}>
            <div className={styles.serviceVisual} aria-live="polite">
              {services.map((service, index) => (
                <Image key={service.image} src={service.image} alt="" fill sizes="(max-width: 900px) 100vw, 54vw" className={`${styles.coverImage} ${styles.serviceImage} ${activeService === index ? styles.serviceImageActive : ""}`} />
              ))}
              <span className={styles.serviceVisualLabel}>{services[activeService].title}</span>
            </div>
            <div className={styles.serviceList}>
              {services.map((service, index) => (
                <Link key={service.title} href={service.href} className={`${styles.serviceRow} ${activeService === index ? styles.serviceRowActive : ""}`} onMouseEnter={() => setActiveService(index)} onFocus={() => setActiveService(index)} onTouchStart={() => setActiveService(index)}>
                  <span>{service.index}</span><div><h3>{service.title}</h3><p>{service.description}</p></div><Arrow />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.directions} aria-labelledby="direction-title">
          <div className={styles.directionCopy}>
            <p className={styles.eyebrow}>The signature interaction</p>
            <h2 id="direction-title">Every direction changes the conversation.</h2>
            <p>Direction is one layer in understanding a space. Explore the compass as a visual story—not a substitute for a personalised assessment.</p>
            <div className={styles.directionReading} aria-live="polite"><span>{directions[activeDirection].key}</span><div><strong>{directions[activeDirection].name}</strong><p>{directions[activeDirection].note}</p></div></div>
          </div>
          <div className={styles.compass} role="group" aria-label="Explore eight directions">
            <div className={styles.compassLines} aria-hidden="true" /><div className={styles.compassCenter} aria-hidden="true"><span>Vastu</span><small>Inside</small></div>
            {directions.map((direction, index) => (
              <button key={direction.key} className={`${styles.directionPoint} ${activeDirection === index ? styles.directionPointActive : ""}`} style={{ "--direction-index": index } as React.CSSProperties} onClick={() => setActiveDirection(index)} onMouseEnter={() => setActiveDirection(index)} aria-pressed={activeDirection === index} aria-label={direction.name}><span>{direction.key}</span></button>
            ))}
          </div>
        </section>

        <FreeVastuCheck onConsultation={openConsultation} />

        <section className={styles.process} id="approach" aria-labelledby="process-title">
          <div className={styles.processIntro}><p className={styles.eyebrow}>Our approach</p><h2 id="process-title">From first observation to meaningful change.</h2></div>
          <div className={styles.processGrid}>
            <div className={styles.processVisual}>
              {processSteps.map((step, index) => (<Image key={step.image} src={step.image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" className={`${styles.coverImage} ${styles.processImage} ${activeProcess === index ? styles.processImageActive : ""}`} />))}
              <span>{processSteps[activeProcess].number}</span>
            </div>
            <div className={styles.processSteps}>
              {processSteps.map((step, index) => (
                <button key={step.title} className={`${styles.processStep} ${activeProcess === index ? styles.processStepActive : ""}`} onClick={() => setActiveProcess(index)} onMouseEnter={() => setActiveProcess(index)} onFocus={() => setActiveProcess(index)}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></button>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.why} aria-labelledby="why-title">
          <div className={styles.whyHeading}><p className={styles.eyebrow}>Why Vastu Inside</p><h2 id="why-title">Guidance with a sense of context.</h2></div>
          <div className={styles.reasonList}>{reasons.map(([title, text], index) => (<article key={title} data-reveal><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>))}</div>
        </section>

        <IndiaPresence />

        <section className={styles.testimonials} aria-labelledby="testimonials-title">
          <div className={styles.testimonialSide}>
            <p className={styles.eyebrow}>Client experiences</p><h2 id="testimonials-title">Spaces changed. Stories shared.</h2>
            <div className={styles.testimonialControls}><button onClick={() => setActiveTestimonial((activeTestimonial + testimonials.length - 1) % testimonials.length)} aria-label="Previous testimonial">←</button><span>0{activeTestimonial + 1} / 0{testimonials.length}</span><button onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)} aria-label="Next testimonial">→</button></div>
          </div>
          <div className={styles.testimonialQuote} aria-live="polite"><span aria-hidden="true">“</span><blockquote>{testimonials[activeTestimonial].quote}</blockquote><div className={styles.testimonialAuthor}><Image src={testimonials[activeTestimonial].image} alt="" width={64} height={64} /><div><strong>{testimonials[activeTestimonial].name}</strong><small>{testimonials[activeTestimonial].role}</small></div></div></div>
        </section>

        <section className={styles.socialInsights} aria-labelledby="social-title">
          <div>
            <p className={styles.eyebrow}>Follow the conversation</p>
            <h2 id="social-title">Ideas for more considered spaces.</h2>
          </div>
          <p>Short observations, project moments and practical Vastu perspectives—shared through Vastu Inside&apos;s verified channels.</p>
          <nav aria-label="Vastu Inside social channels">
            <a href="https://www.instagram.com/acharya.vikash_27/" target="_blank" rel="noreferrer"><FaInstagram /><span><b>Instagram</b><small>@acharya.vikash_27</small></span><Arrow /></a>
            <a href="https://www.youtube.com/@Acharayavikashkumar" target="_blank" rel="noreferrer"><FaYoutube /><span><b>YouTube</b><small>Watch insights</small></span><Arrow /></a>
            <a href="https://www.facebook.com/profile.php?id=61581478106818" target="_blank" rel="noreferrer"><FaFacebookF /><span><b>Facebook</b><small>Join the community</small></span><Arrow /></a>
          </nav>
        </section>

        <section className={styles.finalCta} aria-labelledby="cta-title">
          <Image src="/images/carousel/vastu-peace.jpg" alt="A calm space at sunset" fill sizes="100vw" className={styles.coverImage} />
          <div className={styles.finalCtaOverlay} />
          <div className={styles.finalCtaContent}><p className={styles.eyebrow}>Begin with a conversation</p><h2 id="cta-title">Your space may already be telling you what needs to change.</h2><p>Let&apos;s look at it with greater clarity—through direction, design and the life you want the space to support.</p><button className={styles.lightButton} onClick={openConsultation}>Book your consultation <FaArrowRight aria-hidden="true" /></button></div>
          <div className={styles.finalSocials}><a href="https://wa.me/917858992627" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp aria-hidden="true" /></a><a href="https://www.instagram.com/acharya.vikash_27/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram aria-hidden="true" /></a></div>
        </section>
      </div>
      <VastuAssistant />
      <ConsultationModal open={isModalOpen} onClose={closeConsultation} />
    </div>
  );
}
