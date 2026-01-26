import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../layouts/defaultLayout";
import { Login } from "../page/login";
import { NotFound } from "../page/notFound";
import { APP_PAGES } from "./pages.routes";
import ProtectedRoute from "./ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DefaultLayout />}>
          {APP_PAGES.map(({ route, component }) => (
            <Route key={route} path={route} element={component} />
          ))}
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
