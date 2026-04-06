const API_BASE = "http://localhost:5000/api";

function getToken(): string | null {
  return localStorage.getItem("bac-admin-token");
}

export function setToken(token: string) {
  localStorage.setItem("bac-admin-token", token);
}

export function clearToken() {
  localStorage.removeItem("bac-admin-token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

async function request(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {};

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers: { ...headers, ...options.headers } });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return res.json();
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
  getResumeUrl: (id: string) => `${API_BASE}/applications/${id}/resume`,

  // Registrations
  submitRegistration: (data: any) =>
    request("/registrations", { method: "POST", body: JSON.stringify(data) }),
  getRegistrations: () => request("/registrations"),
  updateRegistrationStatus: (id: string, status: string) =>
    request(`/registrations/${id}`, { method: "PUT", body: JSON.stringify({ status }) }),

  // Certificates
  lookupCertificates: (registrationId: string) => request(`/certificates/lookup/${registrationId}`),
  getCertificates: () => request("/certificates"),
  issueCertificate: (data: any) =>
    request("/certificates", { method: "POST", body: JSON.stringify(data) }),
  updateCertificate: (id: string, data: any) =>
    request(`/certificates/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCertificate: (id: string) => request(`/certificates/${id}`, { method: "DELETE" }),
};
