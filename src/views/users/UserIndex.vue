<template>
  <div class="card border-left-primary shadow">
    <div class="card-body">
      <div class="card-title">Usuarios</div>
      <el-table
        v-loading="isLoadingTable"
        :data="displayedData"
        style="width: 100%"
      >
        <el-table-column label="Nombre" prop="name" />
        <el-table-column label="Correo electrónico" prop="email" />
        <el-table-column label="Creado el" prop="created_at" />
        <el-table-column align="right">
          <template #header>
            <div class="d-flex">
              <input
                @change="filterData"
                type="text"
                class="form-control me-1"
                placeholder="Buscar"
              />
              <span
                v-if="can('users.create')"
                @click="openCreateForm"
                class="btn btn-outline-primary"
                ><i class="fa-solid fa-plus pe-0"></i
              ></span>
            </div>
          </template>
          <template #default="{ row }">
            <el-dropdown trigger="click">
              <el-button
                class="btn-light btn-active-light-primary"
                type="default"
              >
                Acciones <i class="fa-solid fa-arrow-down ms-2"></i
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-if="can('users.update')"
                    @click="openInformation(row.id)"
                    >Actualizar</el-dropdown-item
                  >
                  <el-dropdown-item
                    v-if="can('users.delete')"
                    @click="deleteModel(row.id)"
                    >Eliminar</el-dropdown-item
                  >
                  <el-dropdown-item
                    v-if="can('users.permissions')"
                    @click="openPermissionModal(row)"
                    >Asignar permisos</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog
    v-model="permissionModalIsVisible"
    destroy-on-close
    title="Información del empleado"
    width="30%"
  >
    <permission-select-list :user-id="userSelected.id"></permission-select-list>
  </el-dialog>
  <el-dialog
    v-model="modalIsVisible"
    destroy-on-close
    title="Información del empleado"
    width="30%"
  >
    <information-form
      :data="model"
      :store-mode="modalIsForStore"
      :is-loading="formIsLoading"
      @on-update="updateModel"
      @on-create="createModel"
      @cancel="modalIsVisible = false"
    ></information-form>
  </el-dialog>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import BackendService from '@/services/BackendService'
import Repository from '@/repositories/User'
import InformationForm from '@/components/Users/InformationForm.vue'
import { ElNotification } from 'element-plus'
import PermissionSelectList from '@/components/Users/PermissionSelectList.vue'
import { can } from '@/services/AuthService'

const model = ref({})
const isLoadingTable = ref(false)
const modalIsVisible = ref(false)
const modalIsForStore = ref(false)
const formIsLoading = ref(true)
const filterParams = ref('')
const table = ref({
  data: null,
})
const permissionModalIsVisible = ref(false)
const userSelected = ref({})

onMounted(async () => {
  await renderTable()
})

const renderTable = async (options) => {
  isLoadingTable.value = true
  const { data } = await getAll(options)
  table.value.data = data
  isLoadingTable.value = false
}

const getAll = async (options) => {
  const { data } = await Repository.all(options)
  return data
}

const openCreateForm = () => {
  model.value = {}
  modalIsForStore.value = true
  modalIsVisible.value = true
  formIsLoading.value = false
}

const createModel = async (props) => {
  try {
    formIsLoading.value = true
    const {
      data: { data },
    } = await Repository.create(props)
    modalIsVisible.value = false
    renderTable()
    success('Registrado correctamente')
  } catch (error) {
    showError()
  } finally {
    formIsLoading.value = false
  }
}

const openInformation = async (rowId) => {
  isLoadingTable.value = true
  modalIsForStore.value = false
  formIsLoading.value = true
  const response = await getInformation(rowId)
  model.value = response
  formIsLoading.value = false
  modalIsVisible.value = true
  isLoadingTable.value = false
}

const getInformation = async (id) => {
  const {
    data: { data },
  } = await Repository.find(id)
  return data
}

const updateModel = async (row) => {
  try {
    formIsLoading.value = true
    await Repository.update(row.id, row)
    modalIsVisible.value = false
    await renderTable()
    success('Actualizado correctamente')
  } catch (error) {
    showError()
  } finally {
    formIsLoading.value = false
  }
}

const deleteModel = async (id) => {
  try {
    formIsLoading.value = true
    await Repository.deleteModel(id)
    success('Eliminado correctamente')
    modalIsVisible.value = false
    await renderTable()
  } catch ({
    response: {
      data: { message },
    },
  }) {
    await Swal.fire('Ha ocurrido un error', message, 'error')
  } finally {
    formIsLoading.value = false
  }
}

const success = (message) => {
  ElNotification({
    title: message,
    type: 'success',
  })
}

const showError = () => {
  ElNotification({
    title: 'Ha ocurrido un error',
    type: 'error',
  })
}

const filterData = ({ target: { value } }) => {
  filterParams.value = value
}

const displayedData = computed(() => {
  if (filterParams.value === '') return table.value.data
  return table.value.data.filter(({ name }) =>
    name.toLowerCase().includes(filterParams.value.toLowerCase()),
  )
})

const openPermissionModal = (user) => {
  userSelected.value = user
  permissionModalIsVisible.value = true
}
</script>
