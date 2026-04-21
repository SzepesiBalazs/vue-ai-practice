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
    {
      path: "/ts-explorer",
      name: "ts-explorer",
      component: () => import("../views/TsExplorerView.vue"),
    },
    {
      path: "/go-explorer",
      name: "go-explorer",
      component: () => import("../views/GoExplorerView.vue"),
    },
    {
      path: "/dependency-graph",
      name: "dependency-graph",
      component: () => import("../views/DependencyGraphView.vue"),
    },
    {
      path: "/php-explorer",
      name: "php-explorer",
      component: () => import("../views/PhpExplorerView.vue"),
    },
  ],
});

export default router;
