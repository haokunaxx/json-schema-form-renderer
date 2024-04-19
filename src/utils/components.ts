import {
  ElInput,
  ElInputNumber,
  ElCheckbox,
  // ElRadio,
  ElSwitch,
  ElRate,
  ElColorPicker,
  ElDatePicker,
  ElSlider,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElDivider,
  ElRow,
  ElCol
} from 'element-plus'
import Card from '@/components/Container/Box/Card.vue'
import { BasicList } from '@/components/Container/List/Basic'

export const componentsMap = {
  // field
  Input: ElInput,
  InputNumber: ElInputNumber,
  Checkbox: ElCheckbox,
  // Radio: ElRadio,
  Switch: ElSwitch,
  Rate: ElRate,
  Slider: ElSlider,
  ColorPicker: ElColorPicker,
  DatePicker: ElDatePicker,
  DateTimePicker: ElDatePicker,
  TimePicker: ElTimePicker, //TODO: 二次封装value-format
  TimeSelect: ElTimeSelect,
  Transfer: ElTransfer,

  Card,
  Basic: BasicList,
  // other
  Divider: ElDivider,
  Row: ElRow,
  Col: ElCol
}

export enum Fields {
  Input = 'Input',
  InputNumber = 'InputNumber',
  Checkbox = 'Checkbox',
  // Radio = 'Radio',
  Switch = 'Switch',
  Rate = 'Rate',
  ColorPicker = 'ColorPicker',
  DatePicker = 'DatePicker',
  Slider = 'Slider',
  TimePicker = 'TimePicker',
  TimeSelect = 'TimeSelect',
  Transfer = 'Transfer',
  // Select = 'Select',
  // ApiSelect = 'ApiSelect',
  Divider = 'Divider'
}

export enum Box {
  Card = 'Card'
}

export enum List {
  Basic = 'Basic'
}
