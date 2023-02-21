<style scoped>
.m-auto {
  margin: auto;
}
:deep(.el-date-editor) {
  width: 100% !important;
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
        <label class="required fs-6 fw-semobold mb-2">Nombre</label>
        <el-form-item prop="name">
          <el-input v-model="formData.name" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Descripción</label>
        <el-form-item prop="description">
          <el-input v-model="formData.description" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Código de barras</label>
        <el-form-item prop="code">
          <el-input v-model="formData.code" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Numero de serie</label>
        <el-form-item prop="serial">
          <el-input v-model="formData.serial" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Numero de factura</label>
        <el-form-item prop="invoice">
          <el-input v-model="formData.invoice" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">OC</label>
        <el-form-item prop="oc">
          <el-input v-model="formData.oc" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Comprado el</label>
        <el-form-item prop="bought_at">
          <el-date-picker
            v-model="formData.bought_at"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="Seleccione la fecha de compra"
          />
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
</script>
