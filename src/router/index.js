import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        component: () =>
          import('@/views/Dashboard.vue'),
      },
      {
        path: '/employees',
        name: 'Empleados',
        component: () => import('@/views/employees/EmployeeReport.vue'),
      },
      {
        path: '/subsidiaries',
        name: 'Sucursales',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            path: '',
            name: 'Index',
            component: () => import('@/views/subsidiaries/SubsidiaryReport.vue'),
          },
          {
            path: ':id/items',
            name: 'Artículos registrados',
            component: () => import('@/views/subsidiaries/InventoryIndex.vue'),
          },
        ],
      },
      {
        path: '/items',
        name: 'Artículos',
        component: () => import('@/views/Item/ItemReport.vue'),
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
