import { ref } from 'vue'

import type {
  FormSchema,
  BoxSchema,
  ListSchema,
  FieldSchema
} from '@/types/Schema'

import {
  FormSchemaForRender,
  BoxSchemaForRender,
  ListSchemaForRender
} from '../types/schema'

import { FormItemType } from '@/types/Schema'

type UseFormDataInitRet = [
  schema: Ref<FormSchemaForRender>,
  model: Ref<Recordable<any>>
]

// 根据传入的 schema 结构生成用于渲染的 schema 结构
// const getRenderSchema = (
//   schema: FormSchema,
//   parentPath: string[] = []
// ): FormSchemaForRender => {
//   return Object.keys(schema).reduce((prev, key) => {
//     const item = schema[key]
//     if (item.type === FormItemType.FIELD) {
//       prev.push({
//         ...(item as FieldSchema),
//         field: key,
//         path: [...parentPath, key]
//       })
//     } else {
//       const { items } = item as BoxSchema | ListSchema
//       prev.push({
//         ...item,
//         field: key,
//         path: [...parentPath, key],
//         items: items ? getRenderSchema(items, [...parentPath, key]) : undefined
//       } as BoxSchemaForRender | ListSchemaForRender)
//     }
//     return prev
//   }, [] as FormSchemaForRender)
// }
// OPT:
const getRenderSchema = (
  schema: FormSchema
  // parentSchemaPath: string[] = [],
  // parentModelPath: string[] = []
): FormSchemaForRender => {
  return Object.keys(schema).reduce((prev, key) => {
    const item = schema[key]
    if (item.type === FormItemType.FIELD) {
      prev.push({
        ...(item as FieldSchema),
        field: key
      })
    } else {
      const { items } = item as BoxSchema | ListSchema
      prev.push({
        ...item,
        field: key,
        items: items ? getRenderSchema(items) : undefined
      } as BoxSchemaForRender | ListSchemaForRender)
    }
    return prev
  }, [] as FormSchemaForRender)
}

// 通过用于渲染的 schema 初始化 model
// const initModelByRenderSchema = (schema: FormSchemaForRender): Recordable => {
//   return schema.reduce((prev, item) => {
//     const { field } = item
//     if (field) {
//       if (item.type === FormItemType.FIELD) {
//         const { defaultValue } = item as FieldSchema
//         prev[field] = defaultValue ? defaultValue : ''
//       } else {
//         const { items } = item as BoxSchemaForRender
//         if (items) prev[field] = initModelByRenderSchema(items)
//       }
//     }
//     return prev
//   }, {} as Recordable)
// }

const initModelByRenderSchema = (
  schema: FormSchemaForRender = []
): Recordable => {
  return schema.reduce((prev, item) => {
    const { field } = item
    if (field) {
      if (item.type === FormItemType.LIST) {
        prev[field] = [
          initModelByRenderSchema((item as ListSchemaForRender).items)
        ]
      } else if (item.type === FormItemType.FIELD) {
        const { defaultValue } = item as FieldSchema
        prev[field] = defaultValue ? defaultValue : ''
      } else {
        prev = {
          ...prev,
          ...initModelByRenderSchema((item as BoxSchemaForRender).items)
        }
      }
    }
    return prev
  }, {} as Recordable)
}

export function useFormDataInit(
  reactiveOriginalSchema: Ref<FormSchema>
): UseFormDataInitRet {
  const model = ref<Recordable<any>>({})
  const schema = ref<FormSchemaForRender>([])
  watch(
    reactiveOriginalSchema,
    (newVal) => {
      const renderSchema = getRenderSchema(unref(newVal))
      schema.value = renderSchema
      model.value = initModelByRenderSchema(renderSchema)
    },
    { immediate: true }
  )

  return [schema, model]
}
