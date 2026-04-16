const EXPECTED_USERNAME = "admin";
const EXPECTED_PW_HASH = "39f3028175592b07612f341354c97f6be146cddd51ea83567af760ae15e5ef92";
const SESSION_KEY = "asof_admin_session";

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function loginAdmin(username: string, password: string): Promise<boolean> {
  if (username !== EXPECTED_USERNAME) return false;
  const hash = await sha256(password);
  if (hash !== EXPECTED_PW_HASH) return false;
  sessionStorage.setItem(SESSION_KEY, "1");
  return true;
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
