import { useSettingsStore } from '@/store/settings'
/*
布局模式：
一：左1应用程序 - 左2导航菜单 - 右内容区（mode-left）
二：左导航菜单 - 右内容区(mode-none)
三：左边应用程序（导航菜单popover）右边内容区(mode-left-pop)
四：上应用程序（导航菜单popover）下方内容区(mode-top-pop)
五：上方头部显示应用程序 - 下方（左导航菜单 和 右内容区 ）(mode-top-left)
六：上导航菜单 下（左应用程序 右内容 ）（mode-left-top）
*/
enum LayoutMode {
  MODE_LEFT = 'mode_left',
  MODE_NONE = 'mode_none',
  MODE_TOP_POP = 'mode_top_pop',
  MODE_LEFT_POP = 'mode_left_pop',
  MODE_LEFT_TOP = 'mode_left_top',
  MODE_TOP_LEFT = 'mode_top_left'
}

enum LayoutElem {
  ELEM_HEADER_APPLICATION = 'header_application',
  ELEM_HEADER_MENU = 'header_menu',
  ELEM_APPLICATION = 'application',
  ELEM_MENU = 'menu'
}

export function useLayout() {
  // 所有布局类型
  const layouts = {
    [LayoutMode.MODE_LEFT]: {
      mode: LayoutMode.MODE_LEFT,
      layout: [LayoutElem.ELEM_APPLICATION, LayoutElem.ELEM_MENU],
      title: '',
      img: '',
      tip: ''
    },
    [LayoutMode.MODE_NONE]: {
      mode: LayoutMode.MODE_NONE,
      layout: [LayoutElem.ELEM_MENU],
      title: '',
      img: '',
      tip: ''
    },
    [LayoutMode.MODE_LEFT_POP]: {
      mode: LayoutMode.MODE_LEFT_POP,
      layout: [LayoutElem.ELEM_APPLICATION],
      title: '',
      img: '',
      tip: ''
    },
    [LayoutMode.MODE_TOP_POP]: {
      mode: LayoutMode.MODE_TOP_POP,
      layout: [LayoutElem.ELEM_HEADER_APPLICATION],
      title: '',
      img: '',
      tip: ''
    },
    [LayoutMode.MODE_TOP_LEFT]: {
      mode: LayoutMode.MODE_TOP_LEFT,
      layout: [LayoutElem.ELEM_HEADER_APPLICATION, LayoutElem.ELEM_MENU],
      title: '',
      img: '',
      tip: ''
    },
    [LayoutMode.MODE_LEFT_TOP]: {
      mode: LayoutMode.MODE_LEFT_TOP,
      layout: [LayoutElem.ELEM_HEADER_MENU, LayoutElem.ELEM_APPLICATION],
      title: '',
      img: '',
      tip: ''
    }
  }

  const settingsStore = useSettingsStore()

  const isMultiApplication = settingsStore.isMultiApplication

  // 当前布局模式
  const layoutMode = ref<LayoutMode>(
    isMultiApplication ? LayoutMode.MODE_LEFT : LayoutMode.MODE_NONE
  )

  // 当前布局模式下的布局信息
  const layout = computed(() => layouts[layoutMode.value].layout)

  // 修改布局
  const changeLayout = (newLayoutMode: LayoutMode) => {
    layoutMode.value = newLayoutMode
  }

  const includes = (list: string[], target: string) => {
    let ret = false
    for (let i = 0; i < list.length; i++) {
      if (list[i] === target) {
        ret = true
        break
      }
    }
    return ret
  }

  // 是否是header应用列表
  const isHeaderApplication = computed(() =>
    includes(layout.value, LayoutElem.ELEM_HEADER_APPLICATION)
  )

  // 是否是header菜单
  const isHeaderMenu = computed(() =>
    includes(layout.value, LayoutElem.ELEM_HEADER_MENU)
  )

  // header是否显示
  const headerShow = computed(
    () => isHeaderApplication.value || isHeaderMenu.value
  )

  // 主菜单是否显示
  const mainMenuShow = computed(() =>
    includes(layout.value, LayoutElem.ELEM_APPLICATION)
  )

  // 次级菜单是否显示
  const subMenuShow = computed(() =>
    includes(layout.value, LayoutElem.ELEM_MENU)
  )

  // 是否是弹出菜单
  const isPopMenu = computed(() => {
    return [LayoutMode.MODE_LEFT_POP, LayoutMode.MODE_TOP_POP].includes(
      layoutMode.value
    )
  })

  // 通过是否存在MainMenu级别的菜单进行过滤后的可选布局列表
  const filterLayouts = computed(() => {
    if (isMultiApplication) {
      return layouts
    } else {
      return Object.keys(layouts).reduce((prev, next) => {
        if (
          !includes(
            [
              LayoutMode.MODE_LEFT,
              LayoutMode.MODE_TOP_LEFT,
              LayoutMode.MODE_LEFT_TOP
            ],
            layouts[next].mode
          )
        ) {
          prev[next] = layouts[next]
        }
        return prev
      }, {} as typeof layouts)
    }
  })

  return {
    layout,
    layouts: filterLayouts,
    changeLayout,
    headerShow,
    isHeaderApplication,
    isHeaderMenu,
    mainMenuShow,
    subMenuShow,
    isPopMenu
  }
}
