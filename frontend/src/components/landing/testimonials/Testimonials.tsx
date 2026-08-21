import { Container } from "@/components/ui";
import { Section } from "lucide-react";
import TestimonialsGrid from "./TestimonialsGrid";
import TestimonialsHeading from "./TestimonialsHeading";

export default function Testimonials() {
  return (
    <Section
      spacing="xl"
      className="bg-white"
    >
      <Container>
        <TestimonialsHeading />

        <TestimonialsGrid />
      </Container>
    </Section>
  );
}