import { createRouter, createWebHistory } from "vue-router";
import UserRole from "@/models/user-role";
import Stores from "@/stores";

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory("/"),
  routes: [
    {
      path: "/:catchAll(.*)",
      redirect: "/404",
    },
    {
      path: "",
      redirect: "/home",
      component: () => import("@/layouts/main/MainLayout.vue"),
      children: [
        {
          name: "Home",
          path: "/home",
          component: () =>
            import("@/views/main/Home.vue"),
        },
        {
          name: "Credit",
          path: "/credit",
          component: () =>
            import("@/views/main/Credit.vue"),
        },
        {
          name: "Auction",
          path: "/auction",
          component: () =>
            import("@/views/main/Auction.vue"),
        },
        {
          name: "AuctionDetails",
          path: "/auction/:id",
          component: () =>
            import("@/views/main/AuctionDetails.vue")
        },
        {
          name: "Profile",
          path: "/profile",
          redirect: "/profile/user",
          component: () =>
            import("@/views/main/profile/Profile.vue"),
          children: [
            {
              name: "InfosUser",
              path: "/profile/user",
              component: () =>
                import("@/views/main/profile/UserInfos.vue"),
            },
            {
              name: "InfosAuctions",
              path: "/profile/auction",
              component: () =>
                import("@/views/main/profile/AuctionInfos.vue"),
            },
            {
              name: "InfosPurchases",
              path: "/profile/purchase",
              component: () =>
                import("@/views/main/profile/PurchaseInfos.vue"),
            },
          ]
        }
      ]
    },
    {
      path: "/admin",
      redirect: "/admin/dashboard",
      component: () => import("@/layouts/admin/AdminLayout.vue"),
      meta: { roles : [UserRole.ADMIN] },
      children: [
        {
          name: "Dashboard",
          path: "/admin/dashboard",
          component: () =>
            import("@/views/admin/dashboard/modern/Modern.vue"),
          // meta: { roles : [UserRole.ADMIN] },
        },
        {
          name: "Users Table",
          path: "/admin/users",
          component: () => import("@/views/admin/EditUsers.vue"),
          // meta: { roles : [UserRole.ADMIN] },
        },
        {
          name: "Credits Table",
          path: "/admin/credits",
          component: () => import("@/views/admin/EditCredits.vue"),
          // meta: { roles : [UserRole.ADMIN] },
        },
        {
          name: "Auctions Table",
          path: "/admin/auctions",
          component: () => import("@/views/admin/EditAuctions.vue"),
          // meta: { roles : [UserRole.ADMIN] },
        },
        {
          name: "Types Table",
          path: "/admin/types",
          component: () => import("@/views/admin/EditAuctionTypes.vue"),
          // meta: { roles : [UserRole.ADMIN] },
        },
      ],
    },
    {
      path: "/",
      component: () => import("@/layouts/singlePage/SinglePageLayout.vue"),
      children: [
        {
          name: "Login",
          path: "/login",
          component: () => import("@/views/authentication/Login.vue"),
        },
        {
          name: "401",
          path: "/401",
          component: () => import("@/views/errors/401.vue"),
        },
        {
          name: "404",
          path: "/404",
          component: () => import("@/views/errors/404.vue"),
        },
        {
          name: "Register",
          path: "/register",
          component: () => import("@/views/authentication/Register.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { roles } = to.meta;
  const currenUser = Stores.getters["currentUser"];

  // @ts-ignore
  if (roles?.length) {
    if (!currenUser) {
      return next({ path: "/login" });
    }

    // @ts-ignore
    if (!roles.includes(currenUser.role)) {
      return next({ path: "/401" });
    }
  }
  next();
})

export default router;
