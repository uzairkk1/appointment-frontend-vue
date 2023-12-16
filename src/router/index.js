import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import VerifyEmailView from "../views/VerifyEmailView.vue";
import DoctorProfileView from "../views/DoctorProfileView.vue";

import HomeLayout from "../layouts/HomeLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

import { useQueryClient } from "@tanstack/vue-query";
import { getCurrentUser } from "../services/apiAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/appointments",
      component: HomeView,
      meta: { layout: HomeLayout, requiresAuth: true },
    },
    {
      path: "/appointments",
      name: "appointments",
      component: HomeView,
      meta: { layout: HomeLayout, requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { layout: AuthLayout },
    },
    {
      path: "/register",
      alias: "/register/doctor",
      name: "register",
      component: RegisterView,
      meta: { layout: AuthLayout },
    },
    {
      path: "/update/doctor",
      name: "doctor-profile",
      component: DoctorProfileView,
      meta: { layout: HomeLayout, requiresAuth: true },
    },
    {
      path: "/verify/:token",
      name: "verify",
      component: VerifyEmailView,
      meta: { layout: AuthLayout },
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    //   meta: { layout: HomeLayout },
    // },
    {
      path: "/doctors",
      name: "doctors",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/DoctorsListView.vue"),
      meta: { layout: HomeLayout },
    },
    {
      path: "/appointments/book",
      name: "book-appointment",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/BookAppointmentView.vue"),
      meta: { layout: HomeLayout },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    //using fetch query from query client since useQuery wont work here (only works where ) composables will only run if there is inject available
    const queryClient = useQueryClient();

    let data = null;
    try {
      data = await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
      });

      if (data == undefined) {
        // redirect the user to the login page
        next({ name: "login" });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      // redirect the user to the login page
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
