import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

import DefaultLayout from '@/layouts/DefaultLayout'
import TokenService from '@/services/TokenService'
import Auth from '@/repositories/Auth'

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
            name: 'Sucursales',
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
        path: '/responsives',
        name: 'Responsivas',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            path: '',
            name: 'Responsivas',
            component: () => import('@/views/responsives/ResponsiveIndex.vue'),
          },
          {
            path: 'new',
            name: 'Nueva responsiva',
            component: () => import('@/views/responsives/NewResponsive.vue'),
          },
        ],
      },
      {
        path: '/transfers',
        name: 'Transferencias',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            path: '',
            name: 'Transferencias',
            component: () => import('@/views/transfers/TransferIndex.vue'),
          },
          {
            path: 'new',
            name: 'Nueva transferencia',
            component: () => import('@/views/transfers/NewTransfer.vue'),
          },
        ],
      },
      {
        path: '/items',
        name: 'Artículos',
        component: () => import('@/views/Item/ItemReport.vue'),
      },
      {
        path: '/users',
        name: 'Usuarios',
        component: () => import('@/views/users/UserIndex.vue'),
      },
      {
        path: '/permissions',
        name: 'Permisos',
        component: () => import('@/views/permissions/PermissionIndex.vue'),
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
        component: () => import('@/views/pages/Login.vue'),
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

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.state.token !== null
  if (TokenService.hasToken()) {
    store.dispatch('setToken', TokenService.getToken())
    if (!store.getters.getUser) {
      const { data: { data } } = await Auth.me()
      store.dispatch('setUser', data)
    }
    return next()
  }
  if (to.name !== 'Login' && !isAuthenticated) {
    return next({ name: 'Login' })
  }
  next()
})

export default router
