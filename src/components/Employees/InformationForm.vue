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
          <el-input v-model="formData.name" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Apellido paterno</label>
        <el-form-item prop="paternal_surname">
          <el-input v-model="formData.paternal_surname" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Apellido materno</label>
        <el-form-item prop="maternal_surname">
          <el-input v-model="formData.maternal_surname" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Correo electrónico</label>
        <el-form-item prop="email">
          <el-input v-model="formData.email" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Teléfono</label>
        <el-form-item prop="phone">
          <el-input v-model="formData.phone" type="text" />
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
  name: [
    {
      required: true,
      message: 'El nombre es requerido.',
      trigger: '-',
    },
  ],
  paternal_surname: [
    {
      required: true,
      message: 'El apellido paterno es requerido.',
      trigger: '-',
    },
  ],
  maternal_surname: [
    {
      required: true,
      message: 'El apellido materno es requerido.',
      trigger: '-',
    },
  ],
  email: [
    {
      required: true,
      message: 'El correo es requerido.',
      trigger: '-',
    },
  ],
  phone: [
    {
      required: true,
      message: 'El teléfono es requerido.',
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
