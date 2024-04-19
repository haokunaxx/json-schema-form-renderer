import { InjectionKey } from 'vue'
import { FormMethods } from '@/types'

export const FormMethodsInjectKey = Symbol(
  'FormMethodsInjectKey'
) as InjectionKey<FormMethods>
