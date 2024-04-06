import { type Ref, ref } from 'vue'

export function useSwitch(initialValue = false): [Ref<boolean>, () => void] {
  const value = ref(initialValue)

  const setValue = () => {
    value.value = !value.value
  }

  return [value, setValue]
}
