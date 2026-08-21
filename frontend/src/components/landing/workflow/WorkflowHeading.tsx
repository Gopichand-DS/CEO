import { Badge, Heading } from "@/components/ui";

export default function WorkflowHeading() {
  return (
    <Heading
      align="center"
      badge={
        <Badge variant="secondary">
          AI Workflow
        </Badge>
      }
      title="How Mini CEO Works"
      description="From raw business data to executive decisions, Mini CEO continuously analyzes your organization, investigates issues, and delivers actionable AI insights."
    />
  );
}