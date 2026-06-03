export function authGuard(to, from, next) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token && to.path !== "/login") {
    return next("/login");
  }

  // Example: admin-only route
  if (to.meta?.role && to.meta.role !== role) {
    return next("/");
  }

  next();
}