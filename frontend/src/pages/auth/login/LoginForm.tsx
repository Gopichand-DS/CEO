import {
  Button,
  Card,
  FormField,
  Input,
  PasswordInput,
} from "@/components/ui";

import useLoginForm from "@/features/auth/hooks/useLoginForm";

import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";

export default function LoginForm() {
  const {
    form,
    onSubmit,
    isLoading,
  } = useLoginForm();

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card
      padding="lg"
      className="shadow-xl lg:p-10"
    >
      <LoginHeader />

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-6"
      >
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
          label="Password"
          required
          error={errors.password?.message}
        >
          <PasswordInput
            placeholder="Enter your password"
            error={!!errors.password}
            {...register("password")}
          />
        </FormField>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            Remember me
          </label>

          <button
            type="button"
            className="
              text-sm
              font-medium
              text-indigo-600
              transition-colors
              hover:text-indigo-700
            "
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          className="h-12 w-full"
        >
          Sign In
        </Button>
      </form>

      <LoginFooter />
    </Card>
  );
}