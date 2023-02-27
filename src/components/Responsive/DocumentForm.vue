<style scoped>
.m-auto {
  margin: auto;
}
</style>
<template>
  <el-form
    v-loading="isLoading"
    @submit.prevent="modelChanged"
    class="w-300px"
    ref="formRef"
    :rules="rules"
    :model="formData"
  >
    <div class="modal-body py-10 px-lg-17">
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Sucursal</label>
        <el-select
          v-model="formData.subsidiary_id"
          placeholder="Seleccione la sucursal"
          filterable
          :filter-method="filterSubsidiaries"
        >
          <el-option
            v-for="item in selectSubsidiaries.options"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2"
          >Articulo o producto</label
        >
        <el-form-item prop="street">
          <el-input v-model="formData.street" type="text" />
        </el-form-item>
      </div>
    </div>
    <div class="modal-footer flex-center">
      <button @click="$emit('cancel')" type="button" class="btn btn-light me-3">
        Cancelar
      </button>
      <button class="btn btn-outline-success">Guardar</button>
    </div>
  </el-form>
</template>

<script setup>
import Employee from '@/repositories/Employee'
import Subsidiary from '@/repositories/Subsidiary'
import { ref, watch, defineProps, onMounted } from 'vue'

const props = defineProps({
  data: Object,
  storeMode: Boolean,
  isLoading: Boolean,
})

const emit = defineEmits(['onUpdate', 'onCreate', 'cancel'])
const formRef = ref(null)
const formData = ref({})
const rules = ref({
  name: [
    {
      required: true,
      message: 'El nombre es requerido.',
      trigger: '-',
    },
  ],
  street: [
    {
      required: true,
      message: 'La calle es requerida.',
      trigger: '-',
    },
  ],
  interior: [
    {
      required: true,
      message: 'El numero interior es requerido.',
      trigger: '-',
    },
  ],
  exterior: [
    {
      required: true,
      message: 'El numero exterior es requerido.',
      trigger: '-',
    },
  ],
  district: [
    {
      required: true,
      message: 'La ciudad es requerida.',
      trigger: '-',
    },
  ],
  postal_code: [
    {
      required: true,
      message: 'El código postal es requerido.',
      trigger: '-',
    },
  ],
})
const disabled = ref(false)
const isLoading = ref(false)
const selectSubsidiaries = ref({
  options: [],
  isLoading: false,
})

onMounted(async () => {
  isLoading.value = true
  formData.value = JSON.parse(JSON.stringify(props.data))
  isLoading.value = false
})

watch(
  () => props.storeMode,
  (newData) => {
    formData.value = {}
  },
)

const modelChanged = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const emitType = props.storeMode ? 'onCreate' : 'onUpdate'
      emit(emitType, formData.value)
    }
  })
}

const filterItems = async (search) => {
  employees.value = await searchEmployees({ search })
}

const searchEmployees = async () => {
  const {
    data: { data },
  } = Employee.all({ search })
  return data
}

const filterSubsidiaries = async (search) => {
  console.log(search)
  selectSubsidiaries.value.options = await searchSubsidiaries({ search })
}

const searchSubsidiaries = async (params) => {
  const {
    data: { data },
  } = await Subsidiary.all(params)
  return data
}
</script>
