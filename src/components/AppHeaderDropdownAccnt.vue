<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle @click.prevent placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Configuración de sesión
      </CDropdownHeader>
      <CDropdownItem style="cursor: pointer" @click="logout">
        <CIcon icon="cil-lock-locked" /> Cerrar sesión
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script setup>
import avatar from '@/assets/images/avatars/not-found.jpg'
import router from '@/router'
import store from '@/store'
import { ref } from 'vue'

const logout = () => {
  store.dispatch('removeToken')
  router.replace({ name: 'Login' })
}
</script>
