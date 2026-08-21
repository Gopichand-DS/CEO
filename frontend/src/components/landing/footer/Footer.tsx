import { Container, Section } from "@/components/ui";

import FooterBottom from "./FooterBottom";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <Section spacing="lg">
        <Container>
          <div
            className="
              grid
              gap-16
              lg:grid-cols-[1.2fr_2fr]
              lg:items-start
            "
          >
            <FooterBrand />

            <FooterLinks />
          </div>

          <FooterBottom />
        </Container>
      </Section>
    </footer>
  );
}