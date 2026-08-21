import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Lightbulb,
} from "lucide-react";

import type {
  ExecutiveDecisionResponse,
} from "../types/report";

interface ExecutiveDecisionsProps {
  decisions: ExecutiveDecisionResponse;
}

const ExecutiveDecisions = ({
  decisions,
}: ExecutiveDecisionsProps) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority.toUpperCase()) {
      case "HIGH":
        return {
          container: "border-red-200 bg-red-50",
          badge: "bg-red-100 text-red-700",
          icon: AlertTriangle,
          iconClass: "text-red-600",
        };

      case "MEDIUM":
        return {
          container: "border-yellow-200 bg-yellow-50",
          badge: "bg-yellow-100 text-yellow-700",
          icon: AlertTriangle,
          iconClass: "text-yellow-600",
        };

      default:
        return {
          container: "border-green-200 bg-green-50",
          badge: "bg-green-100 text-green-700",
          icon: CheckCircle2,
          iconClass: "text-green-600",
        };
    }
  };

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-indigo-100 p-3">
          <Lightbulb
            size={22}
            className="text-indigo-600"
          />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Executive Decisions
          </h2>

          <p className="text-sm text-slate-500">
            Business issues, findings, and recommended actions.
          </p>
        </div>

      </div>

      <div className="mb-6 rounded-xl bg-slate-50 p-5">

        <div className="flex items-center gap-3">

          <Info
            size={20}
            className="text-indigo-600"
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Overall Status
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {decisions.overall_status}
            </p>
          </div>

        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          {decisions.executive_summary}
        </p>

      </div>

      {decisions.decisions.length === 0 ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">

          <CheckCircle2
            className="mx-auto mb-2 text-green-600"
            size={28}
          />

          <p className="font-semibold text-green-700">
            No immediate decisions required
          </p>

          <p className="mt-1 text-sm text-green-600">
            The company is currently operating within healthy conditions.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {decisions.decisions.map(
            (decision, index) => {
              const styles =
                getPriorityStyles(
                  decision.priority,
                );

              const Icon = styles.icon;

              return (
                <div
                  key={`${decision.title}-${index}`}
                  className={`rounded-xl border p-5 ${styles.container}`}
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex gap-3">

                      <Icon
                        size={21}
                        className={`mt-0.5 shrink-0 ${styles.iconClass}`}
                      />

                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="font-semibold text-slate-900">
                            {decision.title}
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
                          >
                            {decision.priority}
                          </span>

                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {decision.description}
                        </p>

                      </div>

                    </div>

                    {decision.confidence !== null && (
                      <div className="shrink-0 rounded-lg bg-white/70 px-3 py-2 text-xs font-medium text-slate-600">
                        Confidence:{" "}
                        {decision.confidence}%
                      </div>
                    )}

                  </div>

                  {decision.findings.length > 0 && (
                    <div className="mt-5">

                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Findings
                      </p>

                      <ul className="space-y-2">

                        {decision.findings.map(
                          (finding, findingIndex) => (
                            <li
                              key={findingIndex}
                              className="text-sm text-slate-600"
                            >
                              • {finding}
                            </li>
                          ),
                        )}

                      </ul>

                    </div>
                  )}

                  {decision.recommendations.length > 0 && (
                    <div className="mt-5">

                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Recommendations
                      </p>

                      <ul className="space-y-2">

                        {decision.recommendations.map(
                          (
                            recommendation,
                            recommendationIndex,
                          ) => (
                            <li
                              key={
                                recommendationIndex
                              }
                              className="text-sm text-slate-600"
                            >
                              • {recommendation}
                            </li>
                          ),
                        )}

                      </ul>

                    </div>
                  )}

                </div>
              );
            },
          )}

        </div>
      )}

    </section>
  );
};

export default ExecutiveDecisions;