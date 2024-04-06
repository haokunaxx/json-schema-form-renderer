import { isString, isArray } from '@/utils/is'

interface Option {
  delay: number
  mode: 'alternate' | 'forward'
  immediate: boolean
  step: number
}

export const useTyped = (input: string[] | string, option: Partial<Option>) => {
  const { delay, mode, immediate, step } = Object.assign(
    {},
    {
      mode: 'forward',
      immediate: false,
      step: 1
    },
    option
  )

  const outputArr = ref<string[]>([])
  let dir = 'toRight',
    timer: any = null

  const srcArr = isString(input) ? input.split('') : isArray(input) ? input : []

  if (srcArr.length === 0)
    return {
      outputArr,
      stop: () => {},
      continueTyping: () => {}
    }

  const stop = () => {
    clearInterval(timer)
    timer = null
  }

  const update = () => {
    dir === 'toRight' &&
      srcArr.length > 0 &&
      outputArr.value.push(...srcArr.splice(0, step))

    dir === 'toLeft' &&
      outputArr.value.length > 0 &&
      srcArr.unshift(...outputArr.value.splice(-1 * step, step))
  }

  const directionJudge = () => {
    srcArr.length === 0 && mode === 'alternate' && (dir = 'toLeft')
    outputArr.value.length === 0 && (dir = 'toRight')
  }

  const continueTyping = () => {
    if (timer) return
    update()
    directionJudge()
    start()
  }

  const start = () => {
    timer = setInterval(() => {
      update()
      directionJudge()
    }, delay)
  }

  onMounted(() => {
    if (immediate) {
      update()
      directionJudge()
    }
    start()
  })

  onUnmounted(() => {
    stop()
  })

  return {
    outputArr,
    stop,
    continueTyping
  }
}
