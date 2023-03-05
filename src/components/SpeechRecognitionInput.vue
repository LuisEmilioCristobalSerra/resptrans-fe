<template>
  <div class="d-flex w-100">
    <input
      class="form form-control me-1"
      v-model="speechText"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <button class="btn btn-primary" @click.prevent="startSpeechRecognition">
      <i class="fa-solid fa-microphone"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const speechText = ref('')
const emit = defineEmits(['update:modelValue', 'finished'])

const startSpeechRecognition = () => {
  const recognition = new webkitSpeechRecognition()
  recognition.lang = 'es'
  recognition.onresult = (event) => {
    speechText.value = event.results[0][0].transcript
    emit('update:modelValue', speechText.value.replace('.', ''))
    emit('finished', speechText.value)
  }
  recognition.start()
}
</script>
