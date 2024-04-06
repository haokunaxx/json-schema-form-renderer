import { FormMethods } from '@/types'
import { InjectionKey } from 'vue'

export const FormMethodsInjectKey = Symbol(
  'FormMethodsInjectKey'
) as InjectionKey<FormMethods>
