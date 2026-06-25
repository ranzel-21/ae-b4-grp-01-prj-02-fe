import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PageLoader } from "../shared-components/PageLoader/PageLoader";
import { ProtectedRoute } from "../shared-components/ProtectedRoute/ProtectedRoute";

const LoginView = lazy(() => import("../features/login/view/LoginView"));
const SignupView = lazy(() => import("../features/signup/view/SignupView"));
const DashboardView = lazy(() => import("../features/dashboard/view/DashboardView"));
const ProfileView = lazy(() => import("../features/profile/view/ProfileView"));
const CatalogManagementView = lazy(
  () => import("../features/catalog-management/view/CatalogManagementView")
);
const PublicCatalogView = lazy(() => import("../features/public-catalog/view/PublicCatalogView"));
const CatalogDetailView = lazy(() => import("../features/catalog-detail/view/CatalogDetailView"));
const InquiriesView = lazy(() => import("../features/inquiries/view/InquiriesView"));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Navigate replace to="/catalog" />} path="/" />
        <Route element={<LoginView />} path="/login" />
        <Route element={<SignupView />} path="/signup" />
        <Route
          element={
            <ProtectedRoute>
              <DashboardView />
            </ProtectedRoute>
          }
          path="/dashboard"
        />
        <Route
          element={
            <ProtectedRoute>
              <ProfileView />
            </ProtectedRoute>
          }
          path="/profile"
        />
        <Route
          element={
            <ProtectedRoute>
              <CatalogManagementView />
            </ProtectedRoute>
          }
          path="/vendor/catalog"
        />
        <Route
          element={
            <ProtectedRoute>
              <InquiriesView />
            </ProtectedRoute>
          }
          path="/vendor/inquiries"
        />
        <Route element={<PublicCatalogView />} path="/catalog" />
        <Route element={<CatalogDetailView />} path="/catalog/:itemId" />
        <Route element={<Navigate replace to="/catalog" />} path="*" />
      </Routes>
    </Suspense>
  );
}
