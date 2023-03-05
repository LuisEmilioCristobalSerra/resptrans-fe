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
        <label class="required fs-6 fw-semobold mb-2">Nombre</label>
        <el-form-item prop="name">
          <speech-recognition-input v-model="formData.name" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Calle</label>
        <el-form-item prop="street">
          <speech-recognition-input v-model="formData.street" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Numero interior</label>
        <el-form-item prop="interior">
          <speech-recognition-input v-model="formData.interior" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Numero exterior</label>
        <el-form-item prop="exterior">
          <speech-recognition-input v-model="formData.exterior" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Ciudad</label>
        <el-form-item prop="district">
          <speech-recognition-input v-model="formData.district" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Código postal</label>
        <el-form-item prop="postal_code">
          <speech-recognition-input v-model="formData.postal_code" type="text" />
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
import SpeechRecognitionInput from '@/components/SpeechRecognitionInput.vue'

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
