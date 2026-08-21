import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui";

export default function HeroActions() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Button
        asChild
        size="lg"
        className="group"
      >
        <Link to="/register">
          Start Free

          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>

      <Button
        asChild
        variant="outline"
        size="lg"
      >
        <Link to="/demo">
          <PlayCircle className="mr-2 h-5 w-5" />

          Watch Demo
        </Link>
      </Button>
    </div>
  );
}