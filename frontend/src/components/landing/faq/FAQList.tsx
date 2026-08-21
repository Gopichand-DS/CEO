import * as Accordion from "@radix-ui/react-accordion";

import FAQItem from "./FAQItem";

const faqs = [
  {
    value: "ai-capabilities",
    question: "What does Mini CEO actually do?",
    answer:
      "Mini CEO is an AI-powered executive intelligence platform that analyzes business data, investigates operational issues, generates executive reports, monitors KPIs, and provides actionable recommendations to support faster decision-making.",
  },
  {
    value: "integrations",
    question: "Can Mini CEO integrate with our existing business systems?",
    answer:
      "Yes. Mini CEO is designed to integrate with ERP, CRM, HRMS, finance platforms, project management tools, and custom internal systems through secure APIs.",
  },
  {
    value: "security",
    question: "How is our company data protected?",
    answer:
      "Your data is protected using JWT authentication, role-based access control, multi-tenant architecture, encrypted communication, and secure backend processing. Each organization's data remains isolated from every other tenant.",
  },
  {
    value: "ai-investigation",
    question: "How does the AI investigation feature work?",
    answer:
      "When unusual business events occur—such as declining revenue, delayed projects, or operational bottlenecks—Mini CEO automatically analyzes related business data, identifies possible root causes, and generates executive-ready recommendations.",
  },
  {
    value: "deployment",
    question: "Can Mini CEO be deployed within our organization?",
    answer:
      "Yes. Mini CEO can be deployed in cloud environments or private enterprise infrastructure depending on your organization's security, compliance, and operational requirements.",
  },
  {
    value: "scalability",
    question: "Is Mini CEO suitable for growing enterprises?",
    answer:
      "Absolutely. The platform is built with a scalable multi-tenant architecture that supports startups, mid-sized businesses, and large enterprises while maintaining high performance and security.",
  },
  {
    value: "support",
    question: "What support options are available?",
    answer:
      "Support varies by plan and includes email assistance, priority support, onboarding guidance, and dedicated enterprise success management for larger organizations.",
  },
  {
    value: "customization",
    question: "Can dashboards and reports be customized?",
    answer:
      "Yes. Executive dashboards, KPIs, reports, and AI insights can be customized to align with your organization's departments, business goals, and reporting requirements.",
  },
];

export default function FAQList() {
  return (
    <div className="mx-auto mt-20 max-w-4xl">
      <Accordion.Root
        type="single"
        collapsible
        className="space-y-5"
      >
        {faqs.map((faq) => (
          <FAQItem
            key={faq.value}
            value={faq.value}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </Accordion.Root>
    </div>
  );
}