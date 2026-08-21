import AuthLayout from "@/layouts/AuthLayout";

import LoginForm from "./LoginForm";
import LoginLeftPanel from "./LoginLeftPanel";

export default function Login() {
  return (
    <AuthLayout
      leftPanel={<LoginLeftPanel />}
    >
      <LoginForm />
    </AuthLayout>
  );
}