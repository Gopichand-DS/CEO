import { Container, Section } from "@/components/ui";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroDashboard from "./HeroDashboard";

export default function Hero() {
  return (
    <Section
      spacing="xl"
      className="relative overflow-hidden pt-32 pb-24"
    >
      <HeroBackground />

      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left Side */}
          <HeroContent />

          {/* Right Side */}
          <div className="flex -translate-y-26 justify-center lg:justify-end">
            <HeroDashboard />
          </div>
        </div>
      </Container>
    </Section>
  );
}