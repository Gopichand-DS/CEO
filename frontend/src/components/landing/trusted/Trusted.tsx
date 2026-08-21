import { Container }  from "@/components/ui";
import { Section } from "@/components/ui";

import Certifications from "./Certifications";
import CompanyLogos from "./CompanyLogos";
import TrustStats from "./TrustStats";
import TrustedHeading from "./TrustedHeading";

export default function Trusted() {
  return (
    <Section
      spacing="xl"
      className="bg-white"
    >
      <Container>
        <TrustedHeading />

        <CompanyLogos />

        <Certifications />

        <TrustStats />
      </Container>
    </Section>
  );
}