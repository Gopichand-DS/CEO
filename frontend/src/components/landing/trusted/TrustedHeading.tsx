import { Badge, Heading } from "@/components/ui";

export default function TrustedHeading() {
  return (
    <Heading
      align="center"
      badge={
        <Badge variant="secondary">
          Trusted Worldwide
        </Badge>
      }
      title="Built for Modern Enterprises"
      description="Mini CEO helps organizations transform operational data into executive intelligence through secure, AI-powered decision support."
    />
  );
}