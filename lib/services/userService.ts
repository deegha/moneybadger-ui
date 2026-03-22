import { serviceHandler } from "../serviceHandler";

export function loginUser(email: string, password: string) {
  return serviceHandler({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    resource: "/v1/login",
    body: { email, password },
  });
}

export function registerUser(name: string, email: string, password: string) {
  return serviceHandler({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    resource: "/v1/register",
    body: { name, email, password },
  });
}
