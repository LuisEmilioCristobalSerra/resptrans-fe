<style scoped>
.m-auto {
  margin: auto;
}
:deep(.el-select) {
  width: 100%;
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
        <label class="required fs-6 fw-semobold mb-2">Aplica en</label>
        <el-form-item prop="applied_in">
          <el-input v-model="formData.applied_in" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Acción</label>
        <el-form-item prop="action">
          <el-input v-model="formData.action" type="text" />
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
import Subsidiary from '@/repositories/Subsidiary'
import {
  defineComponent,
  ref,
  watch,
  defineProps,
  onMounted,
  computed,
} from 'vue'

const props = defineProps({
  data: Object,
  storeMode: Boolean,
  isLoading: Boolean,
})

const emit = defineEmits(['onUpdate', 'onCreate', 'cancel'])
const formRef = ref(null)
const formData = ref({})
const rules = ref({
  applied_in: [
    {
      required: true,
      message: 'El campo es requerido.',
      trigger: '-',
    },
  ],
  action: [
    {
      required: true,
      message: 'El nombre de la acción es requerida.',
      trigger: '-',
    },
  ],
})
const disabled = ref(false)
const isLoading = ref(false)
const subsidiaries = ref([])

onMounted(async () => {
  isLoading.value = true
  formData.value = JSON.parse(JSON.stringify(props.data))
  isLoading.value = false
})

const modelChanged = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      formData.value.name = `${formData.value.applied_in}.${formData.value.action}`
      const emitType = props.storeMode ? 'onCreate' : 'onUpdate'
      emit(emitType, formData.value)
    }
  })
}
</script>
