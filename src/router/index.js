import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../views/pages/TaskList.vue'
import CreateTask from '../views/pages/CreateTask.vue'
import EditTask from '../views/pages/EditTask.vue'
import ShowTask from '../views/pages/TaskShow.vue'
import Login from '../views/pages/Login.vue'
import Register from '../views/pages/Register.vue'

export const authMiddleware = (to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TaskList,
      beforeEnter: authMiddleware,
    },
    {
      path: '/create',
      component: CreateTask,
      beforeEnter: authMiddleware,
    },
    {
      path: '/edit/:id',
      component: EditTask,
      beforeEnter: authMiddleware,
    },
    {
      path: '/show/:id',
      component: ShowTask,
      beforeEnter: authMiddleware,
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
  ]
})

export default router
