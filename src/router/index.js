import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../views/pages/TaskList.vue'
import CreateTask from '../views/pages/CreateTask.vue'
import EditTask from '../views/pages/EditTask.vue'
import ShowTask from '../views/pages/TaskShow.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TaskList
    },
    {
      path: '/create',
      component: CreateTask
    },
    {
      path: '/edit/:id',
      component: EditTask
    },
    {
      path: '/show/:id',
      component: ShowTask
    },
  ]
})

export default router
