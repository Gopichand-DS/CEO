import { Container, Section } from "@/components/ui";

import CTABackground from "./CTABackground";
import CTAContent from "./CTAContent";

export default function CTA() {
  return (
    <Section
      spacing="lg"
      className="
        relative
        overflow-hidden
        bg-white
      "
    >
      <CTABackground />

      <Container className="relative py-10 lg:py-20">
        <CTAContent />
      </Container>
    </Section>
  );
}