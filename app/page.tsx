import { HeroSection } from "./components/sections/HeroSection";
import { PhotosSection } from "./components/sections/PhotosSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { KnowYourAnimalSection } from "./components/sections/KnowYourAnimalSection";
import { KnowYourAnimalDetailsSection } from "./components/sections/KnowYourAnimalDetailsSection";
import { ArticlesSection } from "./components/sections/ArticlesSection";
import { FaqSection } from "./components/sections/FaqSection";
import { ContactSection } from "./components/sections/ContactSection";

const articles = [
  {
    title: "Building a balanced portfolio",
    excerpt:
      "How to align property, equities, and protection so your plan stays steady through market cycles.",
    date: "Mar 2026",
  },
  {
    title: "Insurance beyond the basics",
    excerpt:
      "The questions worth asking before you renew—so coverage matches how your life actually looks.",
    date: "Feb 2026",
  },
  {
    title: "Tools that save real time",
    excerpt:
      "A shortlist of calculators and workflows we use with clients to keep decisions clear and fast.",
    date: "Jan 2026",
  },
];

const faqItems = [
  {
    q: "How do I get started?",
    a: "Use Contact Us or WhatsApp to share your goals. We will suggest a short intro call and outline next steps—no obligation.",
  },
  {
    q: "Do you cover all areas you list in the header?",
    a: "Yes. Real estate, investments, insurance, and planning tools are part of how we help clients see the full picture.",
  },
  {
    q: "Is my information kept private?",
    a: "We treat conversations and documents as confidential and only use them to support your planning.",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      <PhotosSection />

      <ServicesSection />

      <KnowYourAnimalSection />

      <KnowYourAnimalDetailsSection />

      <ArticlesSection articles={articles} />

      <FaqSection items={faqItems} />

      <ContactSection />
    </>
  );
}
