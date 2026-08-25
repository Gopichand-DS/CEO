import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import LandingPage from "@/pages/landing/LandingPage";
import Login from "@/pages/auth/login/Login";
import LoginForm from "@/pages/auth/login/LoginForm";
import Register from "@/pages/auth/register/Register";

import TasksPage from "@/pages/dashboard/tasks/TasksPage";
import TeamsPage from "@/pages/dashboard/teams/TeamsPage";
import DashboardLayout from "@/pages/dashboard/DashBoardLayout";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import AIAssistant from "@/pages/dashboard/ai/AIAssistant";
import EmployeesPage from "@/pages/dashboard/employees/EmployeesPage";
import ProjectsPage from "@/pages/dashboard/projects/ProjectsPage";
import ReportsPage from "@/pages/dashboard/reports/ReportsPage";
import CompanyPage from "@/pages/dashboard/company/CompanyPage";
import SettingsPage from "@/pages/dashboard/settings/SettingsPage";
import NotificationsPage from "@/pages/dashboard/notifications/NotificationsPage";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  const location = useLocation();

  const backgroundLocation =
    location.state?.backgroundLocation;

  return (
    <>
      {/* Main application routes */}
      <Routes
        location={
          backgroundLocation || location
        }
      >
        {/* Public Routes */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Dashboard */}

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/dashboard/ai"
            element={<AIAssistant />}
          />

          <Route
            path="/dashboard/projects"
            element={<ProjectsPage />}
          />

          <Route
            path="/dashboard/employees"
            element={<EmployeesPage />}
          />

          <Route
            path="/dashboard/teams"
            element={<TeamsPage />}
          />

          <Route
            path="/dashboard/tasks"
            element={<TasksPage />}
          />

          <Route
            path="/dashboard/reports"
            element={<ReportsPage />}
          />

          <Route
            path="/dashboard/company"
            element={<CompanyPage />}
          />

          <Route
            path="/dashboard/notifications"
            element={<NotificationsPage />}
          />

          <Route
            path="/dashboard/settings"
            element={<SettingsPage />}
          />
        </Route>
      </Routes>

      {/* Login Modal */}
      {backgroundLocation && (
        <Routes>
          <Route
            path="/login"
            element={<LoginModal />}
          />
        </Routes>
      )}
    </>
  );
}


/* Login Modal */

function LoginModal() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        min-h-screen
        items-center
        justify-center
        overflow-y-auto
        bg-black/70
        p-6
        backdrop-blur-xl
        sm:p-10
      "
      role="dialog"
      aria-modal="true"
      aria-label="Login"
      onMouseDown={handleClose}
    >
      {/* Black Glass Overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/40
          backdrop-blur-2xl
        "
      />

      {/* Centered Login */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-xl
        "
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close login"
          className="
            absolute
            -right-3
            -top-3
            z-20
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            text-slate-500
            shadow-xl
            transition-all
            duration-200
            hover:bg-slate-100
            hover:text-slate-900
          "
        >
          ×
        </button>

        <LoginForm />
      </div>
    </div>
  );
}