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
        <label class="required fs-6 fw-semobold mb-2">Nombre</label>
        <el-form-item prop="name">
          <speech-recognition-input v-model="formData.name" type="text" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Correo electrónico</label>
        <el-form-item prop="email">
          <speech-recognition-input
            :disabled="!props.storeMode"
            v-model="formData.email"
            type="text"
          />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Contraseña</label>
        <el-form-item prop="password">
          <el-input v-model="formData.password" type="password" />
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Puesto de trabajo</label>
        <el-form-item prop="name">
          <speech-recognition-input v-model="formData.job_title" type="text" />
        </el-form-item>
      </div>
      <div v-if="props.storeMode" class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Rol</label>
        <el-form-item prop="rol_id">
          <el-select
            v-model="formData.rol_id"
            class="w-100"
            placeholder="Seleccione el rol del usuario"
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
import SpeechRecognitionInput from '@/components/SpeechRecognitionInput.vue'
import { ref, defineProps, onMounted } from 'vue'
import Permission from '@/repositories/Permission'

const props = defineProps({
  data: Object,
  storeMode: Boolean,
  isLoading: Boolean,
})

const select = ref({
  isLoading: false,
  options: [],
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
  email: [
    {
      required: true,
      message: 'El correo electrónico es requerido.',
      trigger: '-',
    },
  ],
  password: [
    {
      required: true,
      message: 'La contraseña es requerida.',
      trigger: '-',
    },
  ],
  job_title: [
    {
      required: true,
      message: 'El puesto de trabajo es requerido.',
      trigger: '-',
    },
  ],
  rol_id: [
    {
      required: false,
      message: 'El rol del usuario es requerido.',
      trigger: '-',
    },
  ],
})
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  formData.value = JSON.parse(JSON.stringify(props.data))
  isLoading.value = false
})

const modelChanged = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const emitType = props.storeMode ? 'onCreate' : 'onUpdate'
      emit(emitType, formData.value)
    }
  })
}

const filter = async (search) => {
  if (search && search.length >= 3) {
    select.value.isLoading = true
    select.value.options = await getAll({
      search,
    })
  }
}

const getAll = async (options) => {
  const {
    data: { data },
  } = await Permission.roles(options)
  return data
}
</script>
