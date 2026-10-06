import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Vastu Inside | Vastu Consultant, Interiors & Construction",
  description:
    "Vastu Inside blends traditional Vastu wisdom with contemporary interiors and construction for spaces that feel as considered as they look.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Vastu Inside | Transform Your Space, Elevate Your Energy",
    description:
      "Thoughtful Vastu consultation, interiors and construction with Acharya Vikash Kumar.",
    type: "website",
    images: [{ url: "/images/consultation.jpg", width: 1000, height: 882 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vastu Inside | Vastu, Interiors & Construction",
    description: "Ancient spatial wisdom, interpreted for contemporary life.",
    images: ["/images/consultation.jpg"],
  },
  keywords: [
    "Vastu consultant",
    "Vastu consultation",
    "Vastu for home",
    "commercial Vastu",
    "interior design",
    "Acharya Vikash Kumar",
  ],
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Vastu Inside",
    url: "https://vastu-inside.vercel.app/",
    image: "https://vastu-inside.vercel.app/images/consultation.jpg",
    telephone: "+91-7858992627",
    email: "support@vastuinside.com",
    description:
      "Vastu consultation, interior planning and construction guidance for contemporary homes and workplaces.",
    serviceType: ["Vastu consultation", "Interior planning", "Construction planning"],
    areaServed: ["Patna", "Delhi", "Mumbai", "Bengaluru", "Vrindavan"],
    sameAs: [
      "https://www.instagram.com/acharya.vikash_27/",
      "https://www.youtube.com/@Acharayavikashkumar",
      "https://www.facebook.com/profile.php?id=61581478106818",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Acharya Vikash Kumar",
    jobTitle: "Vastu Consultant",
    url: "https://vastu-inside.vercel.app/about",
    image: "https://vastu-inside.vercel.app/images/acharya-vikash-kumar.jpg",
    worksFor: {
      "@type": "Organization",
      name: "Vastu Inside",
      url: "https://vastu-inside.vercel.app/",
    },
    sameAs: [
      "https://www.instagram.com/acharya.vikash_27/",
      "https://www.youtube.com/@Acharayavikashkumar",
      "https://www.facebook.com/profile.php?id=61581478106818",
    ],
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePage />
    </>
  );
}
