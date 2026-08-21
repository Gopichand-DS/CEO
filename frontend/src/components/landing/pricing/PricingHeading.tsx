import { Badge, Heading } from "@/components/ui";

export default function PricingHeading() {
  return (
    <Heading
      align="center"
      badge={
        <Badge variant="secondary">
          Simple Pricing
        </Badge>
      }
      title="Choose the Right Plan for Your Business"
      description="Whether you're a growing startup or a large enterprise, Mini CEO provides scalable AI-powered executive intelligence tailored to your organization's needs."
    />
  );
}