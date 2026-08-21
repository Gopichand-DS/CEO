import { Container, Section } from "@/components/ui";

import WorkflowHeading from "./WorkflowHeading";
import WorkflowTimeline from "./WorkflowTimeline";

export default function Workflow() {
  return (
    <Section
      id="workflow"
      spacing="xl"
      className="bg-slate-50"
    >
      <Container>
        <WorkflowHeading />

        <WorkflowTimeline />
      </Container>
    </Section>
  );
}