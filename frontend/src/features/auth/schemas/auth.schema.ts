import { z } from "zod";

export const registerSchema = z
  .object({
    full_name: z
      .string()
      .min(3, "Full name must be at least 3 characters"),

    company_name: z
      .string()
      .min(2, "Company name is required"),

    email: z
      .email("Please enter a valid email"),

    phone: z
      .string()
      .min(10, "Please enter a valid phone number"),

    designation: z
      .string()
      .min(2, "Designation is required")
      .max(100, "Designation is too long"),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .regex(/[A-Z]/, "One uppercase letter required")
      .regex(/[a-z]/, "One lowercase letter required")
      .regex(/[0-9]/, "One number required")
      .regex(/[^A-Za-z0-9]/, "One special character required"),

    confirm_password: z.string(),

    accept_terms: z.boolean(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  })
  .refine((data) => data.accept_terms, {
    path: ["accept_terms"],
    message: "Please accept the Terms & Conditions",
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;