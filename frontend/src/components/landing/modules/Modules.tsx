import { Container, Section } from "@/components/ui";

import ModulesGrid from "./ModulesGrid";
import ModulesHeading from "./ModulesHeading";

export default function Modules() {
  return (
    <Section
      spacing="xl"
      className="bg-white"  
    >
      <Container>
        <ModulesHeading />

        <ModulesGrid />
      </Container>
    </Section>
  );
}