"use client";

import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./HomePage.module.css";

export default function VastuAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={styles.assistant}>
      <div className={`${styles.assistantPanel} ${open ? styles.assistantPanelOpen : ""}`} aria-hidden={!open} inert={!open}>
        <div className={styles.assistantHead}>
          <div><span>Vastu Inside</span><strong>How can we help?</strong></div>
          <button onClick={() => setOpen(false)} aria-label="Close assistance menu">×</button>
        </div>
        <p>This is a guided enquiry menu—not an automated AI consultation.</p>
        <nav aria-label="Vastu Inside assistance options">
          <Link href="/contact">Book consultation <span>↗</span></Link>
          <a href="#free-vastu-check" onClick={() => setOpen(false)}>Start free Vastu check <span>→</span></a>
          <Link href="/services#vastu">Residential Vastu <span>↗</span></Link>
          <Link href="/services#vastu">Commercial Vastu <span>↗</span></Link>
          <a href="https://wa.me/917858992627" target="_blank" rel="noreferrer"><FaWhatsapp /> Talk on WhatsApp <span>↗</span></a>
        </nav>
      </div>
      <button className={styles.assistantTrigger} onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Ask Vastu Inside">
        <i aria-hidden="true" /><span>{open ? "Close" : "Ask Vastu Inside"}</span>
      </button>
    </aside>
  );
}
