<template>
  <div class="card border-left-primary shadow mb-5">
    <div class="card-body">
      <div class="w-100 card-title">Transferencias</div>
      <el-table
        v-loading="isLoadingTable"
        :data="displayedData"
        style="width: 100%"
      >
        <el-table-column label="Folio" prop="id" />
        <el-table-column label="Generado por" prop="generated_by.name" />
        <el-table-column label="Artículos">
          <template #default="{ row }">
            <el-tag v-for="item in row.details" :key="item.id">{{
              item.name
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Sucursal origen" prop="origin.name" />
        <el-table-column label="Sucursal destino" prop="target.name" />
        <el-table-column label="Fecha de creación">
          <template #default="{ row }">
            {{ dayjs(row.created_at).format('DD/MM/YYYY h:mm A') }}
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #header>
            <span
              v-if="can('responsives.create')"
              @click="goToNewRoute"
              class="btn btn-outline-primary w-100"
              ><i class="fa-solid fa-plus pe-0 me-2"></i
              ><span>Nueva</span></span
            >
          </template>
          <template #default="{ row }">
            <el-dropdown trigger="click">
              <el-button
                class="btn-light btn-active-light-primary"
                type="default"
              >
                Acciones <i class="fa-solid fa-arrow-down ms-2"></i
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="generatePdf(row)"
                    >Generar PDF</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <vue3-html2pdf
    :show-layout="false"
    :float-layout="true"
    :enable-download="true"
    :preview-modal="true"
    :paginate-elements-by-height="1400"
    :pdf-quality="2"
    :manual-pagination="false"
    :filename="'responsiva-traslado'"
    pdf-format="letter"
    pdf-orientation="portrait"
    pdf-content-width="100%"
    ref="html2Pdf"
  >
    <template v-slot:pdf-content>
      <document-component
        v-if="pdfParams"
        :user="pdfParams.user"
        :origin="pdfParams.origin"
        :target="pdfParams.target"
        :items="pdfParams.items"
      ></document-component>
    </template>
  </vue3-html2pdf>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import Repository from '@/repositories/ResponsiveDocument'
import { ElNotification, dayjs } from 'element-plus'
import { useRouter } from 'vue-router'
import Vue3Html2pdf from 'vue3-html2pdf'
import DocumentComponent from '@/components/Docs/TransferDocument.vue'
import 'dayjs/locale/en'
import Transfer from '@/repositories/Transfer'
import { can } from '@/services/AuthService'

const isLoadingTable = ref(false)
const filterParams = ref('')
const table = ref({
  data: null,
})
const router = useRouter()
const html2Pdf = ref(null)
const pdfParams = ref(null)
const pdfName = ref('responsiva')

onMounted(async () => {
  await renderTable()
})

const renderTable = async (options) => {
  isLoadingTable.value = true
  const { data } = await getAll(options)
  table.value.data = data
  isLoadingTable.value = false
}

const getAll = async (options) => {
  const { data } = await Transfer.all(options)
  return data
}

const success = (message) => {
  ElNotification({
    title: message,
    type: 'success',
  })
}

const displayedData = computed(() => {
  if (filterParams.value === '') return table.value.data
  return table.value.data.filter(({ name }) =>
    name.toLowerCase().includes(filterParams.value.toLowerCase()),
  )
})

const goToNewRoute = () => {
  router.push('/transfers/new')
}

const generatePdf = (responsiveDetails) => {
  const {
    generated_by: user,
    origin,
    target,
    details: items,
  } = responsiveDetails
  pdfParams.value = {
    user,
    origin,
    target,
    items,
  }
  html2Pdf.value.generatePdf()
}
</script>
