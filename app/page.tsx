import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Vastu Inside | Vastu, Interiors & Construction",
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
};

export default function Home() {
  return <HomePage />;
}
