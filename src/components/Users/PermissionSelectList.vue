<style scoped>
:deep(.el-input) {
  height: 100% !important;
}
:deep(.select-trigger) {
  height: 100% !important;
}
</style>
<template>
  <div class="card">
    <div class="card-body">
      <div class="mb-3 row">
        <el-select
          v-model="permissionIds"
          class="col-11"
          multiple
          placeholder="Seleccione los permisos para asignarle al usuario"
          filterable
          :filter-method="filter"
        >
          <el-option
            v-for="item in select.options"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
        <span @click="saveItems(permissionIds)" class="btn btn-outline-success col-1"
          ><i class="fa-solid fa-floppy-disk"></i
        ></span>
      </div>
      <el-table
        v-loading="isLoadingTable"
        :data="table.data"
        style="width: 100%"
      >
        <el-table-column label="Permiso" prop="name" />
        <el-table-column align="right">
          <template #default="{ row }">
            <span @click="removeItem(row.id)" class="btn btn-outline-danger"
              ><i class="fa-solid fa-trash"></i
            ></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, defineProps } from 'vue'
import Subsidiary from '@/repositories/Subsidiary'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import Item from '@/repositories/Item'
import Permission from '@/repositories/Permission'
import User from '@/repositories/User'

const props = defineProps({
  userId: { type: Number, required: true },
})

const permissionIds = ref([])
const select = ref({
  isLoading: false,
  options: [],
})
const isLoadingTable = ref(false)
const table = ref({
  data: null,
})
const route = useRoute()
const subsidiaryId = route.params.id

onMounted(async () => {
  await renderTable()
})

const renderTable = async (options) => {
  isLoadingTable.value = true
  const permissions = await getUserPermissions(props.userId, options)
  table.value.data = permissions
  isLoadingTable.value = false
}

const getUserPermissions = async (userId, options) => {
  const {
    data: { data },
  } = await User.permissions(userId, options)
  return data
}

const getAll = async (options) => {
  const {
    data: { data },
  } = await Permission.all(options)
  return data
}

const filter = async (search) => {
  if (search && search.length >= 3) {
    select.value.isLoading = true
    select.value.options = await getAll({
      search,
    })
  }
}

const searchItems = async (params) => {
  const {
    data: { data },
  } = await Item.all(params)
  return data
}

const saveItems = async (permissionIds) => {
  try {
    await User.assignPermissions(props.userId, {
      permission_ids: permissionIds,
    })
    renderTable()
    success('Permisos asignados correctamente')
  } catch (error) {
    console.log('error')
  }
}

const success = (message) => {
  ElNotification({
    title: message,
    type: 'success',
  })
}

const removeItem = async (itemId) => {
  await Subsidiary.removeItem(subsidiaryId, itemId)
  renderTable()
  success('Articulo eliminado correctamente')
}
</script>
