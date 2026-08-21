import { Badge, Heading } from "@/components/ui";

export default function StatisticsHeading() {
  return (
    <Heading
      align="center"
      badge={
        <Badge variant="secondary">
          Proven Business Impact
        </Badge>
      }
      title="Delivering Measurable Results for Modern Enterprises"
      description="Mini CEO empowers executive teams with faster decision-making, AI-powered investigations, and enterprise-grade reliability that scales with your business."
    />
  );
}