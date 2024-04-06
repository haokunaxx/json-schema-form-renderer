declare global {
  declare type Nullable<T> = T | null
  declare type Recordable<T = any> = Record<string, T>
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>
}

declare module 'vue-router' {
  export type ApplicationRoute = {
    meta: {
      [key: string]: any
    }
    children: RouteRecordRaw[]
  }
}

export {}
