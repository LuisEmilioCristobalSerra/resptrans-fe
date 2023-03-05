<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm class="needs-validation" @submit="login">
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">
                    Inicia sesión con tu cuenta
                  </p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="email"
                      placeholder="Correo electronico"
                      :valid="emailIsValid"
                      autocomplete="email"
                      required
                      type="email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="password"
                      type="password"
                      placeholder="Contraseña"
                      autocomplete="current-password"
                      required
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" type="submit" class="px-4">
                        Entrar
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2 class="mb-5">Registrar</h2>
                  <p>
                    Para acceder al sistemas es necesario contar con las
                    credenciales proporcionadas por su administrador. Consulte
                    mas información con la empresa o el desarrollador a cargo
                    del proyecto.
                  </p>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Auth from '@/repositories/Auth'
import router from '@/router'
import store from '@/store'

const email = ref('')
const password = ref('')
const emailIsValid = ref(false)

const login = async () => {
  try {
    const {
      data: {
        data: { token, user },
      },
    } = await Auth.login({
      email: email.value,
      password: password.value,
    })
    store.dispatch('setToken', token)
    store.dispatch('setUser', user)
    router.push({ name: 'Dashboard' })
  } catch (error) {
    console.log(error)
  }
}
</script>
