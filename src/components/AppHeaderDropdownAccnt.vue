<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle
      @click.prevent
      placement="bottom-end"
      class="py-0"
      :caret="false"
    >
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Bienvenido
      </CDropdownHeader>
      <CDropdownItem style="cursor: pointer">
        <span class="me-2"><i class="fa-solid fa-user"></i></span>
        {{ user.name }}
      </CDropdownItem>
      <CDropdownItem style="cursor: pointer">
        <span class="me-2"><i class="fa-solid fa-briefcase"></i></span>
        {{ user.job_title || 'Empleado' }}
      </CDropdownItem>
      <CDropdownItem style="cursor: pointer">
        <span class="me-2"><i class="fa-solid fa-at"></i></span>
        {{ user.email }}
      </CDropdownItem>
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Configuración de sesión
      </CDropdownHeader>
      <CDropdownItem style="cursor: pointer" @click="logout">
        <span class="me-2"
          ><i class="fa-solid fa-arrow-right-from-bracket"></i
        ></span>
        Cerrar sesión
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script setup>
import avatar from '@/assets/images/avatars/not-found.jpg'
import router from '@/router'
import store from '@/store'
import { ref } from 'vue'

const user = store.getters.getUser

const logout = () => {
  store.dispatch('removeToken')
  router.replace({ name: 'Login' })
}
</script>
