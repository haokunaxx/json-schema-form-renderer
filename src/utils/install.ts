import type { App, Plugin } from 'vue'

type SFCWithInstall<T> = T & Plugin

export const withInstall = <T>(component: T) => {
  const comp = component as SFCWithInstall<T>,
    compName = (comp as any).name || (comp as any).displayName
  comp.install = function (app: App) {
    app.component(compName, comp)
  }
  return comp
}
