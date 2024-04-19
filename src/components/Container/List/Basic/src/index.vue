<template>
  <div class="list-basic list-template-basic">
    <div class="list-basic-header">
      <LabelHelpMessage v-bind="schema" />
    </div>
    <template v-if="renderList.length > 0">
      <ElRow
        class="list-basic-item"
        v-for="(row, index) in renderList"
        :key="row.id"
        :gutter="10"
      >
        <ElCol :span="1" v-if="rowIndexVisible">
          <p class="list-basic-item-row-index">{{ index + 1 }}</p>
        </ElCol>
        <ElCol v-bind="contentColBindValue">
          <ElRow :gutter="10">
            <RenderItem
              v-for="col in row"
              :key="col.field"
              v-bind="col"
              :disabled="disabled"
              :model="model"
              :schema="col"
              :rowData="listData[index]"
              :rowIndex="index"
            />
          </ElRow>
        </ElCol>
        <ElCol v-bind="actionColBindValue" style="padding-top: 4px">
          <ElButton
            size="small"
            :disabled="addBtnDisabled"
            @click="add(index)"
            v-if="!actionVisibleList.includes('add')"
            >追加一行</ElButton
          >
          <ElButton
            v-if="!actionVisibleList.includes('remove')"
            size="small"
            :disabled="removeBtnDisabled"
            @click="removeByIndex(index)"
            >删除</ElButton
          >
          <ElButton
            v-if="!actionVisibleList.includes('moveUp')"
            size="small"
            :disabled="getMoveUpBtnDisabled(index)"
            @click="moveUp(index)"
            >上移</ElButton
          >
          <ElButton
            v-if="!actionVisibleList.includes('moveDown')"
            size="small"
            :disabled="getMoveDownBtnDisabled(index)"
            @click="moveDown(index)"
            >下移</ElButton
          >
          <ElButton
            v-if="!actionVisibleList.includes('copy')"
            size="small"
            :disabled="copyBtnDisabled"
            @click="copyByIndex(index)"
            >复制</ElButton
          >
        </ElCol>
        <ElCol
          class="list-basic-item-split"
          v-if="listItemSplitVisible"
          :span="24"
        />
      </ElRow>
    </template>
    <template v-else>
      <div class="list-basic-empty-box" @click="add()">
        <ElIcon>
          <Plus />
        </ElIcon>
        <p>新增一条数据</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons'
import { LabelHelpMessage } from '@/components/Form'
import { useList } from './hooks/useList'
import type { ListBasicProps } from '@/types' //列表组件基本属性（必须）

// 定义自己列表组件的额外属性
import type { BasicListComponentProps } from '../'
const RenderItem = defineAsyncComponent(
  () => import('@/components/Form/src/FormItem.vue')
)

const props = defineProps<ListBasicProps>()

const {
  listData,
  renderList,
  add,
  removeByIndex,
  moveUp,
  moveDown,
  copyByIndex,
  addBtnDisabled,
  removeBtnDisabled,
  copyBtnDisabled,
  getMoveUpBtnDisabled,
  getMoveDownBtnDisabled
} = useList(props)
const getComponentProps = computed<BasicListComponentProps>(() => {
  return props.schema.componentProps || {}
})

const rowIndexVisible = computed(() => {
  return unref(getComponentProps).showIndex
})

const listItemSplitVisible = computed(() => {
  return unref(getComponentProps).showSplit
})

const contentColBindValue = computed(() => {
  const { showIndex, actionCol, contentCol = {} } = unref(getComponentProps)
  const otherSpan = (showIndex ? 1 : 0) + (actionCol?.span ? actionCol.span : 7)
  const span = contentCol?.span ? contentCol.span : 24 - otherSpan
  return {
    ...contentCol,
    span
  }
})
const actionColBindValue = computed(() => {
  const { showIndex, actionCol = {} } = unref(getComponentProps)
  const otherSpan = (showIndex ? 1 : 0) + contentColBindValue.value.span
  const span = actionCol?.span ? actionCol.span : 24 - otherSpan
  return {
    ...actionCol,
    span
  }
})

const actionVisibleList = computed(() => {
  return unref(getComponentProps).hideActionList || []
})
</script>

<style lang="scss" scoped>
.list-basic {
  margin: 12px 0;

  &-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
  }

  &-item {
    &-row-index {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 8px;
      font-size: 14px;
    }

    &-split {
      position: relative;
      margin: 6px auto 24px;
      width: 100%;
      height: 2px;

      &::after {
        content: '';
        position: absolute;
        left: 3%;
        display: block;
        overflow: hidden;
        width: 94%;
        height: 100%;
        background-color: #eee;
      }
    }
  }

  &-empty-box {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    color: #ababab;
    border: 1px dashed #ababab;

    p {
      margin: 6px 0;
    }
  }
}
</style>
