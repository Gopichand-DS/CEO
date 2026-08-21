import { Badge, Heading } from "@/components/ui";

export default function ModulesHeading() {
  return (
    <Heading
      align="center"
      badge={
        <Badge>
          Platform Modules
        </Badge>
      }
      title="Everything You Need to Run Your Business with AI"
      description="Mini CEO combines executive intelligence, AI investigations, analytics, reporting, and operational monitoring into one enterprise platform."
    />
  );
}