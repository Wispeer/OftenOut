import { useRouter } from "vue-router";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Token does not exist, redirecting to login");
      const router = useRouter();
      router.push("/login");
    } else {
      console.log("Token exists, user is logged in");
    }
  }
});
