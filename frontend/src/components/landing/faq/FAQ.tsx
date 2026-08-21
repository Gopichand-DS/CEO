import { Container, Section } from "@/components/ui";

import FAQHeading from "./FAQHeading";
import FAQList from "./FAQList";

export default function FAQ() {
  return (
    <Section
      id="faq"
      spacing="xl"
      className="bg-slate-50"
    >
      <Container>
        <FAQHeading />

        <FAQList />
      </Container>
    </Section>
  );
}