export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavGroup',
    name: 'Empleados',
    icon: 'fa-people-line',
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
    icon: 'fa-building',
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
    icon: 'fa-desktop',
    items: [
      {
        component: 'CNavItem',
        name: 'Reporte',
        to: '/items',
      },
    ],
  },
]
