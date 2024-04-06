import { ref } from 'vue'

type EventType = keyof HTMLElementEventMap

type Listener = <K extends EventType>(
  this: HTMLElement,
  ev: HTMLElementEventMap[K]
) => any

export function useEvent<K extends EventType>(
  el: Element | Window | Document,
  type: K,
  listener: Listener,
  options?: boolean | AddEventListenerOptions,
  autoRemove?: boolean
) {
  const elemRef = ref<Element>(el as Element)
  const savedListener = ref<Listener>(listener)

  const removeEventListener = (el: Element) => {
    el.removeEventListener(type, savedListener.value)
    savedListener.value = null as unknown as Listener
  }

  const stopWatch = watch(
    elemRef,
    (newEl, _, cleanUp) => {
      savedListener.value = listener
      newEl.addEventListener(type, listener, options)
      cleanUp(() => {
        autoRemove && removeEventListener(newEl)
      })
    },
    {
      immediate: true
    }
  )

  return {
    removeEventListener: () => {
      removeEventListener(elemRef.value)
      stopWatch()
    }
  }
}
