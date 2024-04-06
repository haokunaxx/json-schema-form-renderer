import { type Ref, ref } from 'vue'
export const useLoading = (): [
  Ref<boolean>,
  {
    startLoading: () => void
    stopLoading: () => void
  }
] => {
  const loadingRef = ref(false)

  const startLoading = () => (loadingRef.value = true)

  const stopLoading = () => (loadingRef.value = false)

  return [
    loadingRef,
    {
      startLoading,
      stopLoading
    }
  ]
}
