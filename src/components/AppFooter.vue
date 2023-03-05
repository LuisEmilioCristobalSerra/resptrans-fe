<template>
  <CFooter>
    <div>
      <span class="fw-bold">RESPTRANS</span>
      <span class="ms-1"
        >&copy; {{ new Date().getFullYear() }} Prefabricados de Palenque.</span
      >
    </div>
    <div class="ms-auto">
      <span class="me-1" target="_blank">Desarrollado con</span>
      <a class="me-2" href="https://laravel.com">Laravel 10</a>
      <span class="me-2"> & </span>
      <a href="https://vuejs.org">Vue 3</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>
