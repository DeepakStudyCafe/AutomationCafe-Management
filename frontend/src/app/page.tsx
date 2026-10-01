import { Metadata } from "next";
import { Hero } from "../components/automationcafe/Hero";
import { CategoryStrip } from "../components/automationcafe/CategoryStrip";
import { Features } from "../components/automationcafe/Features";
import { TrustStrip } from "../components/automationcafe/TrustStrip";
import { DownloadSection } from "../components/automationcafe/DownloadSection";
import { Cta } from "../components/automationcafe/Cta";

export const metadata: Metadata = {
  title: "Automation Suite for CA Firms - AutomationCafe",
  description: "The ultimate automation suite for CA firms. Handle GST returns, GSTR reconciliation, income tax, Tally XML automation, and PDF tools—all offline on your Windows PC.",
  keywords: "CA automation software, GST software, AI Invoice to Tally, AI PDF Invoice Converter, Tally automation, GSTR-2B reconciliation, Income Tax software, Indian CA tools",
  alternates: {
    canonical: "https://automationcafe.in/",
  },
  openGraph: {
    title: "Automation Suite for CA Firms - AutomationCafe",
    description: "The ultimate automation suite for CA firms. Handle GST returns, GSTR reconciliation, income tax, Tally XML automation, and PDF tools—all offline on your Windows PC.",
    url: "https://automationcafe.in/",
    type: "website",
    images: [
      {
        url: "https://automationcafe.in/Images/automationcafe-black.png",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <Features />
      <TrustStrip />
      <DownloadSection />
      <Cta />
    </>
  );
}
