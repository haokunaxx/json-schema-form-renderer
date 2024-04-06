<template>
  <div :style="{ width: '1200px', margin: '100px auto' }">
    <Form
      ref="formRef"
      :count="count"
      :schema="schema"
      :loadingWhenActionButtonClick="false"
      cancelButtonText="取消"
      @confirm="confirmHandler"
    >
      <template #testField>
        <h1>testField</h1>
      </template>
      <template #ConfirmBefore="{ loading }">
        <ElButton :loading="loading" @click="reset">重置</ElButton>
      </template>
      <template #ConfirmAfter>
        <ElButton>保存并新建</ElButton>
      </template>
      <template #otherSlot>
        <div>hello</div>
      </template>
    </Form>
  </div>
</template>
<script setup lang="ts">
import { Form } from './components/Form/index'
import { FormMethods, FormActionEmitParams } from '@/types/Form'
// tslint:disable-line
import {
  testBoxSchema as _testBoxSchema,
  testListSchema as _testListSchema,
  testListNestBoxSchema as _testListNestBoxSchema
} from '@/mock'
// import { FormItemType } from '@/types/Schema'
// import { Fields } from '@/types/Components'
const schema = ref(_testListNestBoxSchema)
const count = ref(1)
const formRef = ref<Nullable<FormMethods>>(null)
// const test = () => {
//   formRef.value?.validate()
// }
const confirmHandler = (params: FormActionEmitParams) => {
  setTimeout(() => {
    // console.log(formRef.value?.stopLoading)
    // formRef.value?.stopLoading()
    params.stopLoading()
  }, 3000)
}

const reset = () => {
  formRef.value?.resetFields()
}

// setTimeout(() => {
//   count.value = 2
//   schema.value = {
//     username: {
//       type: FormItemType.FIELD,
//       component: Fields.Input,
//       label: 'username1'
//     },
//     password: {
//       type: FormItemType.FIELD,
//       component: Fields.Input,
//       label: 'password1'
//     }
//   }
// }, 1000)
</script>
