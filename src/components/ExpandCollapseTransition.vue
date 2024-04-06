<template>
  <Transition v-bind="transitionHooks">
    <slot></slot>
  </Transition>
</template>

<script setup lang="ts">
const TransitionValue = '.4s height ease'
const transitionHooks = {
  // css: false,
  onBeforeEnter(el) {
    el.style.transition = TransitionValue
    el.style.overflow = 'hidden'
    el.style.height = '0px'
  },
  onEnter(el) {
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
      el.offsetHeight
    } else {
      el.style.height = ''
    }
    el.style.overflow = 'hidden'
  },
  // 当进入过渡完成时调用。
  onAfterEnter(el) {
    el.style.transition = ''
    el.style.height = ''
  },
  onBeforeLeave(el) {
    el.style.height = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
  },
  onLeave(el) {
    if (el.scrollHeight !== 0) {
      el.style.transition = TransitionValue
      el.style.height = '0px'
    }
  },
  onAfterLeave(el) {
    el.style.transition = ''
    el.style.height = ''
  }
}
</script>
