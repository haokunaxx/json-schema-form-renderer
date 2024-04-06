import { FormItemType, FormSchema } from '@/types'
import { Fields, Box } from '@/utils'

export const testBoxSchema: FormSchema = {
  card: {
    type: FormItemType.BOX,
    component: Box.Card,
    label: 'Card',
    subLabel: 'subLabel-Card',
    helpMessage: 'helpMessage',
    items: {
      name: {
        type: FormItemType.FIELD,
        component: Fields.Input,
        label: '姓名',
        required: true,
        colProps: {
          span: 12
        }
      },
      age: {
        type: FormItemType.FIELD,
        component: Fields.Input,
        label: '年龄',
        required: true,
        colProps: {
          span: 12
        }
      },
      innerCard: {
        type: FormItemType.BOX,
        component: Box.Card,
        label: 'InnerCard',
        items: {
          innerName: {
            type: FormItemType.FIELD,
            component: Fields.Input,
            label: 'InnerName',
            required: true
          }
        }
      }
    },
    // disabled: true,
    ifShow: ({ formModel }) => formModel['username'] !== 'hidden',
    loading: ({ formModel }) => formModel['username'] === 'loading',
    rowProps: {
      gutter: 10
    }
    // colProps: {
    //   span: 12
    // }
  },
  username: {
    type: FormItemType.FIELD,
    component: Fields.Input,
    label: '用户名',
    required: ({ getValueByPath }) => {
      const temp = getValueByPath(['name']) === 'required'
      return temp
    }
  }
}
