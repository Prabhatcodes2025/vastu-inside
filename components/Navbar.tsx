"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Gallery", "/gallery"],
  ["About", "/about"],
  ["FAQ", "/faq"],
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className={`site-header ${isHome ? "site-header--home" : "site-header--inner"} ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="site-nav" aria-label="Primary navigation">
        <Link href="/" className="site-logo" aria-label="Vastu Inside home">
          <Image src="/images/logo.png" alt="Vastu Inside" width={3528} height={1037} priority />
        </Link>

        <div className="site-nav__links">
          {links.map(([label, href]) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
          ))}
        </div>

        <Link href="/contact" className="site-nav__cta">Book consultation <span aria-hidden="true">↗</span></Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"}>
          <span /><span />
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__number">Menu / 01—05</div>
        <div className="mobile-menu__links">
          {links.map(([label, href], index) => (
            <Link key={href} href={href} tabIndex={menuOpen ? 0 : -1}><span>0{index + 1}</span>{label}<i aria-hidden="true">↗</i></Link>
          ))}
          <a className="mobile-menu__free-check" href="/#free-vastu-check" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}><span>Free</span>Start Vastu Check<i aria-hidden="true">→</i></a>
        </div>
        <div className="mobile-menu__footer">
          <div><a href="tel:+917858992627">+91 7858992627</a><a href="mailto:support@vastuinside.com">support@vastuinside.com</a></div>
          <div className="mobile-menu__socials">
            <a href="https://wa.me/917858992627" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href="https://www.instagram.com/acharya.vikash_27/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.youtube.com/@Acharayavikashkumar" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>
    </header>
  );
}
