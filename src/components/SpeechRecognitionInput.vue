<template>
  <div class="d-flex w-100">
    <input
      class="form form-control me-1"
      v-model="speechText"
      :disabled="props.disabled"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <button
      class="btn btn-primary"
      :disabled="props.disabled"
      @click.prevent="startSpeechRecognition"
    >
      <i class="fa-solid fa-microphone"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const speechText = ref(props.modelValue)
const emit = defineEmits(['update:modelValue', 'finished'])

const startSpeechRecognition = () => {
  const recognition = new webkitSpeechRecognition()
  recognition.lang = 'es'
  recognition.onresult = (event) => {
    const results = event.results[0][0].transcript
    speechText.value = results.replaceAll('.', '').toLowerCase()
    emit('update:modelValue', speechText.value)
    emit('finished', speechText.value)
  }
  recognition.start()
}

watch(
  () => props.modelValue,
  (newValue) => {
    speechText.value = newValue
  },
)
</script>
