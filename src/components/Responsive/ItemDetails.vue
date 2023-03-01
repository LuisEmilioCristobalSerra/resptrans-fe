<template>
  <el-table v-loading="table.isLoading" :data="table.data" class="w-100 mb-3">
    <el-table-column label="Numero de serie">
      <template #default="{ row }">
        <input class="form-control" v-model="row.serial" type="text" />
      </template>
    </el-table-column>
    <el-table-column label="Código de barras">
      <template #default="{ row }">
        <input class="form-control" v-model="row.code" type="text" />
      </template>
    </el-table-column>
    <el-table-column label="OC">
      <template #default="{ row }">
        <input class="form-control" v-model="row.oc" type="text" />
      </template>
    </el-table-column>
    <el-table-column width="100" label="Acciones">
      <template #default="{ row }">
        <span @click="removeItem(row.id)" class="btn btn-outline-danger"
          ><i class="fa-solid fa-trash"></i
        ></span>
      </template>
    </el-table-column>
  </el-table>
  <div class="w-100 text-end">
    <button
      @click="emitSuccess"
      :disabled="!table.data"
      class="btn btn-success"
    >
      Guardar
    </button>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted } from 'vue'

const props = defineProps({
  quantity: Number,
})

const emit = defineEmits(['success'])

const table = ref({
  data: [],
  isLoading: false,
})
const responsiveDetails = ref({
  employee_id: null,
  employee_subsidiary_id: null,
  subsidiary_id: null,
  items: [],
})
const selects = ref({
  employeeSelect: {
    options: [],
    isLoading: false,
  },
  subsidiaries: {
    options: [],
    isLoading: false,
  },
  items: {
    options: [],
    isLoading: false,
  },
})

onMounted(() => {
  for (let index = 0; index < props.quantity; index++) {
    table.value.data.push({
      id: index,
      serial: '',
      oc: '',
      code: '',
    })
  }
})

const removeItem = (itemId) => {
  table.value.data = table.value.data.filter((item) => item.id !== itemId)
}

const resetFields = () => {
  table.value = {
    data: null,
    isLoading: false,
  }
  responsiveDetails.value = {
    employee_id: null,
    employee_subsidiary_id: null,
    subsidiary_id: null,
    items: [],
  }
  selects.value = {
    employeeSelect: {
      options: [],
      isLoading: false,
    },
    subsidiaries: {
      options: [],
      isLoading: false,
    },
    items: {
      options: [],
      isLoading: false,
    },
  }
}

const emitSuccess = () => {
  emit('success', table.value.data)
}
</script>
