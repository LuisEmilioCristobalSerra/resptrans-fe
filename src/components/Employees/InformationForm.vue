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
          <speech-recognition-input
            v-model="formData.name"
          ></speech-recognition-input>
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Apellido paterno</label>
        <el-form-item prop="paternal_surname">
          <speech-recognition-input
            v-model="formData.paternal_surname"
          ></speech-recognition-input>
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Apellido materno</label>
        <el-form-item prop="maternal_surname">
          <speech-recognition-input
            v-model="formData.maternal_surname"
          ></speech-recognition-input>
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Correo electrónico</label>
        <el-form-item prop="email">
          <speech-recognition-input
            v-model="formData.email"
          ></speech-recognition-input>
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Teléfono</label>
        <el-form-item prop="phone">
          <speech-recognition-input
            v-model="formData.phone"
          ></speech-recognition-input>
        </el-form-item>
      </div>
      <div class="fv-row mb-7">
        <label class="required fs-6 fw-semobold mb-2">Sucursales</label>
        <el-form-item width="100%" prop="phone">
          <el-select
            v-model="formData.subsidiary_ids"
            multiple
            filterable
            placeholder="Seleccione las sucursales"
          >
            <el-option
              v-for="subsidiary in subsidiaries"
              :key="subsidiary.id"
              :value="subsidiary.id"
              :label="subsidiary.name"
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
import Subsidiary from '@/repositories/Subsidiary'
import SpeechRecognitionInput from '@/components/SpeechRecognitionInput.vue'
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
const subsidiaries = ref([])

onMounted(async () => {
  isLoading.value = true
  formData.value = JSON.parse(JSON.stringify(props.data))
  subsidiaries.value = await getSubsidiaries()
  isLoading.value = false
})

const getSubsidiaries = async () => {
  const {
    data: { data },
  } = await Subsidiary.all()
  return data
}

const modelChanged = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const emitType = props.storeMode ? 'onCreate' : 'onUpdate'
      emit(emitType, formData.value)
    }
  })
}
</script>
