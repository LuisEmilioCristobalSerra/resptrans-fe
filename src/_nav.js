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
    icon: 'cilPeople',
    items: [
      {
        component: 'CNavItem',
        name: 'Reporte',
        to: '/subsidiaries',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Artículos',
    icon: 'cilPeople',
    items: [
      {
        component: 'CNavItem',
        name: 'Reporte',
        to: '/items',
      },
    ],
  },
]
