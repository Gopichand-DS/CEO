import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  value: string;
  question: string;
  answer: string;
}

export default function FAQItem({
  value,
  question,
  answer,
}: FAQItemProps) {
  return (
    <Accordion.Item
      value={value}
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        transition-colors
        hover:border-indigo-200
      "
    >
      <Accordion.Header>
        <Accordion.Trigger
          className="
            group
            flex
            w-full
            items-center
            justify-between
            gap-6
            px-6
            py-5
            text-left
            text-lg
            font-semibold
            text-slate-900
            transition-colors
            hover:text-indigo-600
          "
        >
          <span>{question}</span>

          <ChevronDown
            className="
              h-5
              w-5
              shrink-0
              text-slate-500
              transition-transform
              duration-300
              group-data-[state=open]:rotate-180
            "
          />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content
        className="
          overflow-hidden
          data-[state=closed]:animate-accordion-up
          data-[state=open]:animate-accordion-down
        "
      >
        <div className="border-t border-slate-100 px-6 py-5 leading-8 text-slate-600">
          {answer}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}