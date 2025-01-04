// middleware/auth.js
export default function auth({ to, from, next }) {
  const isAuthenticated = !!localStorage.getItem("token");
  if (!isAuthenticated && to.meta.requiresAuth) {
    return next({ name: "login" });
  }
  next();
}
