const API_BASE = "/api";
const TOKEN_KEY = "bac-admin-token";

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/** Read the `exp` claim without verifying — the server is still the authority. */
function getTokenExpiry(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return typeof payload.exp === "number" ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

/**
 * Tokens expire after 24h. Checking only for presence meant an expired token
 * still rendered the whole admin shell, which then failed every request with a
 * 401 and no explanation. Treat expired (or malformed) tokens as signed out.
 */
export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) return false;
  const expiry = getTokenExpiry(token);
  if (expiry === null) return false;
  if (Date.now() >= expiry) {
    clearToken();
    return false;
  }
  return true;
}

/**
 * Drop the dead session and bounce to the login screen. Only redirect when the
 * admin is actually inside the admin area and not already sitting on the login
 * page — a stale token must never yank someone off a public page.
 */
function forceLogout() {
  clearToken();
  const { pathname } = window.location;
  if (pathname.startsWith("/admin") && pathname !== "/admin") {
    window.location.assign("/admin");
  }
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(endpoint: string, options: RequestInit = {}) {
  const headers: Record<string, string> = { ...authHeaders() };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  if (!res.ok) {
    // An expired or invalid token should return the admin to the login screen
    // rather than leaving them on a page that silently fails to load.
    if (res.status === 401 && getToken()) {
      forceLogout();
      throw new Error("Your session has expired. Please sign in again.");
    }
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  // 204 and other empty responses have no JSON body to parse.
  if (res.status === 204) return null;
  return res.json();
}

/**
 * Resume downloads hit an auth-protected endpoint, so they cannot be opened as a
 * plain link — a new tab sends no Authorization header and the server answers
 * 401. Fetch it with credentials attached and save the resulting blob instead.
 */
async function downloadResume(id: string, candidateName?: string) {
  const res = await fetch(`${API_BASE}/applications/${id}/resume`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    if (res.status === 401 && getToken()) {
      forceLogout();
      throw new Error("Your session has expired. Please sign in again.");
    }
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Could not download resume");
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${candidateName || "candidate"} - Resume.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/**
 * Download a certificate PDF as a blob.
 *
 * Labs must supply the email address from their registration; admins are
 * authorised by their bearer token instead and can omit it. Either way the file
 * is streamed from an authorised endpoint, never a public static path.
 */
async function downloadCertificate(id: string, email?: string, filename?: string) {
  const res = await fetch(`${API_BASE}/certificates/${id}/download`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ email: email || "" }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Could not download certificate");
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename || "certificate"}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  // Jobs (public)
  getJobs: () => request("/jobs"),
  // Jobs (admin)
  getAllJobs: () => request("/jobs/all"),
  createJob: (data: any) => request("/jobs", { method: "POST", body: JSON.stringify(data) }),
  updateJob: (id: string, data: any) => request(`/jobs/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteJob: (id: string) => request(`/jobs/${id}`, { method: "DELETE" }),

  // Applications
  submitApplication: (formData: FormData) =>
    request("/applications", { method: "POST", body: formData }),
  getApplications: () => request("/applications"),
  updateApplicationStatus: (id: string, status: string) =>
    request(`/applications/${id}`, { method: "PUT", body: JSON.stringify({ status }) }),
  deleteApplication: (id: string) => request(`/applications/${id}`, { method: "DELETE" }),
  downloadResume,

  // Registrations
  submitRegistration: (data: any) =>
    request("/registrations", { method: "POST", body: JSON.stringify(data) }),
  getRegistrations: () => request("/registrations"),
  updateRegistrationStatus: (id: string, status: string) =>
    request(`/registrations/${id}`, { method: "PUT", body: JSON.stringify({ status }) }),
  deleteRegistration: (id: string) => request(`/registrations/${id}`, { method: "DELETE" }),

  // Certificates
  lookupCertificates: (registrationId: string) =>
    request(`/certificates/lookup/${encodeURIComponent(registrationId)}`),
  getCertificates: () => request("/certificates"),
  // Accepts FormData when a PDF is attached, or a plain object when it is not.
  issueCertificate: (data: any) =>
    request("/certificates", {
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  updateCertificate: (id: string, data: any) =>
    request(`/certificates/${id}`, {
      method: "PUT",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  deleteCertificate: (id: string) => request(`/certificates/${id}`, { method: "DELETE" }),
  downloadCertificate,

  // Blog (public)
  getBlogPosts: () => request("/blog"),
  getBlogPost: (slug: string) => request(`/blog/${encodeURIComponent(slug)}`),
  // Blog (admin)
  getAllBlogPosts: () => request("/blog/all"),
  getBlogPostById: (id: string) => request(`/blog/id/${id}`),
  createBlogPost: (data: any) => request("/blog", { method: "POST", body: JSON.stringify(data) }),
  updateBlogPost: (id: string, data: any) =>
    request(`/blog/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteBlogPost: (id: string) => request(`/blog/${id}`, { method: "DELETE" }),
};
