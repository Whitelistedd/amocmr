<script setup lang="ts">
import { Button, Input, Table } from 'ant-design-vue'
import { getLeads } from '@/api/getLeads'
import PhoneIcon from '@/assets/icons/PhoneIcon.vue'
import EmailIcon from '@/assets/icons/EmailIcon.vue'
import { ref } from 'vue'
import type { leadType } from '@/types/leads'
import { getEmail, getPhone } from '@/utilities/getField'
import { reactive } from 'vue'
import { generateColumns } from '@/constants/HomeColumns'

const state = reactive({
  searchText: '',
  searchedColumn: ''
})

const data = ref([{}])
const loading = ref(false)
const searchInput = ref()

loading.value = true
getLeads()
  .then((response) => {
    data.value = response
  })
  .finally(() => (loading.value = false))

const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: string) => {
  confirm()
  state.searchText = selectedKeys[0]
  state.searchedColumn = dataIndex
}

const handleReset = (clearFilters: ({ confirm }: { confirm: boolean }) => void) => {
  clearFilters({ confirm: true })
  state.searchText = ''
}
</script>

<template>
  <main>
    <div>
      <h1>тестовое задание</h1>
      <Table :loading="loading" :data-source="data" :columns="generateColumns(searchInput)">
        <template #expandedRowRender="{ record }: { record: leadType }">
          <div class="expanded-row" v-for="contact in record.custom.contacts" :key="contact.id">
            <p>{{ contact.name }}</p>
            <a
              v-show="!!getPhone(contact.custom_fields_values)"
              :href="`tel:${getPhone(contact.custom_fields_values)}`"
            >
              <PhoneIcon />
            </a>

            <a
              v-show="!!getEmail(contact.custom_fields_values)"
              :href="`mailto:${getEmail(contact.custom_fields_values)}`"
            >
              <EmailIcon />
            </a>
          </div>
        </template>
        <template
          #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        >
          <div style="padding: 8px">
            <Input
              ref="searchInput"
              :placeholder="`Search ${column.dataIndex}`"
              :value="selectedKeys[0]"
              style="width: 188px; margin-bottom: 8px; display: block"
              @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
              @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
            />
            <Button
              type="primary"
              size="small"
              style="width: 90px; margin-right: 8px"
              @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
            >
              <template #icon><SearchOutlined /></template>
              Search
            </Button>
            <Button size="small" style="width: 90px" @click="handleReset(clearFilters)">
              Reset
            </Button>
          </div>
        </template>
      </Table>
    </div>
  </main>
</template>
