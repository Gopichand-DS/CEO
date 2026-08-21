import { Container, Section } from "@/components/ui";

import AfterCard from "./AfterCard";
import BeforeCard from "./BeforeCard";
import ComparisonDivider from "./ComparisonDivider";
import ComparisonHeading from "./ComparisonHeading";

export default function Comparison() {
  return (
    <Section
      id="features"
      spacing="xl"
      className="bg-slate-50"
    >
      <Container>
        <ComparisonHeading />

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          <BeforeCard />

          <ComparisonDivider />

          <AfterCard />
        </div>
      </Container>
    </Section>
  );
}