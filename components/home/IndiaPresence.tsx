"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./HomePage.module.css";

const cities = [
  { name: "Delhi", x: 42, y: 26, code: "DEL" },
  { name: "Vrindavan", x: 40, y: 33, code: "VRN" },
  { name: "Patna", x: 64, y: 40, code: "PAT" },
  { name: "Mumbai", x: 28, y: 62, code: "BOM" },
  { name: "Bengaluru", x: 43, y: 82, code: "BLR" },
];

export default function IndiaPresence() {
  const [activeCity, setActiveCity] = useState(2);
  const city = cities[activeCity];

  return (
    <section className={styles.presence} aria-labelledby="presence-title">
      <div className={styles.presenceCopy}>
        <p className={styles.eyebrow}>A growing national presence</p>
        <h2 id="presence-title">Vastu Inside, across India.</h2>
        <p>
          Consultation conversations connect Vastu Inside with people in key cities across
          the country. Select a point to explore the current presence network.
        </p>
        <div className={styles.cityPanel} aria-live="polite">
          <span>{city.code} / India</span>
          <strong>{city.name}</strong>
          <p>Vastu Inside presence</p>
          <Link href="/contact">Explore consultation <b aria-hidden="true">↗</b></Link>
        </div>
        <div className={styles.citySelector} aria-label="Select a city">
          {cities.map((item, index) => (
            <button key={item.name} onClick={() => setActiveCity(index)} aria-pressed={activeCity === index}>{item.name}</button>
          ))}
        </div>
      </div>

      <div className={styles.indiaMap} data-reveal>
        <svg viewBox="0 0 600 720" role="img" aria-label="Stylised map of India showing Vastu Inside presence in Patna, Delhi, Mumbai, Bengaluru and Vrindavan">
          <defs>
            <linearGradient id="india-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff8e8" stopOpacity=".2" />
              <stop offset="1" stopColor="#ffbb38" stopOpacity=".08" />
            </linearGradient>
            <filter id="map-glow"><feGaussianBlur stdDeviation="5" /></filter>
          </defs>
          <path className={styles.indiaGlow} d="M238 34 281 52 312 39 342 62 378 65 392 96 420 112 450 101 481 126 468 155 490 181 471 214 493 239 479 268 448 282 455 318 431 342 416 385 390 410 378 456 351 492 337 540 310 584 289 651 266 620 250 568 217 537 202 491 171 454 160 414 132 386 146 344 119 313 137 280 115 245 139 214 128 177 161 157 170 119 202 104 211 66Z" />
          <path className={styles.indiaOutline} pathLength="1" d="M238 34 281 52 312 39 342 62 378 65 392 96 420 112 450 101 481 126 468 155 490 181 471 214 493 239 479 268 448 282 455 318 431 342 416 385 390 410 378 456 351 492 337 540 310 584 289 651 266 620 250 568 217 537 202 491 171 454 160 414 132 386 146 344 119 313 137 280 115 245 139 214 128 177 161 157 170 119 202 104 211 66Z" />
          <path className={styles.energyPath} pathLength="1" d="M252 190 Q320 180 386 282 T260 450 T310 590" />
          <path className={styles.energyPathAlt} pathLength="1" d="M240 235 Q205 350 180 447 M258 230 Q330 260 390 286" />
        </svg>
        {cities.map((item, index) => (
          <button
            key={item.name}
            className={`${styles.mapMarker} ${activeCity === index ? styles.mapMarkerActive : ""}`}
            style={{ left: `${item.x}%`, top: `${item.y}%`, "--marker-delay": `${index * 110}ms` } as React.CSSProperties}
            onClick={() => setActiveCity(index)}
            onMouseEnter={() => setActiveCity(index)}
            aria-label={`${item.name}, Vastu Inside presence`}
            aria-pressed={activeCity === index}
          >
            <i /><span>{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
