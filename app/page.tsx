import { HeroSection } from "./components/sections/HeroSection";
import { PhotosSection } from "./components/sections/PhotosSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { KnowYourAnimalSection } from "./components/sections/KnowYourAnimalSection";
import { KnowYourAnimalDetailsSection } from "./components/sections/KnowYourAnimalDetailsSection";
import { ArticlesSection } from "./components/sections/ArticlesSection";
import { FaqSection } from "./components/sections/FaqSection";
import { ContactSection } from "./components/sections/ContactSection";
import { WelcomeSection } from "./components/sections/WelcomeSection";
import { PersonasSection } from "./components/sections/PersonasSection";
import { SolutionsSection } from "./components/sections/SolutionsSection";
import { InsightsPreviewSection } from "./components/sections/InsightsPreviewSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <HeroSection />

      <WelcomeSection />

      <PersonasSection />

      <SolutionsSection />

      <InsightsPreviewSection />

      {/* <PhotosSection /> */}

      {/* <ServicesSection /> */}

      {/* <KnowYourAnimalSection /> */}

      {/* <KnowYourAnimalDetailsSection /> */}

      <Suspense fallback={<div>Loading articles...</div>}>
        <ArticlesSection />
      </Suspense>

      <FaqSection />

      <ContactSection />
    </>
  );
}
