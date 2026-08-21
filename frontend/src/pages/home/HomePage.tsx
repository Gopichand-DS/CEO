import Hero from "@/components/landing/hero/Hero";
import Navbar from "@/components/landing/navbar/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
      </main>
    </>
  );
}