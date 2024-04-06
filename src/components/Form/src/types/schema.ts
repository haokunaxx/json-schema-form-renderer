import { FieldSchema, BoxSchema, ListSchema } from '@/types'

export type FieldSchemaForRender = FieldSchema & {
  field: string
}

export interface BoxSchemaForRender extends Omit<BoxSchema, 'items'> {
  field: string
  items?: (FieldSchemaForRender | BoxSchemaForRender | ListSchemaForRender)[]
  // schemaPath: string[]
  // modelPath: string[]
}
export interface ListSchemaForRender extends Omit<ListSchema, 'items'> {
  field: string
  items?: (FieldSchemaForRender | BoxSchemaForRender | ListSchemaForRender)[]
  // schemaPath: string[]
  // modelPath: string[]
}

export type FormItemSchemaForRender =
  | FieldSchemaForRender
  | BoxSchemaForRender
  | ListSchemaForRender

export type FormSchemaForRender = FormItemSchemaForRender[]
