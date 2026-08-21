import type { ReactNode } from "react";

import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

export default function FormField({
  label,
  htmlFor,
  required = false,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={htmlFor}
        required={required}
      >
        {label}
      </Label>

      {children}

      <ErrorMessage
        message={error}
      />
    </div>
  );
}