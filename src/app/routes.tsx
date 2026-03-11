import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Careers } from "./pages/Careers";
import { ProficiencyPortal } from "./pages/ProficiencyPortal";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Gallery } from "./pages/Gallery";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { LocationDetail } from "./pages/LocationDetail";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { Dashboard } from "./pages/admin/Dashboard";
import { BlogManager } from "./pages/admin/BlogManager";
import { JobApplications } from "./pages/admin/JobApplications";
import { ProficiencyRegistrations } from "./pages/admin/ProficiencyRegistrations";
import { CertificateManager } from "./pages/admin/CertificateManager";
import { HallmarkingJourney } from "./pages/HallmarkingJourney";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "careers", Component: Careers },
      { path: "proficiency-portal", Component: ProficiencyPortal },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "gallery", Component: Gallery },
      { path: "blog", Component: Blog },
      { path: "blog/:slug", Component: BlogPost },
      { path: "locations/:city", Component: LocationDetail },
      { path: "hallmarking-journey", Component: HallmarkingJourney },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin",
    children: [
      { index: true, Component: AdminLogin },
      {
        Component: AdminLayout,
        children: [
          { path: "dashboard", Component: Dashboard },
          { path: "blog", Component: BlogManager },
          { path: "applications", Component: JobApplications },
          { path: "registrations", Component: ProficiencyRegistrations },
          { path: "certificates", Component: CertificateManager },
        ],
      },
    ],
  },
]);
