import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui";

interface RegisterActionsProps {
  loading?: boolean;
}

export default function RegisterActions({
  loading = false,
}: RegisterActionsProps) {
  return (
    <div className="pt-2">
      <Button
        type="submit"
        loading={loading}
        className="
          group
          h-12
          w-full
          rounded-xl
          bg-[#4F46E5]
          text-base
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#4338CA]
          hover:text-white
          hover:shadow-xl
          active:bg-[#3730A3]
        "
      >
        {!loading && (
          <>
            Create Account

            <ArrowRight
              className="
                ml-2
                h-5
                w-5
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </>
        )}
      </Button>
    </div>
  );
}