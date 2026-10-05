"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./HomePage.module.css";

type ConsultationModalProps = { open: boolean; onClose: () => void };

export default function ConsultationModal({ open, onClose }: ConsultationModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState({ name: "", contact: "", service: "Vastu consultation" });

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, input, select, a[href], [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); previousFocus?.focus(); };
  }, [open, onClose]);

  if (!open) return null;
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const message = `Hello Vastu Inside, I am ${form.name}. I would like to discuss ${form.service}. Please contact me at ${form.contact}.`;
    window.open(`https://wa.me/917858992627?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="consultation-title" ref={dialogRef}>
        <button ref={closeRef} className={styles.modalClose} onClick={onClose} aria-label="Close consultation form"><span /><span /></button>
        <div className={styles.modalIntro}><span>Private consultation</span><h2 id="consultation-title">Let&apos;s begin with your space.</h2><p>Share a few details and continue the conversation securely on WhatsApp.</p><div><a href="tel:+917858992627">+91 7858992627</a><a href="mailto:support@vastuinside.com">support@vastuinside.com</a></div></div>
        <form onSubmit={onSubmit} className={styles.modalForm}>
          <label><span>Your name</span><input required autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="How should we address you?" /></label>
          <label><span>Phone or email</span><input required autoComplete="tel" value={form.contact} onChange={(event) => setForm({ ...form, contact: event.target.value })} placeholder="Your preferred contact" /></label>
          <label><span>I&apos;m interested in</span><select value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}><option>Vastu consultation</option><option>Interior design</option><option>Construction planning</option></select></label>
          <button type="submit">Continue on WhatsApp <span aria-hidden="true">↗</span></button>
          <small>You control what is sent before the message is shared.</small>
        </form>
      </div>
    </div>
  );
}
