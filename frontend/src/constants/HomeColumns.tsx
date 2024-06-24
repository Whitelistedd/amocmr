import type { leadType } from '@/types/leads'
import { formatSecondsToDate } from '@/utilities/formatSecondsToDate'
import type { TableColumnsType } from 'ant-design-vue'
import type { Ref } from 'vue'

export const generateColumns = (searchInput: Ref<any>): TableColumnsType<leadType> => [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    customFilterDropdown: true,
    sorter: (a: leadType, b: leadType) => (a.name[0] < b.name[0] ? 1 : -1),
    sortDirections: ['descend', 'ascend'],
    onFilter: (value, record) =>
      record.name.toString().toLowerCase().includes(String(value).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    }
  },
  {
    title: 'Бюджет',
    dataIndex: 'price',
    key: 'price',
    customRender: ({ text }: { text: number }) => {
      return {
        children: text && Number(text).toLocaleString()
      }
    },
    customFilterDropdown: true,
    sorter: (a: leadType, b: leadType) => a.price - b.price,
    sortDirections: ['descend', 'ascend'],
    onFilter: (value, record) =>
      record.price.toString().toLowerCase().includes(String(value).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    }
  },
  {
    title: 'Статус',
    dataIndex: ['custom', 'status'],
    key: 'status',
    customFilterDropdown: true,
    sorter: (a: leadType, b: leadType) => (a.custom.status[0] < b.custom.status[0] ? 1 : -1),
    sortDirections: ['descend', 'ascend'],
    onFilter: (value, record) =>
      record.custom.status.toString().toLowerCase().includes(String(value).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    }
  },
  {
    title: 'Ответственный	',
    dataIndex: ['custom', 'responsible_user'],
    key: 'responsible_user',
    customFilterDropdown: true,
    sorter: (a: leadType, b: leadType) =>
      a.custom.responsible_user.name[0] < b.custom.responsible_user.name[0] ? 1 : -1,
    sortDirections: ['descend', 'ascend'],
    onFilter: (value, record) =>
      record.custom.responsible_user.toString().toLowerCase().includes(String(value).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    }
  },
  {
    title: 'Дата создания',
    dataIndex: 'created_at',
    key: 'created_at',
    customRender: ({ text }) => {
      return {
        children: text && `${formatSecondsToDate(text).toLocaleString()}`
      }
    },
    customFilterDropdown: true,
    sorter: (a: leadType, b: leadType) => (a.created_at < b.created_at ? 1 : -1),
    sortDirections: ['descend', 'ascend'],
    onFilter: (value, record) => {
      const formatedDate = formatSecondsToDate(record.created_at).toLocaleString()
      console.log(formatedDate)
      return formatedDate.includes(String(value).toLowerCase())
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    }
  }
]
