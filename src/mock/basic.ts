// export const schema = {
//   formPart1: {
//     type: 'Box',
//     component: 'BasicCard',
//     items: {}
//   },
//   formPart2: {
//     type: 'List',
//     component: 'BasicList',
//     items: {}
//   },
//   isAgree: {
//     type: 'Field',
//     component: 'ElInput'
//   }
// }

import { FormItemType, type FormSchema } from '@/types/Schema'
import { Fields } from '@/utils'

export const testBasicSchema: FormSchema = {
  username: {
    type: FormItemType.FIELD,
    component: Fields.Input,
    label: '用户名',
    placeholder: '请输入用户名',
    required: true,
    helpMessage: 'this is a help message',
    subLabel: 'username',
    defaultValue: 'hello world',
    componentProps: {
      onBlur() {
        console.log('onBlur')
      }
    }
    // rules: [
    //   {
    //     required: true,
    //     message: '请填写'
    //   },
    //   {
    //     trigger: 'change',
    //     validator: (rule, value, callback) => {
    //       if (value !== 'hello world') {
    //         callback(new Error('出错了'))
    //       } else {
    //         callback()
    //       }
    //     }
    //   }
    // ],
    // elFormItemProps: {
    //  labelWidth: '100',
    //  showMessage: false,
    //  inlineMessage: 'hello',
    //  size: 'small'
    // },
    // colProps: {
    //   span: 12
    // }
  },
  password: {
    type: FormItemType.FIELD,
    // render: () => h(ElInput),
    component: Fields.Input,
    label: 'password',
    disabled: ({ formModel }) => formModel['username'] === 'disabled',
    loading: ({ formModel }) => formModel['username'] === 'loading',
    show: ({ formModel }) => formModel['username'] !== 'hidden',
    ifShow: ({ formModel }) => formModel['username'].length
  }
}
