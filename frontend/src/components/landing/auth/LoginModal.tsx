import { X } from "lucide-react";

import LoginForm from "@/pages/auth/login/LoginForm";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({
  open,
  onClose,
}: LoginModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/75
        p-4
        backdrop-blur-xl
      "
      role="dialog"
      aria-modal="true"
      aria-label="Login"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-lg">
        <button
          type="button"
          aria-label="Close login"
          onClick={onClose}
          className="
            absolute
            -right-3
            -top-3
            z-10
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/80
            text-white
            shadow-lg
            backdrop-blur-xl
            transition-all
            duration-300
            hover:bg-black
          "
        >
          <X className="h-5 w-5" />
        </button>

        <LoginForm />
      </div>
    </div>
  );
}