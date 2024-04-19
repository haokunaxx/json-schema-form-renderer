import { inject } from 'vue'
import { v4 as uuid } from 'uuid'
import cloneDeep from 'lodash/cloneDeep'
import { FormMethodsInjectKey } from '@/components/Form'
import type { ListBasicProps } from '@/types'
import { isNullOrUnDef } from '@/utils'

export const useList = (props: ListBasicProps) => {
  const formMethods = inject(FormMethodsInjectKey)
  const { getValueByPath, setValueByPath } = formMethods!
  // 列表初始数据
  const initialListData = getValueByPath(props.parentPaths)
  // 列表行的默认值
  const rowDefaultData = JSON.parse(JSON.stringify(initialListData[0] || []))

  // 列表数据（不提供给外面）
  const listData = computed(() => {
    return getValueByPath(props.parentPaths)
  })

  //用于渲染列表视图的数据
  const renderList = computed(() => {
    const { parentPaths, schema } = props
    // return getValueByPath(parentPaths).reduce((prev, _, index) => {
    return unref(listData).reduce((prev, _, index) => {
      prev.push(
        (schema.items || []).map((item) => {
          return {
            ...item,
            id: uuid(),
            parentPaths: [...parentPaths, '' + index]
          }
        })
      )
      return prev
    }, [])
  })

  //新增按钮禁用
  const addBtnDisabled = computed(() => {
    const { max = 10 } = props.schema
    return renderList.value.length >= max
  })

  //删除按钮禁用
  const removeBtnDisabled = computed(() => {
    const { min = 0 } = props.schema
    return renderList.value.length === min
  })

  //上移按钮禁用
  const getMoveUpBtnDisabled = (index) => index === 0

  // 下移按钮禁用
  const getMoveDownBtnDisabled = (index) =>
    index === renderList.value.length - 1

  /**
   * 添加一行
   */
  const add = (index?: number) => {
    const { parentPaths } = props
    let resList = getValueByPath(parentPaths)
    if (isNullOrUnDef(index)) {
      resList = [...resList, { ...rowDefaultData }]
    } else {
      resList.splice(index + 1, 0, { ...rowDefaultData })
    }
    setValueByPath(parentPaths, resList)
  }
  /**
   * 根据索引删除当前行
   * */
  const removeByIndex = (index: number) => {
    const { parentPaths } = props
    const list = getValueByPath(parentPaths)
    setValueByPath(
      parentPaths,
      list.filter((_, idx) => index !== idx)
    )
  }
  /**
   * 清空
   */
  const removeAll = () => {
    setValueByPath(props.parentPaths, [])
  }

  /**
   * 移动
   */
  const move = (dir: 'up' | 'down', index: number) => {
    const { parentPaths } = props
    const list = getValueByPath(parentPaths)
    const moveItem = list.splice(index, 1)[0]
    list.splice(dir === 'up' ? index - 1 : index + 1, 0, moveItem)
    setValueByPath(parentPaths, list)
  }

  /**
   * 上移一行
   */
  const moveUp = (index: number) => {
    move('up', index)
  }

  /**
   * 下移一行
   */
  const moveDown = (index: number) => {
    move('down', index)
  }

  /**
   * 根据索引复制行
   * FIXME: Copy的列表项的表单值无法重置，看一下 ElForm的 resetFields方法的实现后或许可以找到解决方案
   */
  const copyByIndex = (index: number) => {
    const { parentPaths } = props
    const list = getValueByPath(parentPaths)
    const moveItem = cloneDeep(list[index])
    list.splice(index + 1, 0, moveItem)
    setValueByPath(parentPaths, list)
  }

  return {
    listData,
    renderList,
    add,
    removeByIndex,
    removeAll,
    copyByIndex,
    moveUp,
    moveDown,
    addBtnDisabled,
    removeBtnDisabled,
    copyBtnDisabled: addBtnDisabled,
    getMoveUpBtnDisabled,
    getMoveDownBtnDisabled
  }
}
