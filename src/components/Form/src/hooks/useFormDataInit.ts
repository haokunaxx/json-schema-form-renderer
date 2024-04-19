import { ref } from 'vue'
import { cloneDeep } from 'lodash'
import {
  deepMerge,
  isArray,
  isBoolean,
  isNullOrUnDef,
  isNumber,
  isObject,
  isString
} from '@/utils'

import type {
  FormSchema,
  BoxSchema,
  ListSchema,
  FieldSchema,
  FormItemSchema,
  FormModelAndSchemaUtils
} from '@/types'

import {
  FormSchemaForRender,
  BoxSchemaForRender,
  ListSchemaForRender
} from '../types'

import { FormItemType } from '@/types/Schema'

type UseFormDataInitRet = [
  schema: Ref<FormSchemaForRender>,
  model: Ref<Recordable<any>>,
  FormModelAndSchemaUtils
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
  schema: FormSchemaForRender = [],
  ignoreDefaultValue = false
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
        prev[field] = ignoreDefaultValue ? '' : defaultValue ? defaultValue : ''
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
  const originSchema = ref<FormSchema>({})
  const schemaAfterChanged = ref<FormSchema>({})
  const model = ref<Recordable<any>>({})
  const schema = ref<FormSchemaForRender>([])

  const initData = (
    originSchema: FormSchema,
    currentFormData?: Recordable<any>
  ) => {
    const renderSchema = getRenderSchema(originSchema)
    schema.value = renderSchema
    const originalFormModel = initModelByRenderSchema(renderSchema)
    model.value = currentFormData
      ? deepMerge(originalFormModel, currentFormData)
      : originalFormModel
  }

  watch(
    reactiveOriginalSchema,
    (newVal) => {
      const originalSchemaStr = unref(reactiveOriginalSchema)
      originSchema.value = cloneDeep(originalSchemaStr)
      schemaAfterChanged.value = cloneDeep(originalSchemaStr)
      initData(unref(newVal))
    },
    { immediate: true }
  )

  const setSchemaByPath = (schemaPath: string[], newSchema: FormItemSchema) => {
    const schemaToChange = cloneDeep(schemaAfterChanged.value)
    let temp: FormSchema | undefined = schemaToChange
    while (schemaPath.length > 1) {
      if (!temp) break
      const path = schemaPath.shift() as string
      const schema = temp[path]
      if (schema?.type === FormItemType.FIELD) {
        temp = undefined
        break
      }
      temp = (schema as BoxSchema | ListSchema).items
    }
    if (!temp) return
    temp[schemaPath[0]] = newSchema
    initData(schemaToChange, unref(model.value))
    schemaAfterChanged.value = schemaToChange
  }

  const addSchemaByPath = (
    schemaPath: string[],
    newSchema: FormItemSchema,
    isPrepend?: boolean
  ) => {
    const schemaToChange = cloneDeep(schemaAfterChanged.value)
    if (schemaPath.length === 1) {
      initData(
        isPrepend
          ? { [schemaPath[0]]: newSchema, ...schemaToChange }
          : { ...schemaToChange, [schemaPath[0]]: newSchema },
        unref(model.value)
      )
      schemaAfterChanged.value = schemaToChange
    }
    let temp: FormItemSchema | undefined =
      schemaToChange[schemaPath.shift() as string]
    while (schemaPath.length > 1) {
      if (!temp) break
      if (temp?.type === FormItemType.FIELD) {
        temp = undefined
        break
      }
      const path = schemaPath.shift() as string
      const schema = (temp as BoxSchema).items![path]
      if (!(schema as BoxSchema).items) {
        temp = undefined
        break
      }
      temp = schema
    }
    if (!temp) return
    const path = schemaPath[0]
    ;(temp as BoxSchema).items = isPrepend
      ? {
          [path]: newSchema,
          ...(temp as BoxSchema).items
        }
      : {
          ...(temp as BoxSchema).items,
          [path]: newSchema
        }
    // temp[path] = newSchema
    // console.log(temp)
    initData(schemaToChange, unref(model.value))
    schemaAfterChanged.value = schemaToChange
  }
  const appendSchemaByPath = (
    schemaPath: string[],
    newSchema: FormItemSchema
  ) => {
    addSchemaByPath(schemaPath, newSchema)
  }
  const prependSchemaByPath = (
    schemaPath: string[],
    newSchema: FormItemSchema
  ) => {
    addSchemaByPath(schemaPath, newSchema, true)
  }

  return [
    schema,
    model,
    {
      setSchemaByPath,
      appendSchemaByPath,
      prependSchemaByPath,
      setValueByPath: (modelPath: string[], value: any) => {
        let target = model.value
        let i = 0
        const len = modelPath.length - 1
        for (; i < len; i++) {
          target = target[modelPath[i]]
        }
        const lastPath = modelPath[i] as string
        target[lastPath] = value
      },
      getValueByPath: (modelPath: string[]) => {
        let res = model.value
        for (let i = 0, len = modelPath.length; i < len; i++) {
          res = res[modelPath[i]]
        }
        // return readonly(res)
        return res
      },
      clearFormModel: () => {
        const getEmptyVal = (val) => {
          if (isArray(val)) return []
          if (isBoolean(val)) return false
          if (isString(val)) return ''
          if (isNumber(val)) return 0
          if (isNullOrUnDef(val)) return undefined
        }
        const getEmptyValueModel = (model: Recordable) => {
          const res = isArray(model) ? [] : {}
          for (const key in model) {
            if (isObject(model[key]) || isArray(model[key])) {
              res[key] = getEmptyValueModel(model[key])
            } else {
              res[key] = getEmptyVal(model[key])
            }
          }
          return res
        }
        model.value = getEmptyValueModel(cloneDeep(unref(model)))
      }
    }
  ]
}
