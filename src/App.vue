<template>
  <div :style="{ width: '1200px', margin: '100px auto' }">
    <ElButton @click="formMethodsTest">测试</ElButton>
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
// import { FormItemType } from './types'
// import { Fields, Box } from './utils'
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

const setValueTest = () => {
  formRef.value?.setValueByPath(['list', '0'], {
    companyType: 'hello',
    email: 'xux9801@163.com',
    employees: '100',
    name: 'cloudcc'
  })
}
// const getValueTest = () => {
//   const data = formRef.value?.getValueByPath(['list', '0'])
//   console.log('--: ', data)
//   data.name = 'cao'
//   console.log(data.name)
// }

const formMethodsTest = () => {
  setValueTest()
  // getValueTest()
  // formRef.value?.setValueByPath(['list', '0'], {
  //   companyType: 'hello',
  //   email: 'xux9801@163.com',
  //   employees: '100',
  //   name: 'cloudcc'
  // })
  // formRef.value?.setSchemaByPath(['username'], {
  //   type: FormItemType.FIELD,
  //   component: Fields.Input,
  //   label: '用户名',
  //   defaultValue: 'xuxin'
  // })
  // formRef.value?.setSchemaByPath(['testCard', 'name2'], {
  //   type: FormItemType.FIELD,
  //   component: Fields.Switch,
  //   label: '姓名2',
  //   defaultValue: true
  // })
  // formRef.value?.setSchemaByPath(['list', 'name'], {
  //   type: FormItemType.FIELD,
  //   component: Fields.Switch,
  //   label: '联系人2',
  //   defaultValue: true
  // })
  // formRef.value?.setSchemaByPath(['list', 'detailCard', 'companyType'], {
  //   type: FormItemType.FIELD,
  //   component: Fields.Switch,
  //   label: '公司类型111',
  //   defaultValue: true
  // })
  // formRef.value?.setSchemaByPath(['switch'], {
  //   type: FormItemType.BOX,
  //   label: '测试卡片',
  //   component: Box.Card,
  //   items: {
  //     name2: {
  //       type: FormItemType.FIELD,
  //       component: Fields.Input,
  //       label: '姓名2',
  //       required: true,
  //       defaultValue: 'list2-name',
  //       colProps: {
  //         span: 12
  //       }
  //     },
  //     age2: {
  //       type: FormItemType.FIELD,
  //       component: Fields.Input,
  //       label: '年龄2',
  //       defaultValue: 'list2-age',
  //       required: true,
  //       colProps: {
  //         span: 12
  //       }
  //     }
  //   }
  // })
  // formRef.value?.prependSchemaByPath(['list', 'detailCard', 'testCard'], {
  //   type: FormItemType.BOX,
  //   label: '测试卡片',
  //   component: Box.Card,
  //   items: {
  //     name2: {
  //       type: FormItemType.FIELD,
  //       component: Fields.Input,
  //       label: '姓名2',
  //       required: true,
  //       defaultValue: 'list2-name',
  //       colProps: {
  //         span: 12
  //       }
  //     },
  //     age2: {
  //       type: FormItemType.FIELD,
  //       component: Fields.Input,
  //       label: '年龄2',
  //       defaultValue: 'list2-age',
  //       required: true,
  //       colProps: {
  //         span: 12
  //       }
  //     }
  //   }
  // })
  // formRef.value?.clearFields()
}
</script>
