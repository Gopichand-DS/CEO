import { Comparison } from "@/components/landing/comparison";
import { CTA } from "@/components/landing/cta";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Modules } from "@/components/landing/modules";
import { Navbar } from "@/components/landing/navbar";
import { Pricing } from "@/components/landing/pricing";
import { Security } from "@/components/landing/security";
import { Statistics } from "@/components/landing/statistics";
import { Testimonials } from "@/components/landing/testimonials";
import { Trusted } from "@/components/landing/trusted";
import { Workflow } from "@/components/landing/workflow";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <Hero />

        <Trusted />

        <Comparison />

        <Modules />

        <Workflow />

        <Security />

        <Statistics />

        <Testimonials />

        <Pricing />

        <FAQ />

        <CTA />
      </main>

      <Footer />
    </>
  );
}