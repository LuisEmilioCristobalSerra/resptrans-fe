<template>
  <vue3-html2pdf
    v-if="pdfParams"
    :show-layout="false"
    :float-layout="true"
    :enable-download="true"
    :preview-modal="true"
    :paginate-elements-by-height="1400"
    :pdf-quality="2"
    :manual-pagination="false"
    :filename="`responsiva-${employeeSelected?.name}`"
    pdf-format="letter"
    pdf-orientation="portrait"
    pdf-content-width="100%"
    ref="html2Pdf"
  >
    <template v-slot:pdf-content>
      <document-component
        :user="pdfParams.user"
        :employee="pdfParams.employee"
        :subsidiary="pdfParams.subsidiary"
        :items="pdfParams.items"
      ></document-component>
    </template>
  </vue3-html2pdf>
  <div class="card mb-2 border-left-primary shadow">
    <div class="card-body">
      <div class="w-100 card-title">Información del empleado</div>
      <div class="row">
        <el-select
          v-model="responsiveDetails.employee_id"
          class="col"
          placeholder="Seleccione el empleado"
          size="large"
          filterable
          remote
          :loading="selects.employeeSelect.isLoading"
          :remote-method="filterEmployees"
        >
          <el-option
            v-for="item in selects.employeeSelect.options"
            :key="item.id"
            :label="`${item.name} ${item.paternal_surname} ${item.maternal_surname}`"
            :value="item.id"
            @click="employeeSelected = item"
          />
        </el-select>
        <el-select
          v-model="responsiveDetails.subsidiary_id"
          class="col"
          placeholder="Seleccione la sucursal del empleado"
          size="large"
          filterable
          remote
          :disabled="!responsiveDetails.employee_id"
          :loading="selects.subsidiaries.isLoading"
          :remote-method="filterSubsidiaries"
        >
          <el-option
            v-for="item in selects.subsidiaries.options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click="setSubsidiaryForEmployee(item)"
          />
        </el-select>
      </div>
    </div>
  </div>
  <div class="card border-left-success shadow">
    <div class="card-body">
      <div class="w-100 card-title">Productos</div>
      <div class="row mb-4">
        <el-select
          v-loading="selects.items.isLoading"
          v-model="responsiveDetails.items"
          size="large"
          class="col-12 mt-2"
          multiple
          placeholder="Seleccione los artículos a registrar"
          filterable
          :loading="selects.items.isLoading"
          :disabled="!responsiveDetails.employee_subsidiary_id"
          @change="setItemOnResponsive"
        >
          <el-option
            v-for="item in selects.items.options"
            :key="item.id"
            :value="item.id"
            :label="item.item.name"
          />
        </el-select>
      </div>
      <el-table
        v-loading="table.isLoading"
        :data="table.data"
        class="w-100 mb-3"
      >
        <el-table-column label="Cantidad" prop="item.quantity">
          <template #default="{ row }">
            <input
              class="form-control-plaintext"
              v-model="row.quantity"
              type="number"
            />
          </template>
        </el-table-column>
        <el-table-column label="Producto" prop="item.name" />
        <el-table-column label="Código" prop="item.code" />
        <el-table-column label="# Serie" prop="item.serial" />
        <el-table-column label="OC" prop="item.oc" />
        <el-table-column label="Registrado el" prop="created_at" />
        <el-table-column align="right">
          <template #default="{ row }">
            <span @click="removeItem(row.id)" class="btn btn-outline-danger"
              ><i class="fa-solid fa-trash"></i
            ></span>
          </template>
        </el-table-column>
      </el-table>
      <div class="w-100 text-end">
        <button
          @click="createResponsive"
          :disabled="!table.data"
          class="btn btn-success"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import Employee from '@/repositories/Employee'
import Subsidiary from '@/repositories/Subsidiary'
import { Edit, Picture, Upload } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'
import Vue3Html2pdf from 'vue3-html2pdf'
import DocumentComponent from '@/components/Docs/DocumentComponent.vue'

