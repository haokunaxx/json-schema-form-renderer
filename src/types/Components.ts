import {
  ElInput,
  ElInputNumber,
  ElCheckbox,
  ElRadio,
  ElSwitch,
  ElRate,
  ElColorPicker,
  ElDatePicker,
  ElSlider,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElDivider
} from 'element-plus'
import { Fields, List, Box } from '@/utils'
import { ListSchemaForRender } from '@/components/Form/src/types'
import { CardProps } from '@/components/Container/Box/Card'
import { BasicListComponentProps } from '@/components/Container/List/Basic'
type ElCompProps<T extends new (...args: any[]) => any> = Partial<
  InstanceType<T>
>

export interface FieldProps {
  [Fields.Input]: Partial<InstanceType<typeof ElInput>>
  [Fields.InputNumber]: Partial<InstanceType<typeof ElInputNumber>>
  [Fields.Checkbox]: Partial<InstanceType<typeof ElCheckbox>>
  [Fields.Radio]: Partial<InstanceType<typeof ElRadio>>
  [Fields.Switch]: Partial<InstanceType<typeof ElSwitch>>
  [Fields.Rate]: Partial<InstanceType<typeof ElRate>>
  [Fields.ColorPicker]: Partial<InstanceType<typeof ElColorPicker>>
  [Fields.DatePicker]: Partial<InstanceType<typeof ElDatePicker>>
  [Fields.Slider]: Partial<InstanceType<typeof ElSlider>>
  [Fields.TimePicker]: Partial<InstanceType<typeof ElTimePicker>>
  [Fields.TimeSelect]: Partial<InstanceType<typeof ElTimeSelect>>
  [Fields.Transfer]: Partial<InstanceType<typeof ElTransfer>>
  // [Fields.Select]: CustomSelectProps
  // [Fields.ApiSelect]: ApiSelectProps
  [Fields.Divider]: ElCompProps<typeof ElDivider>
}

export interface BoxProps {
  [Box.Card]: CardProps
}

export interface ListProps {
  [List.Basic]: BasicListComponentProps
}

export type GetFieldProps<T extends keyof FieldProps> = T extends Fields
  ? FieldProps[T]
  : T extends () => infer U
  ? U extends Fields
    ? U extends keyof FieldProps
      ? FieldProps[U]
      : never
    : never
  : never

export interface ListBasicProps {
  schema: ListSchemaForRender
  model: Recordable
  disabled: boolean
  parentPaths: string[]
}
