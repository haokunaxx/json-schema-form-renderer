import type { FormInstance } from 'element-plus'
import type { FormUtils, FormModelAndSchemaUtils } from '@/types'

interface UseFormMethodsProps {
  formRef: Ref<Nullable<FormInstance>>
  formModel: Ref<Recordable>
  schemaAndModelOperationFns: FormModelAndSchemaUtils
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
): Partial<FormUtils> => {
  const {
    formRef,
    schemaAndModelOperationFns: { clearFormModel }
  } = props
  return {
    validate: formRef.value?.validate,
    validateField: formRef.value?.validateField,
    clearValidate: formRef.value?.clearValidate,
    scrollToField: formRef.value?.scrollToField,
    resetFields: formRef.value?.resetFields,
    formActionLoading: () => {
      console.log('formActionLoading')
    },
    clearFields: clearFormModel
  }
}
