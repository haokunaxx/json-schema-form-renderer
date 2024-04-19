<template>
  <div>
    <ElForm ref="formRef" :model="formModel">
      <FormItem
        v-for="item in renderSchema"
        :model="formModel"
        :schema="item"
        :key="item.field"
      >
        <template v-for="slotName in Object.keys(getFormItemSlots)" #[slotName]>
          <slot :name="slotName"></slot>
        </template>
      </FormItem>
      <FormAction
        v-bind="formActionProps"
        ref="formActionRef"
        @reset="formActionResetHandler"
        @confirm="formActionConfirmHandler"
      >
        <!-- <template #ConfirmBefore>
          <slot name="ConfirmBefore"></slot>
        </template> -->
        <template
          v-for="slotName in FormActionSlotNameList"
          #[slotName]="data"
          :key="slotName"
        >
          <slot :name="slotName" v-bind="data"></slot>
        </template>
      </FormAction>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import FormItem from './FormItem.vue'
import FormAction from './FormAction.vue'
import { useFormMethods, useFormDataInit } from './hooks/index'
import { FormActionSlotNameList, FormMethodsInjectKey } from './utils'
import { omit } from '@/utils'

import type { FormInstance } from 'element-plus'
import type {
  FormActionProps,
  FormActionUtils,
  FormActionEmitParams,
  FormUtils
} from '@/types/Form'
import { type FormSchema } from '@/types/Schema'
// import { FormItemType } from '@/types/Schema'
const props = defineProps<{
  schema: FormSchema
  count: number
}>()
const emit = defineEmits(['reset', 'confirm'])
const attrs = useAttrs(),
  slots = useSlots()
const formRef = ref<Nullable<FormInstance>>(null)
const formActionRef = ref<Nullable<FormActionUtils>>(null)

const [renderSchema, formModel, schemaAndModelOperationFns] = useFormDataInit(
  toRefs(props).schema
)
// console.log(renderSchema, formModel)
// console.log(slots, omit(slots, FormActionSlotNameList))
const getFormItemSlots = computed(() => omit(slots, FormActionSlotNameList))
// const formItemBindValue = computed(() => {
//   return {
//     slots: omit(slots, FormActionSlotNameList)
//   }
// })

const formMethods = useFormMethods({
  formRef,
  formModel,
  schemaAndModelOperationFns
})

// 传递给 FormAction 的 props
const formActionProps = computed<FormActionProps>(() => ({
  ...attrs
}))

// Form 组件暴露给父组件的方法，包含表单相关方法和 FormAction 暴露的组件方法
const exposeMethods = {
  ...(formMethods as FormUtils),
  ...schemaAndModelOperationFns,
  startLoading: () => {
    formActionRef.value?.startLoading()
  },
  stopLoading: () => {
    formActionRef.value?.stopLoading()
  }
}

// exposeMethods.setValueByPath

provide(FormMethodsInjectKey, exposeMethods)

// 监听 FormAction 的方法
// FormAction重置按钮点击处理方法
const formActionResetHandler = (params: FormActionEmitParams) => {
  emit('reset', params)
}
// FormAction确定按钮点击处理方法
const formActionConfirmHandler = (params: FormActionEmitParams) => {
  formRef.value?.validate()
  console.log(formModel.value)
  emit('confirm', params)
}

// 打开组件并指定需要暴露的方法
defineExpose(exposeMethods)
// 用于对 slot 的名称和 props 进行提示。（https://cn.vuejs.org/api/sfc-script-setup.html#defineslots）
defineSlots<{
  CancelBefore(props: { loading: boolean }): any
  ConfirmBefore(props: { loading: boolean }): any
  ConfirmBefore(props: { loading: boolean }): any
}>()
</script>

<!-- <style scoped>

</style> -->
