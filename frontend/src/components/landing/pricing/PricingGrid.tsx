import PricingCard from "./PricingCard";

const pricingPlans = [
  {
    name: "Starter",
    price: "$5",
    description:
      "Ideal for startups and small teams beginning their AI-powered executive journey.",
    features: [
      "AI Executive Dashboard",
      "Daily Executive Reports",
      "Business Analytics",
      "Email Support",
    ],
  },
  {
    name: "Professional",
    price: "$12",
    description:
      "Perfect for growing businesses that need deeper AI insights and executive intelligence.",
    popular: true,
    features: [
      "Everything in Starter",
      "AI Investigation Engine",
      "Financial Analytics",
      "Project Intelligence",
      "Employee Insights",
      "Priority Support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description:
      "Built for large organizations requiring enterprise security, scalability, and dedicated support.",
    features: [
      "Unlimited AI Requests",
      "Multi-Tenant Architecture",
      "Role-Based Access Control",
      "Dedicated Infrastructure",
      "SSO Integration",
      "Dedicated Success Manager",
    ],
  },
];

export default function PricingGrid() {
  return (
    <div className="mt-20 grid gap-8 lg:grid-cols-3 lg:items-stretch">
      {pricingPlans.map((plan) => (
        <PricingCard
          key={plan.name}
          name={plan.name}
          price={plan.price}
          description={plan.description}
          features={plan.features}
          popular={plan.popular}
        />
      ))}
    </div>
  );
}