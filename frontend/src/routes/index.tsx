import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import LandingPage from "@/pages/landing/LandingPage";
import Login from "@/pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";
import LoginFormForModal from "@/pages/auth/login/LoginForm";
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
      {/* 
        Main application routes.

        When opening Login from the landing page,
        React Router continues rendering the landing page
        because we use the saved background location.
      */}
      <Routes location={backgroundLocation || location}>

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


      {/* 
        Login modal.

        This is rendered only when Login was opened
        from another page using backgroundLocation.
      */}
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


/*
 * Login displayed as a centered glass modal.
 */
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
        z-[100]
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-black/70
        p-6
        backdrop-blur-xl
        sm:p-10
      "
      onClick={handleClose}
    >
      <div
        className="
          absolute
          inset-0
          bg-black/40
          backdrop-blur-2xl
        "
      />

      <div
        className="
          relative
          z-10
          w-full
          max-w-xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        <LoginFormForModal />
      </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close login"
          className="
            absolute
            right-5
            top-5
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            text-slate-500
            shadow-sm
            transition-all
            duration-200
            hover:bg-slate-100
            hover:text-slate-900
          "
        >
          ×
        </button>

        <LoginFormWrapper />
      </div>
  );
}


/*
 * LoginForm already contains the actual white login card.
 * We remove the outer Card styling from the modal by
 * rendering the existing form directly.
 */
function LoginFormWrapper() {
  return <LoginFormForModal />;
}