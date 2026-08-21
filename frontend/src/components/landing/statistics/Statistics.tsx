import { Container, Section } from "@/components/ui";

import StatisticsGrid from "./StatisticsGrid";
import StatisticsHeading from "./StatisticsHeading";

export default function Statistics() {
  return (
    <Section
      spacing="xl"
      className="bg-slate-50"
    >
      <Container>
        <StatisticsHeading />

        <StatisticsGrid />
      </Container>
    </Section>
  );
}