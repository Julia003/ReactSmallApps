import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const expirationDate = new Date(localStorage.expiration);
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function getAuthToken() {
  const token = localStorage.token;

  if (!token) return null;

  const tokenDuration = getTokenDuration();

  if (tokenDuration <= 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken() || null;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return null;
}
