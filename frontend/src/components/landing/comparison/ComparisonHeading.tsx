import { Badge, Heading } from "@/components/ui";

export default function ComparisonHeading() {
  return (
    <Heading
      align="center"
      badge={
        <Badge variant="secondary">
          Why Mini CEO
        </Badge>
      }
      title="From Manual Management to AI Executive Intelligence"
      description="Replace fragmented reporting, delayed decisions, and manual investigations with an AI platform that continuously monitors your business and delivers executive-ready insights."
    />
  );
}