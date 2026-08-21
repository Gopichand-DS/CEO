import { Badge, Heading } from "@/components/ui";

export default function SecurityHeading() {
  return (
    <Heading
      align="center"
      badge={
        <Badge variant="secondary">
          Enterprise Security
        </Badge>
      }
      title="Built with Enterprise-Grade Security"
      description="Mini CEO is designed to protect sensitive business information with secure authentication, multi-tenant isolation, encrypted communication, and role-based access control."
    />
  );
}