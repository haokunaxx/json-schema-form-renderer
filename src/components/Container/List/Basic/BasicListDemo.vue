<template>
  <div class="basic-list">
    <ul class="list" v-if="renderList.length > 0">
      <li v-for="(row, index) in renderList" :key="index">
        <RenderItem
          v-for="item in row"
          v-bind="item"
          :key="item.field"
          :model="model"
          :schema="item"
        />
        <ElButton :disabled="addBtnDisabled" @click="add">添加一行</ElButton>
        <ElButton :disabled="removeBtnDisabled" @click="removeByIndex(index)"
          >删除一行</ElButton
        >
        <ElButton :disabled="getMoveUpBtnDisabled(index)" @click="moveUp(index)"
          >上移</ElButton
        >
        <ElButton
          :disabled="getMoveDownBtnDisabled(index)"
          @click="moveDown(index)"
          >下移</ElButton
        >
        <ElButton :disabled="copyBtnDisabled" @click="copyByIndex(index)"
          >复制</ElButton
        >
      </li>
    </ul>
    <template v-else>
      <ElButton @click="add">添加一行</ElButton>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useList } from './src/hooks/useList'
import type { ListBasicProps } from '@/types'

const RenderItem = defineAsyncComponent(
  () => import('@/components/Form/src/FormItem.vue')
)
const props = defineProps<ListBasicProps>()

const {
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
</script>

<!-- <style scoped></style> -->
./src/hooks/useList