const html2Pdf = ref(null)
const table = ref({
  data: null,
  isLoading: false,
})
const responsiveDetails = ref({
  employee_id: null,
  employee_subsidiary_id: null,
  subsidiary_id: null,
  items: [],
})
const selects = ref({
  employeeSelect: {
    options: [],
    isLoading: false,
  },
  subsidiaries: {
    options: [],
    isLoading: false,
  },
  items: {
    options: [],
    isLoading: false,
  },
})
const employeeSelected = ref({})
const subsidiarySelected = ref({})
const pdfParams = ref({})

const filterEmployees = async (search) => {
  selects.value.employeeSelect.isLoading = true
  selects.value.employeeSelect.options = await searchEmployees({ search })
  selects.value.employeeSelect.isLoading = false
}

const searchEmployees = async (params) => {
  const {
    data: { data },
  } = await Employee.all(params)
  return data
}

const filterSubsidiaries = async (search) => {
  selects.value.subsidiaries.isLoading = true
  selects.value.subsidiaries.options = await searchSubsidiaries({ search })
  selects.value.subsidiaries.isLoading = false
}

const searchSubsidiaries = async (params) => {
  const {
    value: { employee_id },
  } = responsiveDetails
  const {
    data: { data },
  } = await Employee.subsidiaries(employee_id, params)
  return data
}

const filterItems = async (search) => {
  selects.value.items.isLoading = true
  selects.value.items.options = await searchItems({ search })
  selects.value.items.isLoading = false
}

const searchItems = async (params) => {
  const {
    value: { subsidiary_id },
  } = responsiveDetails
  const {
    data: { data },
  } = await Subsidiary.inventory(subsidiary_id, params)
  return data
}

const setSubsidiaryForEmployee = async (subsidiaryDetails) => {
  responsiveDetails.value.employee_subsidiary_id = subsidiaryDetails.pivot.id
  subsidiarySelected.value = subsidiaryDetails
  await filterItems()
}

const setItemOnResponsive = (itemIds) => {
  table.value.isLoading = true
  const tableRows = []
  const {
    value: {
      items: { options },
    },
  } = selects
  itemIds.forEach((id) => {
    const item = options.find((option) => option.id === id)
    tableRows.push({
      ...item,
      quantity: table.value.data?.find((item) => item.id === id)?.quantity || 1,
    })
  })
  table.value.data = tableRows
  table.value.isLoading = false
}

const searchItem = (itemId) => {
  return selects.value.items.options.find((item) => item.id === itemId)
}

const removeItem = (itemId) => {
  table.value.data = table.value.data.filter((item) => item.id !== itemId)
  responsiveDetails.value.items = responsiveDetails.value.items.filter(
    (id) => id !== itemId,
  )
}

const createResponsive = async () => {
  const {
    value: { data },
  } = table
  const params = {
    employee_id: responsiveDetails.value.employee_id,
    subsidiary_id: responsiveDetails.value.subsidiary_id,
    details: data.map((item) => {
      return {
        quantity: item.quantity,
        inventory_item_id: item.id,
      }
    }),
  }
  await Employee.createResponsive(responsiveDetails.value.employee_id, params)
  generatePdf()
  success('Responsiva generada correctamente')
}

const success = (message) => {
  ElNotification({
    title: message,
    type: 'success',
  })
}

const generatePdf = () => {
  pdfParams.value = {
    user: {
      name: 'Juan Guillen Martinez',
    },
    employee: employeeSelected.value,
    subsidiary: subsidiarySelected.value,
    items: table.value.data.map((row) => {
      return {
        ...row.item,
        quantity: row.quantity,
      }
    }),
  }
  html2Pdf.value.generatePdf()
  resetFields()
}

const resetFields = () => {
  table.value = {
    data: null,
    isLoading: false,
  }
  responsiveDetails.value = {
    employee_id: null,
    employee_subsidiary_id: null,
    subsidiary_id: null,
    items: [],
  }
  selects.value = {
    employeeSelect: {
      options: [],
      isLoading: false,
    },
    subsidiaries: {
      options: [],
      isLoading: false,
    },
    items: {
      options: [],
      isLoading: false,
    },
  }
}
</script>
