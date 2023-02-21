export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavGroup',
    name: 'Empleados',
    to: '/buttons',
    icon: 'cilPeople',
    items: [
      {
        component: 'CNavItem',
        name: 'Reporte',
        to: '/employees',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Sucursales',
    to: '/buttons',
    icon: 'cilPeople',
    items: [
      {
        component: 'CNavItem',
        name: 'Reporte',
        to: '/subsidiaries',
      },
    ],
  },
]
