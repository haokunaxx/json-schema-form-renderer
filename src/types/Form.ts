import { FormInstance } from 'element-plus'
import { FormItemSchema } from './Schema'

export interface FormActionProps {
  cancelButtonText?: string
  confirmButtonText?: string
  loadingWhenActionButtonClick?: boolean //在formAction内部按钮触发的时候按钮是否进行 loading
}

export interface FormActionUtils {
  startLoading: () => void
  stopLoading: () => void
}

export type FormActionEmitParams = Pick<FormActionUtils, 'stopLoading'>

export type FormUtils = {
  validate: FormInstance['validate']
  validateField: FormInstance['validateField']
  clearValidate: FormInstance['clearValidate']
  scrollToField: FormInstance['scrollToField']
  resetFields: FormInstance['resetFields']

  formActionLoading: Function

  clearFields: () => void
}

export interface FormModelAndSchemaUtils {
  setSchemaByPath: (schemaPath: string[], newSchema: FormItemSchema) => void
  appendSchemaByPath: (schemaPath: string[], newSchema: FormItemSchema) => void
  prependSchemaByPath: (schemaPath: string[], newSchema: FormItemSchema) => void
  setValueByPath: (modelPath: string[], value: any) => void
  getValueByPath: (modelPath: string[]) => any
  clearFormModel: () => void
}

export type FormMethods = FormUtils & FormModelAndSchemaUtils & FormActionUtils
