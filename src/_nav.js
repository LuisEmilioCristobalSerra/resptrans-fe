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
  {
    component: 'CNavGroup',
    name: 'Responsivas',
    icon: 'fa-file-invoice',
    permission: 'responsives.index',
    items: [
      {
        component: 'CNavItem',
        name: 'Reporte',
        to: '/responsives',
        permission: 'responsives.index',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Traslados',
    icon: 'fa-right-left',
    permission: 'transfers.index',
    items: [
      {
        component: 'CNavItem',
        name: 'Reporte',
        to: '/transfers',
        permission: 'transfers.index',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Usuarios',
    icon: 'fa-users',
    permission: 'users.show',
    items: [
      {
        component: 'CNavItem',
        name: 'Reporte',
        to: '/users',
        permission: 'users.show',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Permisos',
    icon: 'fa-check-double',
    permission: 'users.permissions',
    items: [
      {
        component: 'CNavItem',
        name: 'Reporte',
        to: '/permissions',
        permission: 'users.permissions',
      },
    ],
  },
]
