<template>
  <ElFormItem>
    <div class="form-action-layout-box">
      <slot name="CancelBefore" v-bind="slotBindValue"></slot>
      <ElButton :loading="loading" @click="resetButtonClickHandler">
        {{ props.cancelButtonText }}
      </ElButton>
      <slot name="ConfirmBefore" v-bind="slotBindValue"></slot>
      <ElButton
        :loading="loading"
        @click="confirmButtonClickHandler"
        type="primary"
      >
        {{ props.confirmButtonText }}
      </ElButton>
      <slot name="ConfirmAfter" v-bind="slotBindValue"></slot>
    </div>
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElFormItem } from 'element-plus'
import { useLoading } from '@/hooks/useLoading'
import type { FormActionProps } from '@/types/Form'
const props = withDefaults(defineProps<FormActionProps>(), {
  cancelButtonText: 'Cancel',
  confirmButtonText: 'Confirm',
  loadingWhenActionButtonClick: false
})
const emit = defineEmits(['confirm', 'reset'])

const [loading, { startLoading, stopLoading }] = useLoading()
defineExpose({ startLoading, stopLoading })

const slotBindValue = computed(() => {
  return {
    loading: unref(loading)
  }
})

const resetButtonClickHandler = () => {
  props.loadingWhenActionButtonClick && startLoading()
  emit('reset', {
    stopLoading
  })
}
const confirmButtonClickHandler = () => {
  props.loadingWhenActionButtonClick && startLoading()
  emit('confirm', {
    stopLoading
  })
}
</script>

<!-- <style scoped></style> -->
