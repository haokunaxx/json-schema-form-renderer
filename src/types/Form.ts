export interface FormActionProps {
  cancelButtonText?: string
  confirmButtonText?: string
  loadingWhenActionButtonClick?: boolean //在formAction内部按钮触发的时候按钮是否进行 loading
}

export interface FormActionMethods {
  startLoading: () => void
  stopLoading: () => void
}

export type FormActionEmitParams = Pick<FormActionMethods, 'stopLoading'>

export type FormMethods = {
  validate: Function
  formActionLoading: Function
  setValueByPath: (modelPath: string[], value: any) => void
  getValueByPath: (modelPath: string[]) => any
  resetFields: () => void
} & FormActionMethods
