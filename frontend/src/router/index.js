import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes.js";
// import auth from "@/middlewares/auth";
import { middlewarePipeline } from "@/middlewares/middlewarePipeline";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

// router.beforeEach((to, from, next) => {
//   const middlewares = Array.isArray(to.meta.middleware)
//     ? to.meta.middleware
//     : [to.meta.middleware].filter(Boolean);

//   for (const middleware of middlewares) {
//     const context = { to, from, next };
//     middleware(context);
//   }
// });

middlewarePipeline(router);
export default router;
