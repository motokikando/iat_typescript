import Vue from "vue";
import VueRouter, { Route } from "vue-router";

import Home from "../views/Home.vue";
import IAT from "../views/IAT/IAT.vue";
import Welcome from "../views/IAT/Welcome.vue";
import Result from "../views/IAT/Result.vue";
import Container from "../views/IAT/Container.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      keepAlive: true,
      title: "進行中のプロジェクト"
    }
  },
  {
    path: "/iat",
    name: "IAT",
    component: IAT,
    beforeEnter: (to: Route, from: Route, next: (to?: any) => void) => {
      if (from.path === "/" && (to.path === "/iat" || to.path === "/iat/")) {
        next("/iat/welcome");
      }
      next();
    },
    children: [
      {
        path: "welcome",
        component: Welcome,
        meta: {
          title: "項目説明 | 食事IATテスト"
        }
      },
      {
        path: "main",
        component: Container,
        meta: {
          title: "進行中 | 食事IATテスト"
        }
      },
      {
        path: "result",
        component: Result,
        meta: {
          title: "测验完成，感谢您的支持！"
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
