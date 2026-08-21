import { Toaster } from "react-hot-toast";

import useRestoreSession from "@/features/auth/hooks/useRestoreSession";

import AppRoutes from "./routes";

export default function App() {
  useRestoreSession();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <AppRoutes />
    </>
  );
}
