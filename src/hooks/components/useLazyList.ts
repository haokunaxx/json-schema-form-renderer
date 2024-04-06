// interface UseLazyList {
//   isLoading: boolean;
//   hasMore: boolean;
//   threshold: number;
// }
import { useEvent } from '../useEvent'

interface UseLazyListProps {
  container: Ref<HTMLElement | null>
  visibleData: any[]
  threshold?: number
  loadMore: Function
}

export function useLazyList<T>(props: UseLazyListProps) {
  const { container } = props
  const isLoading = ref(false),
    hasMore = ref(true)

  const threshold = ref(100)

  const list = ref<T[]>([])

  let removeEvent: Function

  const loadMore = async () => {
    if (unref(isLoading) || !unref(hasMore)) return
    isLoading.value = true
    try {
      const newData = await props.loadMore()
      hasMore.value = newData.length > 0 ? true : false
      list.value.push(...newData)
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const reload = () => {
    list.value = []
    if (container.value?.scrollTop === 0) {
      loadMore()
    }
    container.value?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const scrollEvent = () => {
    const { scrollTop, clientHeight, scrollHeight } =
      container.value as HTMLElement
    if (scrollTop + clientHeight + threshold.value >= scrollHeight) {
      loadMore()
    }
  }
  loadMore()
  watch(container, (newVal) => {
    if (newVal) {
      const { removeEventListener } = useEvent(newVal, 'scroll', scrollEvent)
      removeEvent = removeEventListener
    }
  })

  onUnmounted(() => {
    if (removeEvent) {
      console.log('unmounted')
      removeEvent()
    }
  })

  return {
    list,
    isLoading,
    hasMore,
    reload
  }
}
