import {
  Button,
  Card,
  Checkbox,
  FormField,
  Input,
  PasswordInput,
} from "@/components/ui";

import useRegisterForm from "@/features/auth/hooks/useRegisterForm";

import PasswordStrength from "./PasswordStrength";
import RegisterFooter from "./RegisterFooter";
import RegisterHeader from "./RegisterHeader";

export default function RegisterForm() {
  const {
    form,
    onSubmit,
    isLoading,
  } = useRegisterForm();

  const {
    register,
    watch,
    formState: { errors },
  } = form;

  return (
    <Card
      padding="lg"
      className="shadow-xl lg:p-10"
    >
      <RegisterHeader />

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-6"
      >
        <FormField
          label="Full Name"
          required
          error={errors.full_name?.message}
        >
          <Input
            placeholder="John Anderson"
            error={!!errors.full_name}
            {...register("full_name")}
          />
        </FormField>

        <FormField
          label="Company Name"
          required
          error={errors.company_name?.message}
        >
          <Input
            placeholder="Acme Technologies Pvt Ltd"
            error={!!errors.company_name}
            {...register("company_name")}
          />
        </FormField>

        <FormField
          label="Business Email"
          required
          error={errors.email?.message}
        >
          <Input
            type="email"
            placeholder="ceo@company.com"
            error={!!errors.email}
            {...register("email")}
          />
        </FormField>

        <FormField
          label="Phone Number"
          required
          error={errors.phone?.message}
        >
          <Input
            type="tel"
            placeholder="+91 9876543210"
            error={!!errors.phone}
            {...register("phone")}
          />
        </FormField>

        <FormField
            label="Designation"
            required
            error={errors.designation?.message}
          >
          <Input
            placeholder="e.g. Manager, Developer, Student"
            error={!!errors.designation}
            {...register("designation")}
          />
        </FormField>

        <FormField
          label="Password"
          required
          error={errors.password?.message}
        >
          <PasswordInput
            placeholder="Create a strong password"
            error={!!errors.password}
            {...register("password")}
          />
        </FormField>

        <PasswordStrength
          password={watch("password")}
        />

        <FormField
          label="Confirm Password"
          required
          error={errors.confirm_password?.message}
        >
          <PasswordInput
            placeholder="Confirm password"
            error={!!errors.confirm_password}
            {...register("confirm_password")}
          />
        </FormField>

        <div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="accept_terms"
              {...register("accept_terms")}
            />

            <label
              htmlFor="accept_terms"
              className="cursor-pointer text-sm leading-6 text-slate-600"
            >
              I agree to the{" "}
              <span className="font-medium text-indigo-600">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="font-medium text-indigo-600">
                Privacy Policy
              </span>
            </label>
          </div>

          {errors.accept_terms && (
            <p className="mt-2 text-sm text-red-500">
              {errors.accept_terms.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          className="h-12 w-full"
        >
          Create Account
        </Button>
      </form>

      <RegisterFooter />
    </Card>
  );
}