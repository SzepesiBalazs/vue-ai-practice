import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GitGraphView from '../views/GitGraphView.vue'

const router = createRouter({
  history: createWebHistory('/vue-ai-practice/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/git-graph',
      name: 'git-graph',
      component: GitGraphView,
    },
  ],
})

export default router
