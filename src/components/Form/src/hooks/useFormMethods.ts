import type { FormInstance } from 'element-plus'
import type { FormMethods, FormActionMethods } from '@/types/Form'

interface UseFormMethodsProps {
  formRef: Ref<Nullable<FormInstance>>
  formModel: Ref<Recordable>
}

/**
 * 提供的事件列表
 * ElForm自带的事件
 *  validate
 *  validateField
 *  resetFields
 *  clearValidate
 *  scrollToField
 *  handleSubmit
 * 额外的方法
 *  针对于布局
 *    getSchema: 获取当前表单的布局结构（layout-json-schema）
 *    通过路径获取一个表单项的布局数据（field-json-schema，优先级低，可能用的地方少）
 *    添加一个表单项（当前版本不做，因为可以通过字段依赖控制，如果要提供接口给实施的在思考）
 *    删除一个表单项（同上）
 *  针对于表单数据
 *    getValues: 获取当前表单的 Model 数据（formData）
 *    getValueByPath: 通过路径获得一个表单项在 Model 中的值
 *    setValues: 设置当前表单的 Model 数据
 *    setValueByPath: 通过路径更新一个表单项在 Model 中的值
 */
export const useFormMethods = (
  props: UseFormMethodsProps
): Omit<FormMethods, keyof FormActionMethods> => {
  const { formModel, formRef } = props
  return {
    validate: () => {
      console.log('validate')
    },
    formActionLoading: () => {
      console.log('formActionLoading')
    },
    /*
      ['username']
      ['part1', 'field1']
      ['list1']
      ['list1', '0']
      ['list1', '0', 'listItemName']
      ['list1', 'listItemName']
    */
    setValueByPath: (modelPath: string[], value: any) => {
      let target = formModel.value
      let i = 0
      const len = modelPath.length - 1
      for (; i < len; i++) {
        target = target[modelPath[i]]
      }
      const lastPath = modelPath[i] as string
      target[lastPath] = value
    },
    getValueByPath: (modelPath: string[]) => {
      let res = formModel.value
      for (let i = 0, len = modelPath.length; i < len; i++) {
        res = res[modelPath[i]]
      }
      return res
    },
    resetFields: () => {
      formRef.value?.resetFields()
    }
  }
}
