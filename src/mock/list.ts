import { FormItemType, FormSchema } from '@/types'
import { List, Fields } from '@/utils'
// import type { BasicListComponentProps } from '@/components/Container/List/Basic'
export const testListSchema: FormSchema = {
  username: {
    type: FormItemType.FIELD,
    component: Fields.Input,
    label: '用户名'
  },
  list: {
    label: '测试列表',
    subLabel: '测试列表子标题',
    helpMessage: '测试列表帮助信息',
    type: FormItemType.LIST,
    component: List.Basic,
    // min: 1,
    // max: 5,
    componentProps: {
      showSplit: true,
      showIndex: true
      // contentCol: {
      // span: 18
      // },
      // actionCol: {
      // span: 10
      // }
    },
    items: {
      name: {
        type: FormItemType.FIELD,
        component: Fields.Input,
        label: '姓名',
        required: true,
        defaultValue: 'name',
        colProps: {
          span: 12
        }
        // componentProps: {
        //   ac
        // }
        // componentProps: {
        //   ac
        // }
      },
      age: {
        type: FormItemType.FIELD,
        component: Fields.Input,
        label: '年龄',
        defaultValue: 'age',
        required: true,
        colProps: {
          span: 12
        }
      }
      // list2: {
      //   type: FormItemType.LIST,
      //   component: List.Basic,
      //   label: '列表2',
      //   componentProps: {
      //     showIndex: true,
      //     hideActionList: ['moveDown', 'moveUp', 'copy']
      //   } as BasicListComponentProps,
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
      // }
    }
  }
}
