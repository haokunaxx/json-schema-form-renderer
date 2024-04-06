// import { componentsMap } from '@/utils/components'

import type {
  RowProps,
  ColProps,
  FormItemProps,
  FormItemRule
} from 'element-plus'
import type { Fields } from '@/utils'
import { VNode } from 'vue'

export enum FormItemType {
  BOX = 'Box',
  LIST = 'List',
  FIELD = 'Field'
}

export interface SchemaFunctionTypePropertyBasicParams {
  field: string //当前表单项字段field
  model: any //当前表单项字段的值
  schema: any //当前表单项的schema
  formModel: Readonly<Recordable> //整个表单的model
  setValueByPath: (path: string[], value: any) => void //根据路径更新表单项的值
  getValueByPath: (path: string[]) => any //根据路径获取表单项的值
}

type BasicSchemaDependencyPropertyType =
  | ((params: SchemaFunctionTypePropertyBasicParams) => boolean)
  | boolean

export interface BasicSchema {
  // 基本
  type: FormItemType //类型,
  label?: string //标签`
  componentProps?: Recordable

  // 依赖相关
  show?: BasicSchemaDependencyPropertyType
  ifShow?: BasicSchemaDependencyPropertyType
  required?: BasicSchemaDependencyPropertyType
  disabled?: BasicSchemaDependencyPropertyType
  loading?: BasicSchemaDependencyPropertyType
  // componentProps?: Recordable
  // componentProps?: SchemaComponentProps<BasicSchema['component']>

  // 布局相关
  colProps?: Partial<ColProps>

  // 其他
  subLabel?: string //子标签
  helpMessage?: string //帮助文本
  // description?: string //描述
}

export interface FieldSchema extends BasicSchema {
  component?: Fields
  render?: () => VNode | VNode[] | string
  slot?: string
  noLabel?: boolean //不显示标签
  defaultValue?: any //默认值
  placeholder?: string //占位符
  elFormItemProps?: Partial<
    Pick<
      FormItemProps,
      | 'labelWidth'
      | 'inlineMessage'
      | 'error'
      | 'for'
      | 'showMessage'
      | 'size'
      | 'validateStatus'
    >
  > //el-form-item组件支持的属性
  rules?: FormItemRule[] //el-form-item rules
  // WAIT_FOR_TEST:
  dynamicRules?: (
    params: SchemaFunctionTypePropertyBasicParams
  ) => FormItemRule[] //动态rules
  clearInputWhenIfShowFalse?: boolean //ifShow为false时清空表单值
}

export interface ContainerSchema extends BasicSchema {
  component: string
  rowProps?: Partial<RowProps>
}

export interface BoxSchema extends ContainerSchema {
  separated?: boolean //是否分隔，仅Schema第一层的容器可以使用该属性
  items?: Recordable<BoxSchema | FieldSchema | ListSchema> //子集
}
export interface ListSchema extends ContainerSchema {
  max?: number //列表项最大个数
  min?: number //列表项最小个数
  items?: Recordable<BoxSchema | FieldSchema | ListSchema> //子集
}

export type FormItemSchema = BoxSchema | FieldSchema | ListSchema
export type FormSchema = Recordable<FormItemSchema>
