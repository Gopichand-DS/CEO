import { Badge, Heading } from "@/components/ui";

export default function FAQHeading() {
  return (
    <Heading
      align="center"
      badge={
        <Badge variant="secondary">
          Frequently Asked Questions
        </Badge>
      }
      title="Everything You Need to Know"
      description="Find answers to the most common questions about Mini CEO, including AI capabilities, security, deployment, integrations, and enterprise support."
    />
  );
}