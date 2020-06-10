import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '../components/TodoList'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/completed',
      component: TodoList,
      props: {
        completed: true,
        isMain: true
      },
    },
    {
      path: '/list/:id',
      component: TodoList,
      props: {
        isMain: false,
      },
    },
    {
      path: '/',
      component: TodoList,
      props: {
        isMain: true,
      },
    },
    {
      path :'*',
      redirect: '/'
    }
  ]

const router = new VueRouter({
  routes
})

export default router
