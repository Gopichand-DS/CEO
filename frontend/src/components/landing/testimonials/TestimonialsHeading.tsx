import { Badge, Heading } from "@/components/ui";

export default function TestimonialsHeading() {
  return (
    <Heading
      align="center"
      badge={
        <Badge variant="secondary">
          Executive Success Stories
        </Badge>
      }
      title="Trusted by Business Leaders"
      description="Executives rely on Mini CEO to streamline reporting, investigate business issues, and make faster, data-driven decisions with confidence."
    />
  );
}