import { Route, Routes } from "react-router-dom";

import LandingPage from "@/pages/landing/LandingPage";
import Login from "@/pages/auth/login/Login";
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
import ProtectedRoute from "./ProtectedRoute";
import SettingsPage from "@/pages/dashboard/settings/SettingsPage";
import NotificationsPage from "@/pages/dashboard/notifications/NotificationsPage";


export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

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
  );
}