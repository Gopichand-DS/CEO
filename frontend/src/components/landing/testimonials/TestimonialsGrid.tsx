import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    initials: "AR",
    name: "Alex Rodriguez",
    role: "Chief Executive Officer",
    company: "Vertex Technologies",
    quote:
      "Mini CEO reduced the time we spent preparing executive reports from hours to minutes. The AI investigations have become an essential part of our weekly leadership meetings.",
  },
  {
    initials: "SP",
    name: "Sarah Parker",
    role: "Chief Operating Officer",
    company: "Nova Manufacturing",
    quote:
      "Instead of manually tracking operational issues across departments, Mini CEO identifies risks automatically and gives us clear recommendations before problems escalate.",
  },
  {
    initials: "MJ",
    name: "Michael Johnson",
    role: "Chief Financial Officer",
    company: "FinCore Group",
    quote:
      "Financial reporting is significantly faster, and the executive insights help us understand revenue fluctuations with remarkable clarity.",
  },
  {
    initials: "DL",
    name: "David Lee",
    role: "Director of Operations",
    company: "Prime Logistics",
    quote:
      "Project delays are detected early, allowing our teams to act before deadlines are affected. The operational visibility is outstanding.",
  },
  {
    initials: "EM",
    name: "Emily Martinez",
    role: "Chief Technology Officer",
    company: "CloudScale Systems",
    quote:
      "The platform integrates seamlessly with our existing infrastructure. Security, scalability, and AI capabilities make it an excellent enterprise solution.",
  },
  {
    initials: "JW",
    name: "James Wilson",
    role: "Vice President of Sales",
    company: "Growth Dynamics",
    quote:
      "Mini CEO provides our leadership team with sales insights that previously required multiple dashboards. Everything is now available in one executive view.",
  },
];

export default function TestimonialsGrid() {
  return (
    <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={`${testimonial.name}-${testimonial.company}`}
          initials={testimonial.initials}
          name={testimonial.name}
          role={testimonial.role}
          company={testimonial.company}
          quote={testimonial.quote}
        />
      ))}
    </div>
  );
}