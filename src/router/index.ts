import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GitGraphView from "../views/GitGraphView.vue";

const router = createRouter({
  history: createWebHistory("/vue-ai-practice/"),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/git-graph",
      name: "git-graph",
      component: GitGraphView,
    },
    {
      path: "/css-playground",
      name: "css-playground",
      component: () => import("../views/CssPlaygroundView.vue"),
    },
    {
      path: "/html-builder",
      name: "html-builder",
      component: () => import("../views/HtmlBuilderView.vue"),
    },
    {
      path: "/a11y-checker",
      name: "a11y-checker",
      component: () => import("../views/A11yCheckerView.vue"),
    },
    {
      path: "/js-explorer",
      name: "js-explorer",
      component: () => import("../views/JsExplorerView.vue"),
    },
  ],
});

export default router;
