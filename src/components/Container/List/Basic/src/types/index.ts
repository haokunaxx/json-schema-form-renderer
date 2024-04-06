import type { ColProps } from 'element-plus'

export interface BasicListComponentProps {
  //隐藏的操作按钮列表
  hideActionList?: ('add' | 'remove' | 'copy' | 'moveUp' | 'moveDown')[]
  // 列表操作的Col参数
  actionCol?: Partial<ColProps>
  // 列表内容的Col参数
  contentCol?: Partial<ColProps>
  // 是否显示序号
  showIndex?: boolean
  showSplit?: boolean
}
