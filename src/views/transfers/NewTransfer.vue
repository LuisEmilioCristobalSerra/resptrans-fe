<template>
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
  <div class="card mb-2 border-left-primary shadow">
    <div class="card-body">
      <div class="w-100 card-title">Información del empleado</div>
      <div class="row">
        <el-select
          v-model="transferDetails.origin_id"
          class="col"
          placeholder="Seleccione la sucursal de origen"
          size="large"
          filterable
          remote
          :loading="selects.subsidiariesOrigin.isLoading"
          :remote-method="filterOriginSubsidiaries"
          @change="
            filterItems($event);
            setOriginSubsidiary($event)
          "
        >
          <el-option
            v-for="item in selects.subsidiariesOrigin.options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select
          v-model="transferDetails.target_id"
          class="col"
          placeholder="Seleccione la sucursal de destino"
          size="large"
          filterable
          remote
          :loading="selects.subsidiariesTarget.isLoading"
          :remote-method="filterTargetSubsidiaries"
          @change="setTargetSubsidiary"
        >
          <el-option
            v-for="item in selects.subsidiariesTarget.options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
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
          v-model="transferDetails.items"
          size="large"
          class="col-12 mt-2"
          multiple
          placeholder="Seleccione los artículos a registrar"
          filterable
          :loading="selects.items.isLoading"
          :remote-method="filterItems"
          @change="setItem"
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
        <el-table-column label="Descripción" prop="item.description" />
        <el-table-column label="Registrado el" prop="created_at" />
        <el-table-column label="Acciones" align="right">
          <template #default="{ row }">
            <div class="d-flex gap-2 justify-content-end">
              <span @click="removeItem(row.id)" class="btn btn-outline-danger"
                ><i class="fa-solid fa-trash"></i
              ></span>
              <span
                @click="openDetailsForm(row)"
                class="btn btn-outline-success"
                >Artículos</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="w-100 text-end">
        <button
          @click="createTransfer"
          :disabled="!table.data"
          class="btn btn-success"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="modalItemsIsVisible"
    title="Información de responsiva"
    width="40%"
    destroy-on-close
    center
  >
    <item-details
      :quantity="itemSelected.quantity"
      @success="setItemDetails"
    ></item-details>
  </el-dialog>
</template>
<script setup>
import Transfer from '@/repositories/Transfer'
import Subsidiary from '@/repositories/Subsidiary'
import { onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'
import Vue3Html2pdf from 'vue3-html2pdf'
import DocumentComponent from '@/components/Docs/TransferDocument.vue'
import ItemDetails from '@/components/Transfer/ItemDetails.vue'

const html2Pdf = ref(null)
const table = ref({
  data: null,
  isLoading: false,
})
const transferDetails = ref({
  origin_id: null,
  target_id: null,
  items: [],
})
const selects = ref({
  subsidiariesOrigin: {
    options: [],
    isLoading: false,
  },
  subsidiariesTarget: {
    options: [],
    isLoading: false,
  },
  items: {
    options: [],
    isLoading: false,
  },
})
const origin = ref({})
const target = ref({})
const pdfParams = ref(null)
const modalItemsIsVisible = ref(false)
const itemSelected = ref({})

const filterOriginSubsidiaries = async (search) => {
  selects.value.subsidiariesOrigin.isLoading = true
  selects.value.subsidiariesOrigin.options = await searchSubsidiaries({
    search,
  })
  selects.value.subsidiariesOrigin.isLoading = false
}

const filterTargetSubsidiaries = async (search) => {
  selects.value.subsidiariesTarget.isLoading = true
  selects.value.subsidiariesTarget.options = await searchSubsidiaries({
    search,
  })
  selects.value.subsidiariesTarget.isLoading = false
}

const searchSubsidiaries = async (params) => {
  const {
    data: { data },
  } = await Subsidiary.all(params)
  return data
}

const filterItems = async (search) => {
  selects.value.items.isLoading = true
  selects.value.items.options = await searchItems({ search })
  selects.value.items.isLoading = false
}

const searchItems = async (params) => {
  const {
    value: { origin_id },
  } = transferDetails
  const {
    data: { data },
  } = await Subsidiary.inventory(origin_id, params)
  return data
}

const setItem = (itemIds) => {
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

const removeItem = (itemId) => {
  table.value.data = table.value.data.filter((item) => item.id !== itemId)
  transferDetails.value.items = transferDetails.value.items.filter(
    (id) => id !== itemId,
  )
}

const createTransfer = async () => {
  const {
    value: { data },
  } = table
  const params = {
    origin_id: transferDetails.value.origin_id,
    target_id: transferDetails.value.target_id,
    details: data.map((item) => {
      return {
        quantity: item.quantity,
        inventory_item_id: item.id,
        items: item.items,
      }
    }),
  }
  await Transfer.create(params)
  generatePdf()
  resetFields()
  success('Traslado generado correctamente')
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
    origin: origin.value,
    target: target.value,
    items: table.value.data.map((row) => {
      return {
        ...row.item,
        items: row.items,
        quantity: row.quantity,
      }
    }),
  }
  console.log({ pdf: pdfParams.value })
  html2Pdf.value.generatePdf()
}

const resetFields = () => {
  table.value = {
    data: null,
    isLoading: false,
  }
  transferDetails.value = {
    origin_id: null,
    target_id: null,
    items: [],
  }
  selects.value = {
    subsidiariesOrigin: {
      options: [],
      isLoading: false,
    },
    subsidiariesTarget: {
      options: [],
      isLoading: false,
    },
    items: {
      options: [],
      isLoading: false,
    },
  }
}

const openDetailsForm = (item) => {
  itemSelected.value = item
  modalItemsIsVisible.value = true
}

const setItemDetails = (details) => {
  itemSelected.value.items = details
  modalItemsIsVisible.value = false
}

const setOriginSubsidiary = (id) => {
  origin.value = selects.value.subsidiariesOrigin.options.find(
    (subsidiary) => subsidiary.id === id,
  )
}

const setTargetSubsidiary = (id) => {
  target.value = selects.value.subsidiariesTarget.options.find(
    (subsidiary) => subsidiary.id === id,
  )
}
</script>
