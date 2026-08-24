import AuthLayout from "@/layouts/AuthLayout";

import RegisterForm from "./RegisterForm";
import RegisterLeftPanel from "./RegisterLeftPanel";

export default function Register() {
  return (
    <AuthLayout
  variant="glass"
  leftPanel={<RegisterLeftPanel />}
    >
      <RegisterForm />
    </AuthLayout>
  );
}