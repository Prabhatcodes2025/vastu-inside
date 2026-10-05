import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="editorial-footer">
      <div className="editorial-footer__top">
        <div className="editorial-footer__brand">
          <div className="editorial-footer__logo">
            <Image src="/images/logo.png" alt="Vastu Inside" width={3528} height={1037} />
          </div>
          <p>Traditional Vastu wisdom, thoughtfully interpreted for contemporary spaces.</p>
        </div>
        <div className="editorial-footer__nav">
          <span>Explore</span>
          <Link href="/services">Services</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="editorial-footer__contact">
          <span>Start a conversation</span>
          <a className="editorial-footer__phone" href="tel:+917858992627">+91 7858992627</a>
          <a href="mailto:support@vastuinside.com">support@vastuinside.com</a>
          <p>Vrindavan, Uttar Pradesh<br />Patna, Bihar</p>
        </div>
      </div>
      <div className="editorial-footer__wordmark">VASTU INSIDE</div>
      <div className="editorial-footer__bottom">
        <p>© {new Date().getFullYear()} Vastu Inside</p>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        <div className="editorial-footer__socials">
          <a href="https://wa.me/917858992627" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          <a href="https://www.instagram.com/acharya.vikash_27/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://www.youtube.com/@Acharayavikashkumar" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
          <a href="https://www.facebook.com/profile.php?id=61581478106818" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
        </div>
      </div>
    </footer>
  );
}
