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
          v-model="itemIds"
          class="col-11"
          multiple
          placeholder="Seleccione los artículos a registrar"
          filterable
          :filter-method="filterItems"
        >
          <el-option
            v-for="item in select.options"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
        <span @click="saveItems(itemIds)" class="btn btn-outline-success col-1"
          ><i class="fa-solid fa-floppy-disk"></i
        ></span>
      </div>
      <el-table
        v-loading="isLoadingTable"
        :data="table.data"
        style="width: 100%"
      >
        <el-table-column label="Producto" prop="item.name" />
        <el-table-column label="Descripción" prop="item.description" />
        <el-table-column label="Registrado el" prop="created_at" />
        <el-table-column align="right">
          <template #default="{ row }">
            <span @click="removeItem(row.item.id)" class="btn btn-outline-danger"
              ><i class="fa-solid fa-trash"></i
            ></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import Subsidiary from '@/repositories/Subsidiary'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import Item from '@/repositories/Item'

const itemIds = ref([])
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
  const { data } = await getAll(options)
  table.value.data = data
  isLoadingTable.value = false
}

const getAll = async (options) => {
  const { data } = await Subsidiary.inventory(subsidiaryId, options)
  return data
}

const filterItems = async (search) => {
  if (search && search.length >= 3) {
    select.value.isLoading = true
    select.value.options = await searchItems({
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

const saveItems = async (itemIds) => {
  try {
    await Subsidiary.addItemsToInventory(route.params.id, { item_ids: itemIds })
    renderTable()
    success('Artículos registrados correctamente')
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
