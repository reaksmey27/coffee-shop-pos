export function authGuard(to, from, next) {
  const token = localStorage.getItem("token");

  if (!token && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
}