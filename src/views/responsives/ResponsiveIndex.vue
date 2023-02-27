<template>
  <div class="card">
    <div class="card-body">
      <el-table
        v-loading="isLoadingTable"
        :data="displayedData"
        style="width: 100%"
      >
        <el-table-column label="Nombre" prop="name" />
        <el-table-column label="Calle" prop="street" />
        <el-table-column label="# Interior" prop="interior" />
        <el-table-column label="# Exterior" prop="exterior" />
        <el-table-column label="Ciudad" prop="district" />
        <el-table-column label="Código postal" prop="postal_code" />
        <el-table-column align="right">
          <template #header>
            <div class="d-flex">
              <span @click="goToNewRoute" class="btn btn-outline-primary"
                ><i class="fa-solid fa-plus pe-0 me-2"></i><span>Nueva</span></span
              >
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
                  <el-dropdown-item @click="openInformation(row.id)"
                    >Editar</el-dropdown-item
                  >
                  <el-dropdown-item @click="goToItemsRoute(row.id)"
                    >Asignar artículos</el-dropdown-item
                  >
                  <el-dropdown-item @click="deleteModel(row.id)"
                    >Eliminar</el-dropdown-item
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
    v-model="modalIsVisible"
    destroy-on-close
    title="Información de la sucursal"
    width="30%"
  >
    <document-form
      :data="model"
      :store-mode="modalIsForStore"
      :is-loading="formIsLoading"
      @on-update="updateModel"
      @on-create="createModel"
      @cancel="modalIsVisible = false"
    ></document-form>
  </el-dialog>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import Repository from '@/repositories/ResponsiveDocument'
import DocumentForm from '@/components/Responsive/DocumentForm.vue'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

const model = ref({})
const isLoadingTable = ref(false)
const modalIsVisible = ref(false)
const modalIsForStore = ref(false)
const formIsLoading = ref(true)
const filterParams = ref('')
const table = ref({
  data: null,
})
const router = useRouter()

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
    await Repository.create(props)
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
    renderTable()
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
    renderTable()
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

const goToNewRoute = (subsidiaryId) => {
  router.push('/responsives/new')
}
</script>
