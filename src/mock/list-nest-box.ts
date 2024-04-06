import { FormItemType, FormSchema } from '@/types'
import { List, Fields, Box } from '@/utils'
import type { BasicListComponentProps } from '@/components/Container/List/Basic'
export const testListNestBoxSchema: FormSchema = {
  username: {
    type: FormItemType.FIELD,
    component: Fields.Input,
    label: '用户名',
    defaultValue: 'xuxin'
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
    } as BasicListComponentProps,
    items: {
      name: {
        type: FormItemType.FIELD,
        component: Fields.Input,
        label: '联系人',
        required: true,
        defaultValue: '',
        colProps: {
          span: 12
        }
      },
      email: {
        type: FormItemType.FIELD,
        component: Fields.Input,
        label: '联系方式（邮件）',
        // required: true,
        required: (params) => {
          console.log(params)
          return true
        },
        colProps: {
          span: 12
        },
        defaultValue: '@163.com'
      },
      detailCard: {
        type: FormItemType.BOX,
        component: Box.Card,
        label: '潜在客户具体信息',
        rowProps: {
          gutter: 10
        },
        items: {
          companyType: {
            type: FormItemType.FIELD,
            component: Fields.Input,
            label: '公司类型',
            colProps: {
              span: 12
            }
          },
          employees: {
            type: FormItemType.FIELD,
            component: Fields.Input,
            label: '员工个数',
            colProps: {
              span: 12
            }
          }
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
