import { Container, Section } from "@/components/ui";

import SecurityGrid from "./SecurityGrid";
import SecurityHeading from "./SecurityHeading";

export default function Security() {
  return (
    <Section
      id="security"
      spacing="xl"
      className="bg-white"
    >
      <Container>
        <SecurityHeading />

        <SecurityGrid />
      </Container>
    </Section>
  );
}