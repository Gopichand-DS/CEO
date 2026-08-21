import { Container, Section } from "@/components/ui";

import PricingGrid from "./PricingGrid";
import PricingHeading from "./PricingHeading";

export default function Pricing() {
  return (
    <Section
      id="pricing"
      spacing="xl"
      className="bg-white"
    >
      <Container>
        <PricingHeading />

        <PricingGrid />
      </Container>
    </Section>
  );
}